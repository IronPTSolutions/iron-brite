import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

function PrivateRoute({ role, children }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  } else if (role && user.role !== role) {
    return <Navigate to="/403" />;
  } else {
    return children;
  }
}

export default PrivateRoute;
