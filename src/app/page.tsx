import { Hero } from "@/components/Hero";
import { WebBuilds } from "@/components/WebBuilds";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { Writing } from "@/components/Writing";
import { Toolkit } from "@/components/Toolkit";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

// A single static page: every section renders at build time, so there is no
// client-side data fetching to delay content or shift layout.
export default function Home() {
  return (
    <>
      <Hero />
      <WebBuilds />
      <Work />
      <Services />
      <Writing />
      <Toolkit />
      <About />
      <Contact />
    </>
  );
}
