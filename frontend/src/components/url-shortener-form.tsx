import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";

const UrlShortenerForm = () => {
  return (
    <div className="flex w-full  items-center space-x-2">
      <Input
        type="url"
        className=" w-full h-11"
        placeholder="https://gadgetos.in/"
      />
      <Button type="submit" className=" h-11 w-16">
        <Link className=" text-white" />
      </Button>
    </div>
  );
};

export default UrlShortenerForm;
