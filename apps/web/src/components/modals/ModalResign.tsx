import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";

export const ModalResign = () => {
  const { activeModal, closeModal } = useModalStore();
  const open = activeModal === "resign";

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-200 ">
        <DialogHeader>
          <DialogTitle>Resign</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={() => alert("false")}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => alert("Deleted!")}>
            Resign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
