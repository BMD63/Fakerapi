import React from "react";
import LoginPage from "./LoginPage";
import { LoginPageProps } from "../../types/login";

const WrappedLoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onClose }) => {
 return ( <LoginPage onLoginSuccess={onLoginSuccess} onClose={onClose} /> );
};
export default WrappedLoginPage;