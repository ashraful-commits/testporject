import Layout from "../Components/Layout";
import Home from "../Pages/Home/Home";
import Project from "../Pages/Project/Prjoject";
import Seller from "../Pages/Seller/Seller";
import PrivateGard from "./PrivateGard";

const PrivateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/:id",
            element: <Project />,
          },
          {
            path: "/seller/:id",
            element: <Seller />,
          },
        ],
      },
    ],
  },
];

export default PrivateRouter;
