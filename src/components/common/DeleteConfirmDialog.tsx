import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-[20px] border-none">
        <div className="relative p-8 bg-white dark:bg-slate-900">

          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-11 px-6 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="h-11 px-6 rounded-xl bg-[#ff5252] hover:bg-[#ff4040] text-white border-none transition-all shadow-lg shadow-red-500/20"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
