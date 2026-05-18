import { useState } from "react";
import { getCurrentPermissions } from "@/lib/permissions";
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
  ChevronDown,
  FileText,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
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

const userSubMenus = [
  {
    title: "Manage Admins",
    url: "/admin/users/admins",
  },
  {
    title: "Staffs",
    url: "/admin/users/staffs",
  },
  {
    title: "Accountants",
    url: "/admin/users/accountants",
  },
  {
    title: "Managers",
    url: "/admin/users/managers",
  },
];

const accountItems = [
  // {
  //   title: "Profile",
  //   url: "/admin/profile", 
  //   icon: User,
  // },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const userPermissions = getCurrentPermissions();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.title === "Users") return userPermissions.canViewUsers;
    if (item.title === "Products") return userPermissions.canViewProducts;
    if (item.title === "Invoices") return userPermissions.canViewInvoices;
    if (item.title === "Expenses") return userPermissions.canViewExpenses;

    return true;
  });

  const filteredAccountItems = accountItems.filter((item) => {
    if (item.title === "Settings") return userPermissions.canViewSettings;
    return true;
  });

  const [usersOpen, setUsersOpen] = useState(true);

  const isUsersActive = location.pathname.startsWith("/admin/users");

  const handleLogout = () => {  
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-800">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 px-2 py-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-slate-950 p-1 shadow-lg dark:bg-white">
            <img src={Logo} alt="Mini ERP Logo" className="h-full w-full object-contain" />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-950 dark:text-slate-50">
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
          <SidebarGroupLabel className="px-2 text-xs font-medium text-slate-500">
            Main Menu
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/admin/dashboard"}
                  className="h-12 text-base"
                >
                  <Link to="/admin/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Users Dropdown */}
              {userPermissions.canViewUsers && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    type="button"
                    isActive={isUsersActive}
                    onClick={() => setUsersOpen(!usersOpen)}
                    className="h-12 text-base"
                  >
                    <Users className="h-5 w-5" />

                    <span>Users</span>

                    <ChevronDown
                      className={`ml-auto h-4 w-4 transition-transform ${usersOpen ? "rotate-180" : ""
                        }`}
                    />
                  </SidebarMenuButton>

                  {usersOpen && (
                    <div className="ml-5 mt-2 border-l border-slate-200 pl-5 dark:border-white/10">
                      <div className="space-y-1">
                        {userSubMenus.map((item) => {
                          const isActive = location.pathname === item.url;

                          return (
                            <Link
                              key={item.title}
                              to={item.url}
                              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                                  ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white"
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                                }`}
                            >
                              {item.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </SidebarMenuItem>
              )}

              {/* Other Main Menu Items */}
              {filteredMenuItems.slice(1).map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-12 text-base"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Audit Logs */}
              {userPermissions.canViewAuditLogs && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === "/admin/audit-logs"}
                    className="h-12 text-base"
                  >
                    <Link to="/admin/audit-logs">
                      <FileText className="h-5 w-5" />
                      <span>Audit Logs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className="px-2 text-xs font-medium text-slate-500">
            Account
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {filteredAccountItems.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-12 text-base"
                    >
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5" />
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
      <SidebarFooter className="border-t border-slate-200 p-3 dark:border-white/10">
        <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-black">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="System Admin"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950 dark:text-slate-50">
                System Admin
              </p>

              <div className="mt-1 flex  flex-wrap gap-1">
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                  Admin
                </span>

                <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-600 dark:bg-purple-950 dark:text-purple-300">
                  All Projects
                </span>
              </div>
            </div>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-12 text-base text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;