import PageSkeleton from "@/components/common/PageSkeleton";
import { getCurrentPermissions } from "@/lib/permissions";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import {
  UsersRound,
  UserCheck,
  UserX,
  ShieldCheck,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AccessDenied from "@/components/common/AccessDenied";

type UserRole = "Admin" | "Manager" | "Staff" | "Accountant";

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Inactive";
  joined: string;
  note?: string;
};

const usersTable: User[] = [
  {
    id: "USR-1001",
    name: "Rohit Sharma",
    email: "rohit@example.com",
    role: "Manager",
    status: "Active",
    joined: "14 May 2026",
  },
  {
    id: "USR-1002",
    name: "Priya Singh",
    email: "priya@example.com",
    role: "Admin",
    status: "Active",
    joined: "13 May 2026",
  },
  {
    id: "USR-1003",
    name: "Amit Verma",
    email: "amit@example.com",
    role: "Staff",
    status: "Inactive",
    joined: "12 May 2026",
  },
  {
    id: "USR-1004",
    name: "Neha Gupta",
    email: "neha@example.com",
    role: "Staff",
    status: "Active",
    joined: "11 May 2026",
  },
  {
    id: "USR-1005",
    name: "Karan Mehta",
    email: "karan@example.com",
    role: "Manager",
    status: "Active",
    joined: "10 May 2026",
  },
  {
    id: "USR-1006",
    name: "Sanjay Rao",
    email: "sanjay@example.com",
    role: "Accountant",
    status: "Active",
    joined: "09 May 2026",
  },
  {
    id: "USR-1007",
    name: "Meera Iyer",
    email: "meera@example.com",
    role: "Accountant",
    status: "Inactive",
    joined: "08 May 2026",
  },
];

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "Active"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${statusClass}`}>
      {status}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const roleClass =
    role === "Admin"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      : role === "Manager"
      ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
      : role === "Accountant"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
      : "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${roleClass}`}>
      {role}
    </span>
  );
}

export default function Users() {
  const userPermissions = getCurrentPermissions();

  if (!userPermissions.canViewUsers) {
    return <AccessDenied />;
  }

  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff" as UserRole,
    status: "Active" as User["status"],
    joined: "",
    note: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUsers = localStorage.getItem("users");

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        setUsers(usersTable);
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users, loading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [editingUserId]);

  const getRoleFromPath = (): UserRole | "All" => {
    if (location.pathname.includes("/admins")) return "Admin";
    if (location.pathname.includes("/staffs")) return "Staff";
    if (location.pathname.includes("/accountants")) return "Accountant";
    if (location.pathname.includes("/managers")) return "Manager";

    return "All";
  };

  const selectedRole = getRoleFromPath();

  const filteredUsers =
    selectedRole === "All"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const pageTitle =
    selectedRole === "All"
      ? "Users"
      : selectedRole === "Admin"
      ? "Manage Admins"
      : selectedRole === "Staff"
      ? "Staffs"
      : selectedRole === "Accountant"
      ? "Accountants"
      : "Managers";

  const pageDescription =
    selectedRole === "All"
      ? "Manage admins, managers, accountants and staff users"
      : `Manage ${pageTitle.toLowerCase()} in the system`;

  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter(
    (user) => user.status === "Active"
  ).length;
  const inactiveUsers = filteredUsers.filter(
    (user) => user.status === "Inactive"
  ).length;

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: selectedRole === "All" ? "Staff" : selectedRole,
      status: "Active",
      joined: "",
      note: "",
    });

    setEditingUserId(null);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.joined) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingUserId) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status,
                joined: formData.joined,
                note: formData.note,
              }
            : user
        )
      );
      toast.success("User updated successfully");
    } else {
      const newUser: User = {
        id: `USR-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        joined: formData.joined,
        note: formData.note,
      };

      setUsers((prev) => [newUser, ...prev]);
      toast.success("User added successfully");
    }

    resetForm();
    setOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      joined: user.joined,
      note: user.note || "",
    });

    setOpen(true);
  };

  const handleDeleteUser = (id: string) => {
    setUserToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!userToDelete) return;

    setUsers((prev) => prev.filter((user) => user.id !== userToDelete));

    toast.success("User deleted successfully");
    setUserToDelete(null);
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
              {pageTitle}
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {pageDescription}
            </p>
          </div>

          {/* Add User Button only show when user has permission */}
          {userPermissions.canCreate && (
            <Button
              onClick={() => {
                resetForm();
                setOpen(true);
              }}
              className="gap-2 rounded-xl bg-blue-600 px-5 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                <UsersRound className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Users
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {totalUsers}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-300">
                <UserCheck className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Active Users
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {activeUsers}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardContent className="flex items-center gap-5 p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-300">
                <UserX className="h-7 w-7" />
              </div>

              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Inactive Users
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                  {inactiveUsers}
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
                  Current Section
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  {selectedRole === "All" ? "All Roles" : selectedRole}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {pageTitle} List
            </CardTitle>

            <Button variant="outline" className="border-blue-200 text-blue-600">
              View All
            </Button>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-slate-200/60 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-400">
                    <th className="px-4 py-4 font-medium">User ID</th>
                    <th className="px-4 py-4 font-medium">Name</th>
                    <th className="px-4 py-4 font-medium">Email</th>
                    <th className="px-4 py-4 font-medium">Role</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium">Joined</th>
                    <th className="px-4 py-4 font-medium">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((item) => (
                    <tr
                      key={item.id}
                      className="group border-t border-slate-100 text-sm transition-colors hover:bg-slate-50/50 dark:border-slate-800/60 dark:hover:bg-slate-800/30"
                    >
                      <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {item.id}
                      </td>

                      <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                        {item.name}
                      </td>

                      <td className="px-4 py-4 text-slate-600 dark:text-slate-400">
                        {item.email}
                      </td>

                      <td className="px-4 py-4">
                        <RoleBadge role={item.role} />
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge status={item.status} />
                      </td>

                      <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                        {item.joined}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          {/* Edit Button only show when user has permission */}
                          {userPermissions.canEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(item)}
                              className="h-8 rounded-lg border-blue-200 px-3 text-blue-600 hover:bg-blue-50"
                          >
                            Edit
                          </Button>
                          )}

                          {/* Delete Button only show when user has permission */}
                          {userPermissions.canDelete && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(item.id)}
                            className="h-8 rounded-lg border-red-200 px-3 text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                      >
                        No users found in this section.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>
              {editingUserId ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Role</Label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as UserRole,
                  })
                }
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Accountant">Accountant</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as User["status"],
                  })
                }
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label>Joined Date</Label>
              <Input
                type="date"
                value={formData.joined}
                onChange={(e) =>
                  setFormData({ ...formData, joined: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Optional user note"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveUser}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingUserId ? "Update User" : "Save User"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteUser}
        title="Confirm Deletion"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </main>
  );
}