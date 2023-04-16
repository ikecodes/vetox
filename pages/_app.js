import '@/styles/globals.css'
import "@/styles/carousel.css";
import "@/styles/loader.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "slick-carousel/slick/slick-theme.css"

import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { persistor, store } from "@/slices"
import SSRProvider from "react-bootstrap/SSRProvider"
import { PersistGate } from "redux-persist/integration/react"
import Layout from "@/layouts/Layout"
import Wrapper from "@/layouts/Wrapper"
import Loader from "@/components/Loader"

const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const routeChangeStart = () => {
      setLoading(true)
    }
    const routeChangeEnd = () => {
      setLoading(false)
    }
    router.events.on("routeChangeStart", routeChangeStart)
    router.events.on("routeChangeComplete", routeChangeEnd)
    router.events.on("routeChangeError", routeChangeEnd)

    return () => {
      router.events.off("routeChangeStart", routeChangeStart)
      router.events.off("routeChangeComplete", routeChangeEnd)
      router.events.off("routeChangeError", routeChangeEnd)
    }
  }, [router.events])
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <SSRProvider>
            {loading ? (
              <div
                style={{
                  height: "100vh",
                }}
              >
                <Loader />
              </div>
            ) : (
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
            )}
          </SSRProvider>
          <ToastContainer />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  )
}
