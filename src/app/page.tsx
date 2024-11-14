import Navbar from "@/components/Navbar";
import MainPage from "@/layout/Information";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mt-4">
        <MainPage />
      </main>
    </>
  );
}
