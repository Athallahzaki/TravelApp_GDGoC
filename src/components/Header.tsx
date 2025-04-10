'use client';

import Breadcrumbs from "@/components/Breadcrumbs";
import { ModeToggle } from "@/components/mode-toggle";
import UserItem from "@/components/UserItem";



const Header = () => {
  return (
    <div className="grid grid-cols-2 p-4 gap-4 border-b">
      <div className="flex items-center justify-start">
        <Breadcrumbs />
      </div>
      <div className="flex items-center justify-end gap-2">
      <UserItem
        name="Example Admin"
        description="example@mail.org"
        // avatarUrl="https://example.com/avatar.jpg"
      />
        <ModeToggle />
      </div>
    </div>
  )
};

export default Header
