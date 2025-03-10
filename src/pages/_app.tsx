import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactScan from "../components/ReactScan";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
    return <>
        <Component {...pageProps} />
        <ReactScan />
        <Toaster richColors position="top-right" />
  </>;
}
