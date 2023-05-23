import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const RoleStaffRoute = (props) => {
  const isStaffRoute = window.location.pathname.startsWith("/staff");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;

  if (isStaffRoute && userRole === "STAFF") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRouteStaff = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleStaffRoute>{props.children}</RoleStaffRoute>
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRouteStaff;
