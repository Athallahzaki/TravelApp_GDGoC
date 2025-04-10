'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const UserItem = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
      <div className="flex items-center justify-start gap-2 border rounded-[8px] p-2 cursor-pointer">
        <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-primary font-[700] flex items-center justify-center">
          <p>EX</p>
        </div>
        <div className="truncate text-wrap max-w-40">
          <p className="text-[16px] font-bold">Example Admin</p>
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
