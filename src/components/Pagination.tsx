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
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(0)}
        disabled={page === 0}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
      >
        <ChevronsLeft />
      </button>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
      >
        <ChevronLeft />
      </button>
      <span>
        {page + 1} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
      >
        <ChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={page === totalPages - 1}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95"
      >
        <ChevronsRight />
      </button>
    </div>
  );
}
