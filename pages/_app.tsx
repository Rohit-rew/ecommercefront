import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/footer";
import { Cart } from "../context/cart";
import { Elements} from "@stripe/react-stripe-js"
import { loadStripe} from "@stripe/stripe-js"
const stripePromise = loadStripe("pk_live_51MA8zbSDBcDQRPWvMWyH8sNNEiZcRUXjfPUejx8tEpJOOuCNel5fCIAelyDxG2LDZPUFPqyRyDdG0489B5HBMKQn00vL1tLNNh")
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>

    <Cart>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Cart>
    </Elements>
  );
}
