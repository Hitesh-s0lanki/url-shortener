import Navbar from "./_components/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col ">
      <Navbar />
      {/* <Header />
  <main className="flex-1">
    <Hero />
    <div className="container mx-auto px-4 py-8">
      <UrlShortenerForm />
      <UrlList />
    </div>
  </main> */}
      <footer className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Shortify - Simple URL shortener for
          everyone
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
