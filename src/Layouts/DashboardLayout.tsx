import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <SidebarInset className="bg-white dark:bg-black">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}