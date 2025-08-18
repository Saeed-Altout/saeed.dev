import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Modal({
  title,
  description,
  isOpen,
  onClose,
  variant = "dialog",
  className,
  children,
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  variant?: "dialog" | "sheet";
}) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  if (variant === "dialog") {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="px-4 h-full overflow-y-auto mb-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
