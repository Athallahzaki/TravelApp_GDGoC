import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookOpen, CalendarClock, House, Plane, Users } from "lucide-react";
import { Link } from "react-router";

const DashboardSidebar = () => {
  const menuList = [
    {
      link: "/dashboard",
      icon: House,
      text: "Home"
    },
    {
      group: "Manage",
      items: [
        {
          link: "/dashboard/destinations",
          icon: Plane,
          text: "Destinations"
        },
        {
          link: "/dashboard/plans",
          icon: CalendarClock,
          text: "Vacation Plans"
        },
        {
          link: "/dashboard/users",
          icon: Users,
          text: "Users"
        },
        {
          link: "/dashboard/bookings",
          icon: BookOpen,
          text: "Bookings"
        },
      ]
    },
  ]

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="mt-3">
        <div className="flex items-center justify-start gap-2 border rounded-[8px] p-2 overflow-hidden">
          <div className="rounded-full aspect-square h-10 bg-emerald-500 text-primary font-[700] flex items-center justify-center">
            <p>TA</p>
          </div>
          <p className="text-[16px] font-bold grow">TravelApp</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuList.map((menu: any, key: number) => (
          <SidebarGroup key={key}>
            {menu.group && (<SidebarGroupLabel>{menu.group}</SidebarGroupLabel>)}
            <SidebarGroupContent>
              <SidebarMenu>
                {menu.items ? (
                  menu.items.map((item: any, itemKey: number) => (
                    <SidebarMenuItem key={itemKey}>
                      <SidebarMenuButton asChild>
                        <Link to={item.link}>
                          <item.icon />
                          <span>{item.text}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton asChild>
                      <Link to={menu.link}>
                        <menu.icon />
                        <span>{menu.text}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      < SidebarFooter />
    </Sidebar>
  )
};

export default DashboardSidebar
