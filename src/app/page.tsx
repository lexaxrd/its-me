import Image from "next/image";
import Navbar from "./home/components/Navbar";
import Header from "./home/components/Header";
import Features from "./home/components/features/Features";
import Footer from "./home/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-28">
        <Navbar />
        <Header />
        <Features />
        <Footer />
    </main >
  );
}
