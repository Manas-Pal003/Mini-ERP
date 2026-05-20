

import { useState } from "react";
import { toast } from "sonner";
import {
  User,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Camera,
  Save,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AccessDenied from "@/components/common/AccessDenied";
import { getCurrentPermissions } from "@/lib/permissions";

export default function Settings() {
  const userPermissions = getCurrentPermissions();

  if (!userPermissions.canViewSettings) {
    return <AccessDenied />;
  }

  const [profile, setProfile] = useState({
    fullName: "System Admin",
    email: "admin@invoice-system.local",
    role: "ADMIN",
    bio: "",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    localStorage.setItem("adminProfile", JSON.stringify(profile));
    toast.success("Profile saved successfully");
  };

  const handleUpdatePassword = () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      toast.error("Please fill all password fields");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    toast.success("Password updated successfully");

    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page Header */}
        {/* <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <Grid2X2 className="h-6 w-6" />
              </div>

              <h1 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Settings
              </h1>
            </div> */}

            {/* <Avatar className="h-11 w-11">
              <AvatarImage src="https://i.pravatar.cc/100?img=12" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </CardContent>
        </Card> */}

        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 h-12 rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
            <TabsTrigger
              value="profile"
              className="h-10 gap-2 rounded-lg px-5 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="h-10 gap-2 rounded-lg px-5 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <LockKeyhole className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-slate-200/60 px-7 py-5 dark:border-white/5">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                  Profile Information
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Update your account&apos;s profile information and email address.
                </p>
              </CardHeader>

              <CardContent className="p-7">
                <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
                  {/* Avatar section */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-28 w-28">
                        <AvatarImage src="https://i.pravatar.cc/200?img=12" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>

                      <button className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>

                    <Button variant="outline" size="sm" className="mt-4">
                      Change Photo
                    </Button>

                    <p className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                      Allowed *.jpg, *.png, *.gif
                      <br />
                      Maximum size of 5MB
                    </p>
                  </div>

                  {/* Form section */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label>Full Name</Label>

                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          value={profile.fullName}
                          onChange={(e) =>
                            setProfile({ ...profile, fullName: e.target.value })
                          }
                          className="pl-10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email Address</Label>

                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Email cannot be changed for security reasons
                      </p>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          value={profile.email}
                          disabled
                          className="pl-10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Role</Label>

                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                        <Input
                          value={profile.role}
                          disabled
                          className="pl-10 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Short Bio{" "}
                        <span className="font-normal text-slate-400">
                          (Optional)
                        </span>
                      </Label>

                      <Textarea
                        placeholder="Write a few sentences about yourself."
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile({ ...profile, bio: e.target.value })
                        }
                        className="min-h-[90px] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="flex justify-end gap-3 border-t border-slate-200/60 bg-white/50 px-7 py-4 dark:border-white/5 dark:bg-zinc-900/50">
                <Button variant="outline">Cancel</Button>

                <Button onClick={handleSaveProfile} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  Save Profile
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
              <CardHeader className="border-b border-slate-200/60 px-7 py-5 dark:border-white/5">
                <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">
                  Security Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Update your password and secure your admin account.
                </p>
              </CardHeader>

              <CardContent className="space-y-5 p-7">
                <div className="space-y-2">
                  <Label>Current Password</Label>

                  <Input
                    type="password"
                    placeholder="Enter current password"
                    value={security.currentPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        currentPassword: e.target.value,
                      })
                    }
                    className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>New Password</Label>

                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={security.newPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        newPassword: e.target.value,
                      })
                    }
                    className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>

                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={security.confirmPassword}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </CardContent>

              <div className="flex justify-end gap-3 border-t border-slate-200/60 bg-white/50 px-7 py-4 dark:border-white/5 dark:bg-zinc-900/50">
                <Button variant="outline">Cancel</Button>

                <Button
                  onClick={handleUpdatePassword}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <LockKeyhole className="h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}