import UrlShortenerForm from "@/components/url-shortener-form";

const Hero = () => {
  return (
    <div className="flex-1 h-full w-full flex justify-center items-center bg-[#fcfcfc]">
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="">Simple URL Shortener</span>
          <br />
          for Everyone
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create shortened URLs with just one click. Track clicks, share links,
          and manage all your URLs in one place.
        </p>

        <UrlShortenerForm />
      </div>
    </div>
  );
};

export default Hero;
