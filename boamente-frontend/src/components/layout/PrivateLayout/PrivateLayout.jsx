import Sidebar from "../Sidebar/Sidebar";
import HeaderInternal from "../Header/private/HeaderInternal"; 

export default function PrivateLayout({ children }) {
  return (
    <>
    <Sidebar />
    <HeaderInternal />
      <main>{children}</main>
    </>
  );
}
