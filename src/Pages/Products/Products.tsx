import PageSkeleton from "@/components/common/PageSkeleton";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getCurrentPermissions } from "@/lib/permissions";

import {
  Package,
  Boxes,
  AlertTriangle,
  BadgeIndianRupee,
  Plus,
  ChevronDown,
  PackagePlus,
  PencilLine,
  Truck,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

type Product = {
  sku: string;
  name: string;
  category: string;
  stock: string;
  price: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  description?: string;
};

const stats = [
  {
    title: "Total Products",
    value: "568",
    note: "+24",
    noteText: "new products added",
    icon: Package,
    color: "green",
    spark: [
      { value: 25 },
      { value: 30 },
      { value: 38 },
      { value: 42 },
      { value: 50 },
      { value: 62 },
      { value: 78 },
    ],
  },
  {
    title: "Total Stock",
    value: "4,820",
    note: "+8.5%",
    noteText: "stock growth",
    icon: Boxes,
    color: "blue",
    spark: [
      { value: 22 },
      { value: 28 },
      { value: 34 },
      { value: 45 },
      { value: 48 },
      { value: 65 },
      { value: 82 },
    ],
  },
  {
    title: "Low Stock",
    value: "32",
    note: "12",
    noteText: "need restock",
    icon: AlertTriangle,
    color: "orange",
    spark: [
      { value: 60 },
      { value: 58 },
      { value: 55 },
      { value: 50 },
      { value: 46 },
      { value: 42 },
      { value: 35 },
    ],
  },
  {
    title: "Stock Value",
    value: "₹12,84,500",
    note: "+15%",
    noteText: "from last month",
    icon: BadgeIndianRupee,
    color: "purple",
    spark: [
      { value: 30 },
      { value: 38 },
      { value: 42 },
      { value: 55 },
      { value: 62 },
      { value: 70 },
      { value: 86 },
    ],
  },
];

const overviewData = [
  { month: "Jan", products: 380, stock: 2800 },
  { month: "Feb", products: 420, stock: 3200 },
  { month: "Mar", products: 455, stock: 3500 },
  { month: "Apr", products: 480, stock: 3850 },
  { month: "May", products: 530, stock: 4300 },
  { month: "Jun", products: 548, stock: 4550 },
  { month: "Jul", products: 568, stock: 4820 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#22c55e" },
  { name: "Office Items", value: 24, color: "#3b82f6" },
  { name: "Furniture", value: 18, color: "#f97316" },
  { name: "Accessories", value: 13, color: "#8b5cf6" },
  { name: "Others", value: 10, color: "#94a3b8" },
];

const productsTable: Product[] = [
  {
    sku: "PRD-1024",
    name: "Wireless Mouse",
    category: "Electronics",
    stock: "84",
    price: "₹1,250",
    status: "In Stock",
  },
  {
    sku: "PRD-1023",
    name: "Office Chair",
    category: "Furniture",
    stock: "18",
    price: "₹6,800",
    status: "In Stock",
  },
  {
    sku: "PRD-1022",
    name: "Printer Ink",
    category: "Office Items",
    stock: "6",
    price: "₹950",
    status: "Low Stock",
  },
  {
    sku: "PRD-1021",
    name: "Laptop Stand",
    category: "Accessories",
    stock: "42",
    price: "₹1,999",
    status: "In Stock",
  },
  {
    sku: "PRD-1020",
    name: "USB Keyboard",
    category: "Electronics",
    stock: "0",
    price: "₹1,400",
    status: "Out of Stock",
  },
];

const activityData = [
  {
    title: "Product added",
    desc: "Wireless Mouse added to inventory",
    time: "10 min ago",
    icon: PackagePlus,
    color: "green",
  },
  {
    title: "Stock updated",
    desc: "Printer Ink stock updated to 6",
    time: "32 min ago",
    icon: Boxes,
    color: "blue",
  },
  {
    title: "Product edited",
    desc: "Office Chair price updated",
    time: "1 hr ago",
    icon: PencilLine,
    color: "orange",
  },
  {
    title: "Restock requested",
    desc: "USB Keyboard requires restock",
    time: "2 hrs ago",
    icon: Truck,
    color: "purple",
  },
];

const styles = {
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    line: "#10b981",
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    line: "#3b82f6",
  },
  orange: {
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    line: "#f59e0b",
  },
  purple: {
    bg: "bg-violet-500/10 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    line: "#8b5cf6",
  },
  red: {
    bg: "bg-rose-500/10 dark:bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    line: "#f43f5e",
  },
};

function StatusBadge({ status }: { status: string }) {
  const statusClass =
    status === "In Stock"
      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      : status === "Low Stock"
      ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
      : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";

  return (
    <span className={`rounded-md px-3 py-1 text-xs font-medium ${statusClass}`}>
      {status}
    </span>
  );
}

function StatCard({ item }: { item: (typeof stats)[number] }) {
  const Icon = item.icon;
  const color = styles[item.color as keyof typeof styles];

  return (
    <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-5">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.bg}`}
          >
            <Icon className={`h-8 w-8 ${color.text}`} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {item.title}
            </p>

            <h3 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-slate-50">
              {item.value}
            </h3>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              <span className={`font-semibold ${color.text}`}>
                {item.note}
              </span>{" "}
              {item.noteText}
            </p>
          </div>
        </div>

        <div className="h-16 w-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={item.spark}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color.line}
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Products() {

  const userPermissions = getCurrentPermissions();

  if (!userPermissions.canViewProducts) {
    return <AccessDenied />;
  }

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    status: "In Stock" as Product["status"],
    description: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedProducts = localStorage.getItem("products");

      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(productsTable);
      }

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, loading]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [editingProductId]);

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      status: "In Stock",
      description: "",
    });

    setEditingProductId(null);
  };

  const handleSaveProduct = () => {
  if (
    !formData.name ||
    !formData.category ||
    !formData.stock ||
    !formData.price
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  if (editingProductId) {
    setProducts((prev) =>
      prev.map((product) =>
        product.sku === editingProductId
          ? {
              ...product,
              name: formData.name,
              category: formData.category,
              stock: formData.stock,
              price: `₹${Number(formData.price).toLocaleString("en-IN")}`,
              status: formData.status,
              description: formData.description,
            }
          : product
      )
    );

    toast.success("Product updated successfully");
  } else {
    const newProduct: Product = {
      sku: `PRD-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      stock: formData.stock,
      price: `₹${Number(formData.price).toLocaleString("en-IN")}`,
      status: formData.status,
      description: formData.description,
    };

    setProducts((prev) => [newProduct, ...prev]);

    toast.success("Product added successfully");
  }

  resetForm();
  setOpen(false);
};
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.sku);

    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price.replace(/[₹,]/g, ""),
      status: product.status,
      description: product.description || "",
    });

    setOpen(true);
  };

  const handleDeleteProduct = (sku: string) => {
    setProductToDelete(sku);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (!productToDelete) return;

    setProducts((prev) => prev.filter((product) => product.sku !== productToDelete));

    toast.success("Product deleted successfully");
    setProductToDelete(null);
  };

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 dark:bg-black">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage products, stock levels and inventory value
            </p> */}
          </div>

          {/* Add Button only show when user has permission */}
          {userPermissions.canCreate && (
            <Button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="gap-2 rounded-xl bg-green-600 px-5 hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  Inventory Overview
                </CardTitle>

                <div className="mt-5 flex items-center gap-6 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-6 rounded-full bg-green-500" />
                    Products
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-6 rounded-full bg-blue-500" />
                    Stock
                  </div>
                </div>
              </div>

              <Button variant="outline" className="gap-2 rounded-xl">
                Monthly
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overviewData}>
                  <defs>
                    <linearGradient
                      id="productFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.14} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                  <YAxis axisLine={false} tickLine={false} width={45} />
                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="products"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    fill="url(#productFill)"
                  />

                  <Line
                    type="monotone"
                    dataKey="stock"
                    stroke="#3b82f6"
                    strokeWidth={2.2}
                    dot={{ r: 3, fill: "#3b82f6" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Products by Category
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid items-center gap-6 md:grid-cols-2 xl:grid-cols-[220px_1fr]">
                <div className="relative h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        innerRadius={58}
                        outerRadius={96}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {categoryData.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Total
                    </span>

                    <span className="text-3xl font-semibold text-slate-950 dark:text-slate-50">
                      568
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3.5 w-3.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />

                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.name}
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.75fr_1fr]">
          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Recent Products
              </CardTitle>

              <Button variant="outline" className="border-green-200 text-green-600">
                View All
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
                <table className="w-full min-w-[900px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200/60 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-400">
                      <th className="px-4 py-4 font-medium">SKU</th>
                      <th className="px-4 py-4 font-medium">Product</th>
                      <th className="px-4 py-4 font-medium">Category</th>
                      <th className="px-4 py-4 font-medium">Stock</th>
                      <th className="px-4 py-4 font-medium">Price</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                      <th className="px-4 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((item) => (
                      <tr
                        key={item.sku}
                        className="group border-t border-slate-100 text-sm transition-colors hover:bg-slate-50/50 dark:border-slate-800/60 dark:hover:bg-slate-800/30"
                      >
                        <td className="px-4 py-4 font-medium text-slate-900 dark:text-slate-100">
                          {item.sku}
                        </td>

                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.name}
                        </td>

                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.category}
                        </td>

                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.stock}
                        </td>

                        <td className="px-4 py-4 text-slate-900 dark:text-slate-100">
                          {item.price}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-2">

                            {/* Edit button only show when user has permission */}
                            {userPermissions.canEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(item)}
                              className="h-8 rounded-lg border-blue-200 px-3 text-blue-600 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            )}
                            
                            {/* Delete button only show when user has permission */}
                            {userPermissions.canDelete && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(item.sku)}
                              className="h-8 rounded-lg border-red-200 px-3 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {products.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                        >
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-white/5 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
                Recent Activity
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {activityData.map((item) => {
                const Icon = item.icon;
                const c = styles[item.color as keyof typeof styles];

                return (
                  <div key={item.title} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}
                      >
                        <Icon className={`h-5 w-5 ${c.text}`} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                          {item.title}
                        </p>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>
              {editingProductId ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Office Items">Office Items</option>
                <option value="Furniture">Furniture</option>
                <option value="Accessories">Accessories</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                placeholder="Enter product price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Product["status"],
                  })
                }
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-green-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Optional product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
                onClick={handleSaveProduct}
                className="bg-green-600 hover:bg-green-700"
              >
                {editingProductId ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteProduct}
        title="Confirm Deletion"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </main>
  );
}