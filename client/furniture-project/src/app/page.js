import Image from "next/image";
import HeroSection from "./component/home/HeroSection";
import Collection from "./component/home/Collection";
import Cart from "./component/home/Cart";
import TrendingColl from "./component/home/TrendingColl";
import BestSellProd from "./component/home/BestSellProd";
import NewsLetter from "./component/home/NewsLetter";
import OurCustumers from "./component/common/OurCustumers";
import Benefits from "./component/home/Benefits";

export default function Home() {
  return (
   <>
      <HeroSection/>
      <Collection/>
      <Cart/>
      <TrendingColl/>
      <BestSellProd/>
      <Benefits/>
      <OurCustumers/>
      <NewsLetter/>
   </>
  );
}
