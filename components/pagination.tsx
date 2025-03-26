import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Button from "./ui/button";

interface Props {
  currentPage: number;
  pageCount: number;
  setPage: (page: number) => void;
  previous: () => void;
  next: () => void;
}

export default function Pagination({
  currentPage,
  pageCount,
  setPage,
  next,
  previous,
}: Props) {
  return (
    <div className="flex items-center gap-2 py-4">
      <p>
        {" "}
        Page: {currentPage} of {pageCount}
      </p>
      <Button
        disabled={currentPage === 1}
        onClick={() => setPage(1)}
        className="rounded-md px-3 bg-secondary disabled:bg-secondary/70"
      >
        <FaAnglesLeft />
      </Button>
      <Button
        disabled={currentPage === 1}
        onClick={previous}
        className="rounded-md px-3 bg-secondary disabled:bg-secondary/70"
      >
        <FaAngleLeft />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={next}
        className="rounded-md px-3 bg-secondary disabled:bg-secondary/70"
      >
        <FaAngleRight />
      </Button>
      <Button
        disabled={currentPage === pageCount}
        onClick={() => setPage(pageCount)}
        className="rounded-md px-3 bg-secondary disabled:bg-secondary/70"
      >
        <FaAnglesRight />
      </Button>
    </div>
  );
}
