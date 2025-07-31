import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthLayout,
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyEmail,
  NotFound,
} from "@/lib/auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
