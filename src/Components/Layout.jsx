import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" min-w-[1440px] min-h-[1024px] overflow-hidden shrink-0 flex justify-center items-center">
      <div className="min-w-[1340px] min-h-[909px] overflow-hidden  bg-[#fff] rounded-[16px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
