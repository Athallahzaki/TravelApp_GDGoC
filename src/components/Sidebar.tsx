'use client';

import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { BookOpen, CalendarClock, House, Plane, Users } from "lucide-react";


const Sidebar = () => {
  const menuList = [
    {
      link: "#",
      icon: <House />,
      text: "Home"
    },
    {
      group: "Manage",
      items: [
        {
          link: "#",
          icon: <Plane />,
          text: "Destinations"
        },
        {
          link: "#",
          icon: <CalendarClock />,
          text: "Vacation Plans"
        },
        {
          link: "#",
          icon: <Users />,
          text: "Users"
        },
        {
          link: "#",
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
                    <CommandItem key={itemKey} className="flex gap-2 cursor-pointer text-lg">
                      {item.icon}
                      <span>{item.text}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            } else {
              return (
                <CommandItem key={key} className="flex gap-2 cursor-pointer text-lg">
                  {menu.icon}
                  <span>{menu.text}</span>
                </CommandItem>
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
