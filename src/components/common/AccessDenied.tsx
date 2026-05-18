import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300">
          <ShieldX className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-slate-950 dark:text-white">
          Access Denied
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You do not have permission to view this section.
        </p>

        <Button asChild className="mt-6 bg-blue-600 hover:bg-blue-700">
          <Link to="/admin/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}