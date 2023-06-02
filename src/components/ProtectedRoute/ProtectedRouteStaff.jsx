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
  const isStaffRoute = window.location.pathname.startsWith("/staff");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  return (
    <>
      {isAuthenticated === true && userRole === "STAFF" ? (
        <>
          <RoleStaffRoute>{props.children}</RoleStaffRoute>
        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default ProtectedRouteStaff;
