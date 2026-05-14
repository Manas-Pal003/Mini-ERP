import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .optional()
      .refine(
        (value) => !value || /^[0-9]{10}$/.test(value),
        "Phone number must be 10 digits"
      ),
    role: z.enum(["Manager", "Staff"], {
      message: "Please select a role",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Staff",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // Mock register flow
      const newUser = {
        id: crypto.randomUUID(),
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
        status: "Active",
        createdAt: new Date().toISOString(),
      };

      console.log("Registered User:", newUser);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-8">
            <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl bg-white border border-slate-100 flex-row-reverse">
                {/* Right Section (Branding) */}
                <div className="hidden lg:flex w-1/2 flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
                    
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
                            Join our platform today. Simplify your workflow and empower your team with our comprehensive tools.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                            <p className="font-medium text-white mb-2">"Setup took less than 5 minutes."</p>
                            <p className="text-sm text-slate-400">— New User</p>
                        </div>
                    </div>
                </div>

                {/* Left Section (Form) */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                    <div className="mx-auto w-full max-w-md space-y-6">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                Create an Account
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Enter your details to get started.
                            </p>
                        </div>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2">
                                                <FormLabel className="text-slate-700">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" className="h-10 bg-slate-50/50" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 sm:col-span-1">
                                                <FormLabel className="text-slate-700">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john@example.com"
                                                        className="h-10 bg-slate-50/50"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 sm:col-span-1">
                                                <FormLabel className="text-slate-700">Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="1234567890"
                                                        className="h-10 bg-slate-50/50"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-700">Role</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="h-10 bg-slate-50/50">
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectItem value="Manager">Manager</SelectItem>
                                                    <SelectItem value="Staff">Staff</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 sm:col-span-1">
                                                <FormLabel className="text-slate-700">Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Create password"
                                                        className="h-10 bg-slate-50/50"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem className="col-span-2 sm:col-span-1">
                                                <FormLabel className="text-slate-700">Confirm</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm password"
                                                        className="h-10 bg-slate-50/50"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 mt-4 text-base font-medium transition-all hover:shadow-md"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </Button>
                            </form>
                        </Form>

                        <p className="text-sm text-center text-slate-500 mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="font-medium text-primary hover:underline transition-colors"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
  );
}