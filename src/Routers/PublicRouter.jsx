import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PublicGard from "./PublicGard";

const PublicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default PublicRouter;
