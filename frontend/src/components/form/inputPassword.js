import React, { useState } from "react";
import { CFormInput, CInputGroup, CInputGroupText } from "@coreui/react";
import { BsShieldLock, BsEye, BsEyeSlash } from "react-icons/bs";
// import CIcon from "@coreui/icons-react";

const InputPassword = ({ value, setValue, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <CInputGroup>
      {/* <CInputGroupPrepend> */}
      <CInputGroupText>
        <BsShieldLock />
      </CInputGroupText>
      {/* </CInputGroupPrepend> */}
      <CFormInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={showPassword ? "" : "password"}
        placeholder={placeholder}
        autoComplete="current-password"
      />
      <CInputGroupText
        key={showPassword}
        onClick={() => setShowPassword(!showPassword)}
        style={{
          cursor: "pointer",
        }}
      >
        {!showPassword ? <BsEye /> : <BsEyeSlash />}
      </CInputGroupText>
    </CInputGroup>
  );
};

export default InputPassword;
