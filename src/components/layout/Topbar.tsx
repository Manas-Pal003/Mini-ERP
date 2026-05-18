import { useLocation, useNavigate } from "react-router-dom";
import {
  Download,
  Grid2X2,
  LogOut,
  Settings,
  User,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "@/components/theme-provider";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/products": "Products",
  "/admin/invoices": "Invoices",
  "/admin/expenses": "Expenses",
  "/admin/profile": "Profile",
  "/admin/settings": "Settings",
  "/admin/audit-logs": "Audit Logs",
};

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme, theme } = useTheme();

  let pageTitle = pageTitles[location.pathname] || "Dashboard";
  if (location.pathname === "/admin/invoices" && location.search.includes("view=")) {
    pageTitle = "Invoice Details";
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-black/80">
      <div className="flex h-[70px] items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-2 mr-2" />
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Grid2X2 className="h-5 w-5" />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
            {pageTitle}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-xl border-blue-500/20 bg-blue-500/5 px-4 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-500/10 hover:text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 sm:inline-flex"
          >
            <Download className="mr-2 h-4 w-4" />
            Analysis Report
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/settings")}
            className="h-9 w-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-slate-200">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin User" />
                  <AvatarFallback className="bg-red-600 text-sm font-semibold text-white">
                    AU
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Admin User
                  </p>
                  <p className="text-xs font-normal text-slate-500">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}