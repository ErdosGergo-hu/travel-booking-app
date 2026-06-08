import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "../icons/ChevronIcon";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const className =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium border border-[#262626] text-secondary-font hover:bg-[#2A2A2A] active:scale-95";
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(0)}
        disabled={page === 0}
        className={className}
      >
        <ChevronsLeft />
      </button>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className={className}
      >
        <ChevronLeft />
      </button>
      <span className="text-secondary-font">
        {page + 1} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        className={className}
      >
        <ChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={page === totalPages - 1}
        className={className}
      >
        <ChevronsRight />
      </button>
    </div>
  );
}
