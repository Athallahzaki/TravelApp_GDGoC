'use client';

import UserItem from "@/components/UserItem";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="grid grid-cols-2 p-4 gap-4 border-b">
      <div className="flex items-center justify-start">
        Breadcrumb Here
      </div>
      <div className="flex items-center justify-end gap-2">
        <UserItem />
        <ModeToggle />
      </div>
    </div>
  )
};

export default Header
