import PageSkeleton from "@/components/common/PageSkeleton";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";

import {
  Activity,
  Search,
  ShieldCheck,
  UserPlus,
  Trash2,
  FileText,
  Package,
  ReceiptText,
  Wallet,
  Download,
  Clock3,
  RotateCcw,
  Eraser,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AccessDenied from "@/components/common/AccessDenied";
import { getCurrentPermissions } from "@/lib/permissions";

type AuditLog = {
  id: string;
  module: "Users" | "Products" | "Invoices" | "Expenses" | "Auth" | "Settings";
  action: "Created" | "Updated" | "Deleted" | "Login" | "Exported";
  description: string;
  user: string;
  role: string;
  time: string;
  ip: string;
};

const defaultAuditLogs: AuditLog[] = [
  {
    id: "LOG-1001",
    module: "Users",
    action: "Created",
    description: "New manager user Rohit Sharma was added",
    user: "System Admin",
    role: "Admin",
    time: "15 May 2026, 10:42 AM",
    ip: "192.168.1.20",
  },
  {
    id: "LOG-1002",
    module: "Invoices",
    action: "Updated",
    description: "Invoice INV-1024 marked as paid",
    user: "System Admin",
    role: "Admin",
    time: "15 May 2026, 10:30 AM",
    ip: "192.168.1.20",
  },
  {
    id: "LOG-1003",
    module: "Products",
    action: "Updated",
    description: "Wireless Mouse stock updated from 52 to 84",
    user: "System Admin",
    role: "Admin",
    time: "15 May 2026, 09:55 AM",
    ip: "192.168.1.21",
  },
  {
    id: "LOG-1004",
    module: "Expenses",
    action: "Created",
    description: "Travel expense request submitted",
    user: "Manager User",
    role: "Manager",
    time: "15 May 2026, 09:20 AM",
    ip: "192.168.1.34",
  },
  {
    id: "LOG-1005",
    module: "Auth",
    action: "Login",
    description: "Admin logged into the system",
    user: "System Admin",
    role: "Admin",
    time: "15 May 2026, 09:05 AM",
    ip: "192.168.1.20",
  },
  {
    id: "LOG-1006",
    module: "Expenses",
    action: "Deleted",
    description: "Duplicate office supplies expense was deleted",
    user: "System Admin",
    role: "Admin",
    time: "14 May 2026, 06:45 PM",
    ip: "192.168.1.20",
  },
  {
    id: "LOG-1007",
    module: "Settings",
    action: "Updated",
    description: "Profile information was updated",
    user: "System Admin",
    role: "Admin",
    time: "14 May 2026, 05:12 PM",
    ip: "192.168.1.20",
  },
  {
    id: "LOG-1008",
    module: "Invoices",
    action: "Exported",
    description: "Invoice report exported as CSV",
    user: "System Admin",
    role: "Admin",
    time: "14 May 2026, 04:40 PM",
    ip: "192.168.1.20",
  },
];

const moduleStyles = {
  Users: {
    icon: UserPlus,
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
  Products: {
    icon: Package,
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  Invoices: {
    icon: ReceiptText,
    bg: "bg-violet-500/10 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
  },
  Expenses: {
    icon: Wallet,
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
  },
  Auth: {
    icon: ShieldCheck,
    bg: "bg-rose-500/10 dark:bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
  },
  Settings: {
    icon: FileText,
    bg: "bg-slate-500/10 dark:bg-slate-500/10",
    text: "text-slate-600 dark:text-slate-400",
  },
};

function ActionBadge({ action }: { action: AuditLog["action"] }) {
  const className =
    action === "Created"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : action === "Updated"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      : action === "Deleted"
      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
      : action === "Login"
      ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
      : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${className}`}>
      {action}
    </span>
  );
}

export default function AuditLogs() {

  const userPermissions = getCurrentPermissions();

  if (!userPermissions.canViewAuditLogs) {
    return <AccessDenied />;
  }

  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedLogs = localStorage.getItem("auditLogs");

      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      } else {
        setLogs(defaultAuditLogs);
        localStorage.setItem("auditLogs", JSON.stringify(defaultAuditLogs));
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("auditLogs", JSON.stringify(logs));
    }
  }, [logs, loading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        log.id.toLowerCase().includes(keyword) ||
        log.description.toLowerCase().includes(keyword) ||
        log.user.toLowerCase().includes(keyword) ||
        log.module.toLowerCase().includes(keyword) ||
        log.action.toLowerCase().includes(keyword);

      const matchesModule =
        moduleFilter === "All" || log.module === moduleFilter;

      const matchesAction =
        actionFilter === "All" || log.action === actionFilter;

      return matchesSearch && matchesModule && matchesAction;
    });
  }, [logs, search, moduleFilter, actionFilter]);

  const totalLogs = logs.length;
  const todayLogs = logs.filter((log) => log.time.includes("15 May")).length;
  const deletedLogs = logs.filter((log) => log.action === "Deleted").length;
  const authLogs = logs.filter((log) => log.module === "Auth").length;

  const handleClearLogs = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmClearLogs = () => {
    setLogs([]);
    localStorage.setItem("auditLogs", JSON.stringify([]));
    toast.success("All audit logs cleared successfully");
  };

  const handleResetLogs = () => {
    setLogs(defaultAuditLogs);
    localStorage.setItem("auditLogs", JSON.stringify(defaultAuditLogs));
    toast.success("Audit logs reset to default");
  };

  const handleExportLogs = () => {
    if (filteredLogs.length === 0) {
      toast.error("No logs available to export");
      return;
    }

    const headers = [
      "Log ID",
      "Module",
      "Action",
      "Description",
      "User",
      "Role",
      "Time",
      "IP Address",
    ];

    const rows = filteredLogs.map((log) => [
      log.id,
      log.module,
      log.action,
      log.description,
      log.user,
      log.role,
      log.time,
      log.ip,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "audit-logs.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {/* <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
              Audit Logs
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track user activities, system changes, and security actions.
            </p> */}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleResetLogs}
              className="gap-2 rounded-xl"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Logs
            </Button>

            <Button
              variant="outline"
              onClick={handleClearLogs}
              className="gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Eraser className="h-4 w-4" />
              Clear Logs
            </Button>

            <Button
              onClick={handleExportLogs}
              className="gap-2 rounded-xl bg-slate-900 px-5 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
            >
              <Download className="h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <Activity className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Logs
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {totalLogs}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300">
                <Clock3 className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Today
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {todayLogs}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300">
                <Trash2 className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Deleted Actions
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {deletedLogs}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
                <ShieldCheck className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Auth Events
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {authLogs}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-zinc-900/50">
          <CardHeader className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Activity History
              </CardTitle>

              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    placeholder="Search logs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 md:w-72 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <select
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="All">All Modules</option>
                  <option value="Users">Users</option>
                  <option value="Products">Products</option>
                  <option value="Invoices">Invoices</option>
                  <option value="Expenses">Expenses</option>
                  <option value="Auth">Auth</option>
                  <option value="Settings">Settings</option>
                </select>

                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="All">All Actions</option>
                  <option value="Created">Created</option>
                  <option value="Updated">Updated</option>
                  <option value="Deleted">Deleted</option>
                  <option value="Login">Login</option>
                  <option value="Exported">Exported</option>
                </select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-white/5">
              <table className="w-full min-w-[1000px] text-left">
                <thead>
                  <tr className="border-b border-slate-200/60 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-zinc-900/50 dark:text-slate-400">
                    <th className="px-4 py-4 font-medium">Log ID</th>
                    <th className="px-4 py-4 font-medium">Module</th>
                    <th className="px-4 py-4 font-medium">Action</th>
                    <th className="px-4 py-4 font-medium">Description</th>
                    <th className="px-4 py-4 font-medium">User</th>
                    <th className="px-4 py-4 font-medium">Time</th>
                    <th className="px-4 py-4 font-medium">IP Address</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLogs.map((log) => {
                    const moduleStyle = moduleStyles[log.module];
                    const Icon = moduleStyle.icon;

                    return (
                      <tr
                        key={log.id}
                        className="group border-t border-slate-100 text-sm transition-colors hover:bg-slate-50/50 dark:border-white/5 dark:hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                          {log.id}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl ${moduleStyle.bg}`}
                            >
                              <Icon className={`h-4 w-4 ${moduleStyle.text}`} />
                            </div>

                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {log.module}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <ActionBadge action={log.action} />
                        </td>

                        <td className="max-w-[360px] px-4 py-4 text-slate-600 dark:text-slate-400">
                          {log.description}
                        </td>

                        <td className="px-4 py-4">
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {log.user}
                          </p>

                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {log.role}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                          {log.time}
                        </td>

                        <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                          {log.ip}
                        </td>
                      </tr>
                    );
                  })}

                  {filteredLogs.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        No audit logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmClearLogs}
        title="Clear Audit Logs"
        description="Are you sure you want to clear all audit logs? This action cannot be undone."
      />
    </main>
  );
}