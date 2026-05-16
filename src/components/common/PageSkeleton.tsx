import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-44 rounded-lg" />
            <Skeleton className="mt-3 h-4 w-72 rounded-lg" />
          </div>

          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>

        {/* Stats cards */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <CardContent className="flex items-center gap-5 p-5">
                <Skeleton className="h-16 w-16 rounded-2xl" />

                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-6">
              <Skeleton className="h-7 w-64 rounded-lg" />
              <Skeleton className="mt-6 h-[320px] w-full rounded-2xl" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-6">
              <Skeleton className="h-7 w-48 rounded-lg" />
              <Skeleton className="mx-auto mt-8 h-52 w-52 rounded-full" />

              <div className="mt-6 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-9/12" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table + activity */}
        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-48 rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>

              <div className="mt-6 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="p-6">
              <Skeleton className="h-7 w-48 rounded-lg" />

              <div className="mt-6 space-y-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton className="h-11 w-11 rounded-xl" />

                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-56" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}