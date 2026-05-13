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

      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-10 w-10" />

              <h1 className="text-3xl font-bold">
                Mini ERP Dashboard
              </h1>
            </div>

            <p className="mt-6 text-slate-300 leading-7">
              Manage users, products, invoices, expenses, and
              business operations from a single modern admin
              dashboard.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Demo Credentials
            </h3>

            {demoUsers.map((user) => (
              <div
                key={user.email}
                className="rounded-xl border border-slate-700 bg-slate-800 p-4"
              >
                <p className="font-semibold">{user.role}</p>

                <p className="text-sm text-slate-300">
                  {user.email}
                </p>

                <p className="text-sm text-slate-300">
                  {user.password}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 sm:p-10 md:p-14 flex items-center">
          <Card className="w-full border-none shadow-none">
            <CardContent className="p-0">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  Welcome Back
                </h2>

                <p className="mt-2 text-slate-500">
                  Login to continue to your dashboard
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Login Button */}
                  <Button
                    type="submit"
                    className="w-full h-11 text-base"
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

              {/* Mobile Demo Credentials */}
              <div className="mt-8 rounded-2xl bg-slate-100 p-5 lg:hidden">
                <h3 className="mb-4 font-semibold text-slate-900">
                  Demo Credentials
                </h3>

                <div className="space-y-3">
                  {demoUsers.map((user) => (
                    <div
                      key={user.email}
                      className="rounded-xl bg-white p-3 border"
                    >
                      <p className="font-medium">
                        {user.role}
                      </p>

                      <p className="text-sm text-slate-600">
                        {user.email}
                      </p>

                      <p className="text-sm text-slate-600">
                        {user.password}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;