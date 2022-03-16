import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
