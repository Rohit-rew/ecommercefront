import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/footer";
import { Cart } from "../context/cart"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Cart>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Cart>
  )
}
