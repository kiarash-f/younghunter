import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import FooterMain from "../footer/Footer";

function HomePageLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <FooterMain />
    </>
  );
}

export default HomePageLayout;
