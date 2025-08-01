import { Layout } from "../Layout";
import { Hero } from "./Hero";
import { FeatureSection } from "./FeatureSection";

export const Landing = () => {
  return (
    <Layout>
      <main className="md:p-12 justify-center items-center bg-gray-200 ">
        {/* hero section  */}
        <Hero />
        {/* info */}
        <section className="py-10 "></section>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-600">
            Why KingsArena is Awesome?
          </h2>
        </div>
        {/* separator  */}
        <section className="py-10 "></section>
        {/* features  */}
        <FeatureSection />
      </main>
    </Layout>
  );
};
