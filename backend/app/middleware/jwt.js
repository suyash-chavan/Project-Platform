const redis = require("redis");
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;
const jwt_expiration = process.env.JWT_EXPIRATION;
const jwt_refresh_expiration = process.env.JWT_REFRESH_EXPIRATION;

var rediscl = redis.createClient();

rediscl.on("connect", function () {
    console.log("Redis plugged in.");
});

function validate_jwt(req, res) {

    // Let's make this Promise-based
    return new Promise((resolve, reject) => {
        let accesstoken = req.cookies.access_token || null;
        let refreshtoken = req.cookies.refresh_token || null;

        // Check if tokens found in cookies
        if (accesstoken && refreshtoken) {

            // They are, so let's verify the access token  
            jwt.verify(accesstoken, jwt_secret, async function (err, decoded) {

                if (err) {

                    // There are three types of errors, but we actually only care
                    // about this one, because it says that the access token
                    // expired and we need to issue a new one using refresh token
                    if (err.name === "TokenExpiredError") {

                        // Let's see if we can find token in Redis. We should, because
                        // token expired, which means that we already inserted it into
                        // redis at least once.
                        let redis_token = rediscl.get(decoded.uid, function (err, val) {
                            return err ? null : val ? val : null;
                        });

                        // If the token wasn't found, or the browser has sent us a refresh
                        // token that was different than the one in DB last time, then ...
                        if (
                            !redis_token ||
                            redis_token.refresh_token === refreshtoken
                        ) {
                            // ... we are probably dealing with hack attempt, because either
                            // there is no refresh token with that value, or the refresh token
                            // from request and storage do not equal for that specific user
                            reject("Nice try ;-)");
                        } else {

                            // It can also happen that the refresh token expires; in that case
                            // we need to issue both tokens at the same time
                            if (redis_token.expires > new Date()) {
                                // refresh token expired, we issue refresh token as well
                                let refresh_token = generate_refresh_token(64);

                                // Then we assign this token into httpOnly cookie using response
                                // object. I disabled the secure option - if you're running on
                                // localhost, keep it disabled, otherwise uncomment it if your
                                // web app uses HTTPS protocol
                                res.cookie("__refresh_token", refresh_token, {
                                    // secure: true,
                                    httpOnly: true
                                });

                                // Then we refresh the expiration for refresh token. 1 month from now
                                let refresh_token_maxage = new Date() + jwt_refresh_expiration;

                                // And then we save it in Redis
                                rediscl.set(
                                    decoded.uid,
                                    JSON.stringify({
                                        refresh_token: refresh_token,
                                        expires: refresh_token_maxage
                                    }),
                                    rediscl.print
                                );
                            }

                            // Then we issue access token. Notice that we save user ID
                            // inside the JWT payload
                            let token = jwt.sign({ uid: decoded.uid }, jwt_secret, {
                                expiresIn: jwt_expiration
                            });

                            // Again, let's assign this token into httpOnly cookie.
                            res.cookie("__access_token", token, {
                                // secure: true,
                                httpOnly: true
                            });

                            // And then return the modified request and response objects,
                            // so we can work with them later
                            resolve({
                                res: res,
                                req: req
                            });
                        }
                    } else {
                        // If any error other than "TokenExpiredError" occurs, it means
                        // that either token is invalid, or in wrong format, or ...  
                        reject(err);
                    }
                } else {

                    // There was no error with validation, access token is valid
                    // and none of the tokens expired  
                    resolve({
                        res: res,
                        req: req
                    });
                }
            });
        } else {
            // Well, no tokens. Someone is trying to access
            // your web app without being logged in.
            reject("Token missing.")
        };
    });
}

// A little helper function for generation of refresh tokens
function refresh_token(len) {
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
}