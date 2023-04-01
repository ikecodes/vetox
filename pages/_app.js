import '@/styles/globals.css'
import "@/styles/carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { persistor, store } from "@/slices";
import SSRProvider from "react-bootstrap/SSRProvider";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/layouts/Layout";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const routeChangeStart = () => {
      setLoading(true);
    };
    const routeChangeEnd = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeEnd);
    router.events.on("routeChangeError", routeChangeEnd);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeEnd);
      router.events.off("routeChangeError", routeChangeEnd);
    };
  }, [router.events]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <SSRProvider>
            <Layout>
              {loading ? <h1>Loading ...</h1> : <Component {...pageProps} />}
            </Layout>
          </SSRProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
