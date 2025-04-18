import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { Link } from "react-router";

const Landing = () => {
  const { userLoggedIn } = useAuth();
  return (
    <div className="flex h-screen w-screen items-center justify-center text-center">
      <div className="grid grid-rows-2">
        <p>Landing Page</p>
        {userLoggedIn ? (
        <Button asChild>
          <Link to="/dashboard">Go To Dashboard</Link>  
        </Button>
        ) : (
        <Button asChild>
          <Link to="/login">Login</Link>  
        </Button>
        )}
      </div>
    </div>
  )
};

export default Landing
