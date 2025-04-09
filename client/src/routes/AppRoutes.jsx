import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ProtectedRoute from "../components/auth/ProtectedRoute";



const renderRoutes = (routes) =>
  routes.map(({ path, element, children, protected: isProtected }, index) => {
    const wrappedElement = isProtected ? (
      <ProtectedRoute element={element} />
    ) : (
      element
    );

    return {
      path,
      element: wrappedElement,
      children: children ? renderRoutes(children) : undefined,
    };
  });

function AppRoutes() {
  const routeObjects = renderRoutes(routes);
  const elements = useRoutes(routeObjects);
  return elements;
}

export default AppRoutes;
