import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <main className="bg-slate-800 min-h-screen h-auto w-screen absolute m-0 p-0">
      <Outlet />
      <ToastContainer />
    </main>
  );
};

export default Layout;
