'use client';

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface UserItemProps {
  avatar?: boolean;
  avatarUrl?: string;
  description?: string;
  name?: string;
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
        <DropdownMenuItem><LogOut /> Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export default UserItem
