import Breadcrumbs from "@/components/Breadcrumbs";
import { ModeToggle } from "@/components/mode-toggle";
import UserItem from "@/components/UserItem";
import { useAuth } from "@/contexts/authContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="grid grid-cols-2 p-4 gap-4 border-b">
      <div className="flex items-center justify-start">
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
