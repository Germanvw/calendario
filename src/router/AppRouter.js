import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { startChecking } from "../components/redux/actions/authActions";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

const AppRouter = () => {
  const dispatch = useDispatch();

  const { validating, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (validating) {
    return <h5>Loading...</h5>;
  }

  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes isAuth={!!uid} />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoutes isAuth={!!uid} />}>
          <Route exact path="*" element={<CalendarScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
