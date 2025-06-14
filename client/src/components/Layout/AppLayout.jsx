import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "../../context/AuthContext";

export const AppLayout = () => {
  const { state } = useAuth();

  return (
    <>
      <Header key={state.isAuthenticated} />
      <Outlet />
      <Footer />
    </>
  );
};
