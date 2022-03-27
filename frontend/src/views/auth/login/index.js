import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Images } from "../../../constants/images";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroupText,
  CInputGroup,
  CRow,
} from "@coreui/react";
import { AiOutlineUser } from "react-icons/ai";
import InputPassword from "../../../components/form/inputPassword";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  if (userId) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <div
      className="flex-row hide-text-selection"
      style={{
        backgroundImage: `url(${Images.Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CContainer className="" style={{ height: "100vh" }}>
        <CRow className="justify-content-center">
          <CCol md="8" className="align-items-center">
            <CCardGroup style={{ marginTop: "25vh" }}>
              <CCard className="p-4" style={{ backgroundColor: "#A4C2A8" }}>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <AiOutlineUser />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={id}
                        onChange={(e) => {
                          setId(e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <div className="mb-4">
                      <InputPassword value={password} setValue={setPassword} />
                    </div>

                    {errors?.message ? (
                      <CRow className="mb-4">
                        <CCol xs="12">
                          <span style={{ color: "red", fontWeight: 500 }}>
                            {errors?.message}
                          </span>
                        </CCol>
                      </CRow>
                    ) : null}
                    <CRow>
                      <CCol xs="4">
                        <CButton
                          onClick={() => {}}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="8">
                        <CButton
                          color="link"
                          className="float-right"
                          onClick={() => {
                            navigate({
                              pathname: "/forgotPassword",
                              state: {
                                forget: true,
                              },
                            });
                          }}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-md-down-none"
                style={{ width: "44%", backgroundColor: "#5A5A66" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <div>
                      <img
                        src={Images.Logo}
                        alt="sd"
                        style={{
                          height: 100,
                          width: 100,
                          transform: "scale(1)",
                          marginBottom: 16,
                        }}
                      />
                    </div>
                    <h2>Enigma</h2>
                    <p>
                      Your one stop solution for easy tracking and efficient
                      management of projects. Collaboration among students,
                      universities and organizations made easy.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
