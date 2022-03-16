import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = ({ isAuth }) => {
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};
