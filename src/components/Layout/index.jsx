'use client';

import Navbar from "@/components/Navbar/index";
import Footer from "@/components/Footer/index";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
