import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                               Validation Schema                            */
/* -------------------------------------------------------------------------- */

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/* -------------------------------------------------------------------------- */
/*                                Mock Users                                  */
/* -------------------------------------------------------------------------- */

const demoUsers = [
    {
        role: "Admin",
        email: "admin@example.com",
        password: "admin123",
    },
    {
        role: "Manager",
        email: "manager@example.com",
        password: "manager123",
    },
    {
        role: "Staff",
        email: "staff@example.com",
        password: "staff123",
    },
];

/* -------------------------------------------------------------------------- */
/*                                Login Page                                  */
/* -------------------------------------------------------------------------- */

const Login = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const matchedUser = demoUsers.find(
                (user) =>
                    user.email === values.email &&
                    user.password === values.password
            );

            if (!matchedUser) {
                toast.error("Invalid email or password");
                return;
            }

            // Mock token + user storage
            localStorage.setItem("token", "mock-auth-token");

            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: matchedUser.email,
                    role: matchedUser.role,
                })
            );

            toast.success("Login successful");

            navigate("/admin/dashboard");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-8">
            <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl bg-white border border-slate-100">
                {/* Left Section (Branding) */}
                <div className="hidden lg:flex w-1/2 flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Mini ERP
                            </h1>
                        </div>

                        <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-md">
                            Streamline your business operations. Manage users, products, invoices, and expenses from a single, intuitive dashboard.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                            <p className="font-medium text-white mb-2">"The best tool for our daily operations."</p>
                            <p className="text-sm text-slate-400">— Admin Team</p>
                        </div>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                    <div className="mx-auto w-full max-w-md space-y-8">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Enter your credentials to access your dashboard.
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-700">Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="name@example.com"
                                                    type="email"
                                                    className="h-11 bg-slate-50/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-700 flex justify-between">
                                                Password
                                                <Link to="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your password"
                                                    type="password"
                                                    className="h-11 bg-slate-50/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    className="w-full h-11 mt-2 text-base font-medium transition-all hover:shadow-md"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <p className="text-sm text-center text-slate-500">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="text-primary font-medium hover:underline transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;