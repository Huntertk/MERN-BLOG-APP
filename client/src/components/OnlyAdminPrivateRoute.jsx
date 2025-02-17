import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user);

  return (
    currentUser && currentUser.isAdmin? (
        <Outlet />
    ) : (
        <Navigate to="/dashboard?tab=profile" />
    )
  )
}

export default OnlyAdminPrivateRoute