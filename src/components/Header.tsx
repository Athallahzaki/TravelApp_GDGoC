import Breadcrumbs from "@/components/Breadcrumbs";
import { ModeToggle } from "@/components/mode-toggle";
import UserItem from "@/components/UserItem";
import { useAuth } from "@/contexts/authContext";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="grid grid-cols-2 p-4 gap-4 border-b">
      <div className="flex h-16 shrink-0 items-center gap-2 px-4 justify-start">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2" />
        <Breadcrumbs />
      </div>
      <div className="flex items-center justify-end gap-2">
      <UserItem
        name={currentUser?.displayName}
        description={currentUser?.email}
        avatarUrl={currentUser?.photoURL || undefined}
      />
        <ModeToggle />
      </div>
    </div>
  )
};

export default Header
