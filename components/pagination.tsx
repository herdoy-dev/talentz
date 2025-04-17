"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Button } from "./ui/button";

interface Props {
  currentPage: number;
  pageCount: number;
}

const Pagination = ({ currentPage, pageCount }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentPage === 1) {
      params.delete("page");
    }
    const query = params.toString();
    router.push("?" + query);
  }, [currentPage, router, searchParams]);

  if (pageCount <= 1) return null;

  const handlePageChange = (page: number) => {
    // Validate page number
    const validatedPage = Math.max(1, Math.min(page, pageCount));

    const params = new URLSearchParams(searchParams.toString());
    if (validatedPage === 1) {
      params.delete("page");
    } else {
      params.set("page", validatedPage.toString());
    }
    const query = params.toString();

    router.push("?" + query);
  };

  // Ensure currentPage is within bounds
  const safeCurrentPage = Math.max(1, Math.min(currentPage, pageCount));

  return (
    <div className="flex items-center gap-3 my-4">
      <p>
        Page {safeCurrentPage} of {pageCount}
      </p>
      <div className="flex items-center gap-3">
        <Button
          className="py-1 px-2 rounded-md"
          disabled={safeCurrentPage <= 1}
          onClick={() => handlePageChange(1)}
        >
          <MdKeyboardDoubleArrowLeft />
        </Button>
        <Button
          className="py-1 px-2 rounded-md"
          disabled={safeCurrentPage <= 1}
          onClick={() => handlePageChange(safeCurrentPage - 1)}
        >
          <MdKeyboardArrowLeft />
        </Button>

        <Button
          className="py-1 px-2 rounded-md"
          disabled={safeCurrentPage >= pageCount}
          onClick={() => handlePageChange(safeCurrentPage + 1)}
        >
          <MdKeyboardArrowRight />
        </Button>

        <Button
          className="py-1 px-2 rounded-md"
          disabled={safeCurrentPage >= pageCount}
          onClick={() => handlePageChange(pageCount)}
        >
          <MdKeyboardDoubleArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
