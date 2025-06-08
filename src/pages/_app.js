import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { AppProvider } from "@/store/provider";
import { CookiesProvider } from "react-cookie";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

function AppContent({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Layout>
    </>
  );
}

function MyApp(props) {
  return (
    <AppProvider>
      <CookiesProvider>
        <AppContent {...props} />
      </CookiesProvider>
    </AppProvider>
  );
}

export default MyApp;