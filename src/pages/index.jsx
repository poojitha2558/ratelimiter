import Hero from "@/components/Hero/index";
import  { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>
    </main>
    </>
  );
};

export default Home;
