import { Blogs } from "@/components/sections/Blogs";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <div className="pb-10 pt-0">
      <Hero />
      <Projects />
      <Blogs />
      {/* TODO: Enable this section when content is ready. */}
      {/* <Achievements /> */}
      <Contact />
    </div>
  );
}
