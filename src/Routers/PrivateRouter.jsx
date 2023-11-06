import Layout from "../Components/Layout";
import Home from "../Pages/Home/Home";
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
        ],
      },
    ],
  },
];

export default PrivateRouter;
