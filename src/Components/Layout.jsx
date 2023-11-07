import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" min-w-[1440px] min-h-[1024px] overflow-hidden shrink-0 flex justify-center items-start pt-[55px]">
      <div className="min-w-[1340px] min-h-[909px] overflow-hidden  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
