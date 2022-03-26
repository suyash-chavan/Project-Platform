import "./App.css";
import { Route, Routes, Redirect } from "react-router-dom";
import authRoutes from "./routes/authRoutes";
import "./scss/style.scss";

function App() {
  return (
    <>
      <Routes>
        {authRoutes.map((route, idx) => {
          console.log(route, "he");
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.component />}
              />
            )
          );
        })}
      </Routes>
    </>
  );
}

export default App;
