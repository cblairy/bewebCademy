import { useKeycloak } from "@react-keycloak/web";
import Error from '../pages/Error';
/**
 * @param roles 
 * @param children
 * @returns children 
 */
const PrivateRoute = ({ roles = '', children }) => {

  roles === '' ? roles = 'default-roles-bewebcademy' : roles = roles;

  const { keycloak } = useKeycloak();
  
  const isLoggedIn = keycloak.authenticated;
  const hasRole = keycloak.hasRealmRole(roles);

  return isLoggedIn && hasRole ? children : null;
};

export default PrivateRoute;