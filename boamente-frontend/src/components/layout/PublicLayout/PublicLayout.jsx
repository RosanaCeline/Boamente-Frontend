import Header from "../Header/public/Header";
import Footer from "../Footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
