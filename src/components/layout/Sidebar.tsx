import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  Users,
  Package,
  Receipt,
  Wallet,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Invoices",
    url: "/admin/invoices",
    icon: Receipt,
  },
  {
    title: "Expenses",
    url: "/admin/expenses",
    icon: Wallet,
  },
];

const accountItems = [
  {
    title: "Profile",
    url: "/admin/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white font-bold text-xl">
            ERP
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold">
              Mini ERP
            </span>

            <span className="text-sm text-muted-foreground">
              Admin Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-3 py-4">
        {/* Main Menu */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-medium px-2 text-base">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu >
              {menuItems.map((item) => {
                const isActive =
                  location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                     className="h-12 text-base"
                      asChild
                      isActive={isActive}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-6 w-6" />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="text-xs font-medium px-2 text-base">
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => {
                const isActive =
                  location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                       className="h-12 text-base"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-6 w-6" />

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 text-base">
              <LogOut className="h-6 w-6" />

              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;