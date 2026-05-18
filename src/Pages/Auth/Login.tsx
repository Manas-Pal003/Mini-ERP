import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    Boxes,
    ReceiptText,
    Wallet,
    UsersRound,
    CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../../assets/Logo.png";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "admin@mini-erp.local",
        password: "admin123",
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please enter email and password");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            let role = "Admin";
            let name = "System Admin";

            const emailLower = formData.email.toLowerCase();
            if (emailLower.includes("manager")) {
                role = "Manager";
                name = "Project Manager";
            } else if (emailLower.includes("staff")) {
                role = "Staff";
                name = "Operations Staff";
            } else if (emailLower.includes("accountant")) {
                role = "Accountant";
                name = "Senior Accountant";
            }

            localStorage.setItem("authToken", "mini-erp-admin-token");
            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    name: name,
                    email: formData.email,
                    role: role,
                })
            );

            toast.success(`Logged in as ${role}! Welcome back.`);
            navigate("/admin/dashboard");
            setIsLoading(false);
        }, 1200);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] text-slate-950 dark:bg-[#020617]">
            <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
                {/* Left Brand Panel */}
                <section className="relative hidden overflow-hidden bg-[#030712] lg:flex lg:flex-col lg:justify-between">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.4),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.25),transparent_40%)]" />

                    <div className="absolute inset-0 opacity-[0.08]">
                        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
                    </div>

                    <div className="relative z-10 p-12">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-1 shadow-xl shadow-blue-600/20">
                                <img src={Logo} alt="Logo" className="h-full w-full object-contain" />
                            </div>

                            <div>
                                <h1 className="text-xl font-semibold text-white">Mini ERP</h1>
                                <p className="text-sm text-slate-300">
                                    Business Management System
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 px-12">
                        <div className="max-w-xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
                                <ShieldCheck className="h-4 w-4 text-blue-300" />
                                Secure Admin Workspace
                            </div>

                            <h2 className="text-5xl font-semibold leading-tight tracking-tight text-white">
                                Manage your business operations from one place.
                            </h2>

                            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                                Control users, products, invoices, expenses, reports, and audit
                                logs through a clean ERP dashboard.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 p-12">
                        <div className="grid max-w-xl grid-cols-2 gap-4">
                            <FeatureCard
                                icon={UsersRound}
                                title="Users"
                                value="Role based"
                            />
                            <FeatureCard icon={Boxes} title="Products" value="Inventory" />
                            <FeatureCard
                                icon={ReceiptText}
                                title="Invoices"
                                value="Billing"
                            />
                            <FeatureCard icon={Wallet} title="Expenses" value="Approvals" />
                        </div>
                    </div>
                </section>

                {/* Right Login Area */}
                <section className="relative flex min-h-screen items-center justify-center px-6 py-10">
                    <div className="absolute right-16 top-16 h-40 w-40 rounded-full bg-blue-100 blur-3xl dark:bg-blue-950/40" />
                    <div className="absolute bottom-16 left-16 h-40 w-40 rounded-full bg-cyan-100 blur-3xl dark:bg-cyan-950/40" />

                    <div className="relative w-full max-w-[440px]">
                        {/* Mobile logo */}
                        <div className="mb-8 flex items-center gap-3 lg:hidden">
                            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 p-1 text-sm font-bold text-white dark:bg-white">
                                <img src={Logo} alt="Logo" className="h-full w-full object-contain" />
                            </div>

                            <div>
                                <h1 className="text-lg font-semibold text-slate-950 dark:text-white">
                                    Mini ERP
                                </h1>
                                <p className="text-sm text-slate-500">Admin Dashboard</p>
                            </div>
                        </div>

                        <div className="rounded-[32px] border border-slate-200 bg-white/80 p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/50">
                            <div className="mb-8">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                                    <LockKeyhole className="h-7 w-7" />
                                </div>

                                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                    Sign in to Mini ERP
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Enter your credentials to access the admin dashboard.
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Email Address</Label>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            placeholder="admin@mini-erp.local"
                                            className="h-12 rounded-xl bg-slate-50 pl-11 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Password</Label>

                                    <div className="relative">
                                        <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) =>
                                                setFormData({ ...formData, password: e.target.value })
                                            }
                                            placeholder="Enter password"
                                            className="h-12 rounded-xl bg-slate-50 pl-11 pr-11 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="h-12 w-full rounded-xl bg-blue-600 text-base font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-70"
                                >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Signing in...
                                    </div>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                                </Button>
                            </form>

                            <div className="mt-8 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-950/50">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                        Demo Roles Quick Login
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setFormData({ email: "admin@mini-erp.local", password: "admin123" })}
                                        className="h-9 text-xs font-bold rounded-xl border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                                    >
                                        Admin
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setFormData({ email: "manager@mini-erp.local", password: "admin123" })}
                                        className="h-9 text-xs font-bold rounded-xl border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                                    >
                                        Manager
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setFormData({ email: "staff@mini-erp.local", password: "admin123" })}
                                        className="h-9 text-xs font-bold rounded-xl border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                                    >
                                        Staff
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setFormData({ email: "accountant@mini-erp.local", password: "admin123" })}
                                        className="h-9 text-xs font-bold rounded-xl border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                                    >
                                        Accountant
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Create Account
                                </Link>
                            </p>

                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                                New users can register with Admin, Manager, Staff or Accountant role.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    value,
}: {
    icon: React.ElementType;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600">
                <Icon className="h-5 w-5" />
            </div>

            <p className="text-sm text-slate-300">{title}</p>
            <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
    );
}