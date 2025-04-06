"use client";
import { Button } from "@/components/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { pageSize } from "@/lib/utils";
import apiClient from "@/services/api-client";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

interface Props {
  id: string;
  count: number;
  path: string;
}

export default function DeleteAlert({ id: messageId, count, path }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="bg-red-500">Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            message and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(false)} variant="accent" size="sm">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              setLoading(true);
              const params = new URLSearchParams(searchParams.toString());
              try {
                await apiClient.delete(`${path}/${messageId}`);
                const currentPage = params.get("page");
                if (currentPage && count % pageSize === 1) {
                  const setCurrentPage = parseInt(currentPage) - 1;
                  params.set("page", setCurrentPage.toString());
                  const query = params.toString();
                  router.push("?" + query);
                }
                setLoading(false);
                setOpen(false);
                router.refresh();
                toast.success("Deleted Successfully");
              } catch (error) {
                if (error instanceof AxiosError) {
                  return toast.error(error.message);
                } else {
                  console.log(error);
                }
              }
            }}
          >
            {loading ? (
              <BeatLoader size={8} margin={2} color="#fff" />
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
