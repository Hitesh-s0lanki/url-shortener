import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { clearToken } from "@/store/slices/authSlice";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">HS</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="px-2">
        <SidebarMenuButton onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
