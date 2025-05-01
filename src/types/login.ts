export interface LoginFormValues {
    login: string;
    password: string;
  }
  export interface LoginPageProps {
    onClose: () => void;
    onLoginSuccess: () => void;
  }

  export interface WrappedLoginPageProps {
    onLoginSuccess: () => void;
    onClose: () => void;
  }