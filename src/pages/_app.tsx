import "../styles/index.scss";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      {router.pathname === "/" ? <Header /> : null}
      <Component {...pageProps} />
      {router.pathname === "/" ? <Footer /> : null}
    </>
  );
}
export default MyApp;
