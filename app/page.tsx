import Image from "next/image";
import Header from "./component/header";
import Hero from "./component/hero";
import Footer from "./component/footer";

export default function Home(){
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
