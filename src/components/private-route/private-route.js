import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

function PrivateRoute(props) {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
