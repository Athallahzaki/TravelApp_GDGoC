'use client';

import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { BookOpen, CalendarClock, House, Plane, Users } from "lucide-react";
import { Link } from "react-router";


const Sidebar = () => {
  const menuList = [
    {
      link: "/dashboard",
      icon: <House />,
      text: "Home"
    },
    {
      group: "Manage",
      items: [
        {
          link: "/dashboard/destinations",
          icon: <Plane />,
          text: "Destinations"
        },
        {
          link: "/dashboard/plans",
          icon: <CalendarClock />,
          text: "Vacation Plans"
        },
        {
          link: "/dashboard/users",
          icon: <Users />,
          text: "Users"
        },
        {
          link: "/dashboard/bookings",
          icon: <BookOpen />,
          text: "Bookings"
        },
      ]
    },
  ]

  return (
    <div className="fixed flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 gap-4">
      <div className="flex items-center justify-start gap-2 border rounded-[8px] p-2">
        <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-primary font-[700] flex items-center justify-center">
          <p>LG</p>
        </div>
        <p className="text-[16px] font-bold grow">TravelApp</p>
      </div>
      <div className="grow">
      <Command style={{ overflow: 'visible' }} className="min-h-screen">
        <CommandList style={{ overflow: 'visible' }}>
          {menuList.map((menu: any, key: number) => {
            if (menu.group) {
              return (
                <CommandGroup key={key} heading={menu.group}>
                  {menu.items.map((item: any, itemKey: number) => (
                    <Link to={item.link}>
                      <CommandItem key={itemKey} className="flex gap-2 cursor-pointer text-lg">
                        {item.icon}
                        <span>{item.text}</span>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              );
            } else {
              return (
                <Link to={menu.link}>
                  <CommandItem key={key} className="flex gap-2 cursor-pointer text-lg">
                    {menu.icon}
                    <span>{menu.text}</span>
                  </CommandItem>
                </Link>
              );
            }
          })}
        </CommandList>
      </Command>
      </div>
    </div>
  )
};

export default Sidebar
