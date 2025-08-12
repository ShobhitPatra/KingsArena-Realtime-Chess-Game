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

export const ModalDraw = () => {
  const { activeModal, closeModal } = useModalStore();
  const open = activeModal === "draw";
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-200 ">
        <DialogHeader>
          <DialogTitle>Offer Draw</DialogTitle>
          <DialogDescription>
            You want to offer a draw.Are you sure?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="bg-yellow-200 hover:bg-yellow-100"
            disabled={true}
            onClick={() => alert("Deleted!")}
          >
            Draw
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
