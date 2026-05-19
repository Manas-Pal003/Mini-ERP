import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldAlert,
  LayoutDashboard,
  LockKeyhole,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="w-full max-w-[760px]">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-slate-900">
          <div className="relative overflow-hidden bg-slate-950 px-8 py-10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.45),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(14,165,233,0.28),transparent_32%)]" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-red-300 ring-1 ring-white/15 backdrop-blur">
                <ShieldAlert className="h-8 w-8" />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
                Access Restricted
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Unauthorized Access
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                You do not have permission to view this section. This page is
                protected by role-based access control.
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-8 md:grid-cols-3">
            <InfoCard
              icon={LockKeyhole}
              title="Permission Required"
              description="Your current role does not allow access to this module."
            />

            <InfoCard
              icon={UserRound}
              title="Role Based UI"
              description="Admin, Manager, Staff and Accountant have different access."
            />

            <InfoCard
              icon={LayoutDashboard}
              title="Safe Redirect"
              description="Return to dashboard and continue with allowed sections."
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-8 py-5 dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Need access? Contact your administrator.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="h-11 rounded-xl"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>

              <Button
                asChild
                className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                <Link to="/admin/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="font-semibold text-slate-950 dark:text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}