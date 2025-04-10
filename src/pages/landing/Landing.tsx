import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-center">
      <div className="grid grid-rows-2">
        <p>Landing Page</p>
        <Button asChild>
          <Link to="/dashboard">Go To Dashboard</Link>  
        </Button>
      </div>
    </div>
  )
};

export default Landing
