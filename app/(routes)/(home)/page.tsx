
import Navbar from "@/components/Shared/Navbar/Navbar";
import { FirtsBlock } from "./components/FirstBlock";
import { SliderBrands } from "./components/SliderSpecies";
import { Features } from "./components/Features";
import { OurDinos } from "./components/OurDinos";
import { CTA } from "./components/CTA";

export default function Home() {
  return (
    <div>
      <Navbar />
      <FirtsBlock />
      <SliderBrands />
      <Features />
      <OurDinos />
      <CTA />
    </div>
  );
}