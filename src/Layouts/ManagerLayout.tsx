import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ReceiptText,
  LogOut,
  Menu,
  Bell,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const managerMenu = [
  {
    title: "Dashboard",
    url: "/manager/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Invoices",
    url: "/manager/invoices",
    icon: ReceiptText,
  },
];

export default function ManagerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
            ERP
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-950 dark:text-white">
              Manager Panel
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mini ERP Workspace
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Manager Menu
          </p>

          <div className="mt-4 space-y-2">
            {managerMenu.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              Manager User
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              manager@mini-erp.local
            </p>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="mt-4 w-full justify-start gap-2 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:px-8">
          <div className="flex flex-1 min-w-0 items-center gap-3">
            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold text-slate-950 dark:text-white">
                Manager Workspace
              </h2>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                Dashboard and invoice management
              </p>
            </div>
          </div>

          <div className="hidden w-[360px] shrink-0 items-center gap-3 md:flex">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search invoices..."
                className="h-11 rounded-xl pl-10 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-xl"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}