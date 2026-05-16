import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    Phone,
    ShieldCheck,
    User,
    UsersRound,
    Boxes,
    ReceiptText,
    Wallet,
    CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserRole = "Admin" | "Manager" | "Staff" | "Accountant";

export default function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "Staff" as UserRole,
        password: "",
        confirmPassword: "",
    });

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Password and confirm password do not match");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const existingUsers = localStorage.getItem("registeredUsers");
            const users = existingUsers ? JSON.parse(existingUsers) : [];

            const newUser = {
                id: `USR-${Date.now()}`,
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                status: "Active",
                joined: new Date().toISOString().slice(0, 10),
            };

            localStorage.setItem(
                "registeredUsers",
                JSON.stringify([newUser, ...users])
            );

            toast.success("Account created successfully! Please login.");
            navigate("/login");
            setIsLoading(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#f6f8fb] dark:bg-slate-950">
            <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
                {/* Left Form Section */}
                <section className="flex min-h-screen items-center justify-center px-6 py-10">
                    <div className="w-full max-w-[520px]">
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                                ERP
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-slate-950 dark:text-white">
                                    Mini ERP
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Create your admin account
                                </p>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
                            <div className="mb-8">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                                    <ShieldCheck className="h-7 w-7" />
                                </div>

                                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                    Create an Account
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    Add your details to access the ERP admin workspace.
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>

                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                        <Input
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                setFormData({ ...formData, fullName: e.target.value })
                                            }
                                            placeholder="Enter full name"
                                            className="h-12 rounded-xl bg-slate-50 pl-11 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>

                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                placeholder="john@example.com"
                                                className="h-12 rounded-xl bg-slate-50 pl-11 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Phone</Label>

                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                                placeholder="9876543210"
                                                className="h-12 rounded-xl bg-slate-50 pl-11 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Role</Label>

                                    <select
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value as UserRole,
                                            })
                                        }
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Accountant">Accountant</option>
                                    </select>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Password</Label>

                                        <div className="relative">
                                            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        password: e.target.value,
                                                    })
                                                }
                                                placeholder="Create password"
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
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Confirm Password</Label>

                                        <div className="relative">
                                            <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={formData.confirmPassword}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        confirmPassword: e.target.value,
                                                    })
                                                }
                                                placeholder="Confirm password"
                                                className="h-12 rounded-xl bg-slate-50 pl-11 pr-11 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
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
                                            Creating account...
                                        </div>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                Already have an account?{" "}
                                <Link to="/login" className="font-semibold text-blue-600">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Right Brand Section */}
                <section className="relative hidden overflow-hidden bg-[#061426] lg:flex lg:flex-col lg:justify-between">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.35),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.22),transparent_32%)]" />

                    <div className="absolute inset-0 opacity-[0.08]">
                        <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />
                    </div>

                    <div className="relative z-10 p-12">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur">
                            <CheckCircle2 className="h-4 w-4 text-green-300" />
                            Secure ERP Registration
                        </div>
                    </div>

                    <div className="relative z-10 px-12">
                        <div className="max-w-xl">
                            <h2 className="text-5xl font-semibold leading-tight tracking-tight text-white">
                                Start managing your business with clarity.
                            </h2>

                            <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                                Create accounts for admins, managers, staff and accountants.
                                Keep your ERP users organized with role-based access.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 p-12">
                        <div className="grid max-w-xl grid-cols-2 gap-4">
                            <FeatureCard
                                icon={UsersRound}
                                title="Users"
                                value="Role Access"
                            />
                            <FeatureCard icon={Boxes} title="Products" value="Inventory" />
                            <FeatureCard
                                icon={ReceiptText}
                                title="Invoices"
                                value="Billing"
                            />
                            <FeatureCard icon={Wallet} title="Expenses" value="Tracking" />
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