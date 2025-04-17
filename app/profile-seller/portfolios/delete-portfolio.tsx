import { queryClient } from "@/app/query-client-provider";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import apiClient from "@/services/api-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

interface Props {
  portfolioId: string;
  onSuccess?: () => void;
}

export function DeletePortfolio({
  portfolioId: educationId,
  onSuccess,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await apiClient.delete(`/portfolios/${educationId}`);

      toast.success("Portfolio deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to delete Portfolio");
      console.error("Delete portfolio error:", error);
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <FiTrash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this portfolio record? This action
            cannot be undone and will permanently remove the data from our
            system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" disabled={isDeleting}>
            Cancel
          </Button>

          <Button
            className="bg-red-500"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? <BeatLoader color="#fff" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
