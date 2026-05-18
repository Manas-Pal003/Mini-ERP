export type UserRole = "Admin" | "Manager" | "Staff" | "Accountant";

export const permissions = {
  Admin: {
    canViewDashboard: true,
    canViewUsers: true,
    canViewProducts: true,
    canViewInvoices: true,
    canViewExpenses: true,
    canViewSettings: true,
    canViewAuditLogs: true,
    canCreate: true,
    canEdit: true,
    canDelete: true,
  },

  Manager: {
    canViewDashboard: true,
    canViewUsers: true,
    canViewProducts: true,
    canViewInvoices: true,
    canViewExpenses: true,
    canViewSettings: false,
    canViewAuditLogs: false,
    canCreate: true,
    canEdit: true,
    canDelete: false,
  },

  Staff: {
    canViewDashboard: true,
    canViewUsers: false,
    canViewProducts: false,
    canViewInvoices: true,
    canViewExpenses: true,
    canViewSettings: false,
    canViewAuditLogs: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
  },

  Accountant: {
    canViewDashboard: true,
    canViewUsers: false,
    canViewProducts: false,
    canViewInvoices: true,
    canViewExpenses: true,
    canViewSettings: false,
    canViewAuditLogs: false,
    canCreate: true,
    canEdit: true,
    canDelete: false,
  },
};

export function getCurrentUserRole(): UserRole {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) return "Staff";

  try {
    const user = JSON.parse(currentUser);
    return user.role || "Staff";
  } catch {
    return "Staff";
  }
}

export function getCurrentPermissions() {
  const role = getCurrentUserRole();
  return permissions[role];
}