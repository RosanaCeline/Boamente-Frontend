import Header from "../Header/public/Header";
import Footer from "../Footer/Footer";

import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
