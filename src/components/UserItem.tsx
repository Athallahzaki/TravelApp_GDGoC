import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { doSignOut } from "@/utils/firebase/auth";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserItemProps {
  avatar?: boolean;
  avatarUrl?: string;
  description?: string | null;
  name?: string | null;
}

const UserItem = ({
  avatar = true,
  avatarUrl,
  description,
  name = 'Example'
}: UserItemProps) => {
  const getInitials = () => {
    if (avatarUrl) return;
    if (!name) return "AA";
    return name.split(" ").map(word => word[0]?.toUpperCase()).join("");
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (!isLoggingOut) {
      setIsLoggingOut(true);
      try {
        await doSignOut();
        console.log("User logged out successfully");
        toast.success('User Logged Out Successfully!');
        // Optionally, redirect to login or landing page here
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error('Error Logging Out!');
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-start gap-2 border rounded-[8px] p-2 cursor-pointer">
          {avatar && <div className="rounded-full min-h-10 min-w-10 bg-emerald-500 text-primary font-[700] flex items-center justify-center bg-cover" style={{
            backgroundImage: `url(${avatarUrl})`,
            outline: 'none',
            overflow: 'hidden',
          }}>
            {getInitials()}
          </div>}
          <div className="w-[80%] text-left">
            {name && <div className="flex items-center truncate text-wrap max-w-40">
              <div className="text-md font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</div>
            </div>}
            {description && <div className="text-sm text-accent-foreground overflow-hidden overflow-ellipsis whitespace-nowrap" style={{
            }}>{description}</div>}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><User /> Details</DropdownMenuItem>
        <DropdownMenuItem 
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={isLoggingOut ? "cursor-not-allowed opacity-50" : ""}
        >
          <LogOut /> 
          {isLoggingOut ? "Logging Out..." : "Log Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default UserItem
