import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showResultCount?: boolean;
  totalResults?: number;
  resultsPerPage?: number;
}

function ChevronLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronsLeft() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" />
    </svg>
  );
}

function ChevronsRight() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" />
    </svg>
  );
}

function getPageRange(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showResultCount = true,
  totalResults = 0,
  resultsPerPage = 20,
}: PaginationProps) {
  const pages = useMemo(() => getPageRange(currentPage, totalPages), [currentPage, totalPages]);

  const from = (currentPage - 1) * resultsPerPage + 1;
  const to = Math.min(currentPage * resultsPerPage, totalResults);

  const btnBase =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-150 select-none";
  const btnDefault =
    `${btnBase} border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95`;
  const btnActive =
    `${btnBase} bg-blue-600 text-white border border-blue-600 shadow-sm active:scale-95`;
  const btnDisabled =
    `${btnBase} border border-gray-100 text-gray-300 cursor-not-allowed`;
  const btnDots =
    `${btnBase} border-transparent text-gray-400 cursor-default`;

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="flex items-center gap-1">

        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? btnDisabled : btnDefault}
          aria-label="First page"
        >
          <ChevronsLeft />
        </button>

        {/* Previous page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? btnDisabled : btnDefault}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {pages.map((page, i) =>
            page === "..." ? (
              <span key={`dots-${i}`} className={btnDots}>
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={page === currentPage ? btnActive : btnDefault}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? btnDisabled : btnDefault}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>

        {/* Last page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? btnDisabled : btnDefault}
          aria-label="Last page"
        >
          <ChevronsRight />
        </button>

      </div>

      {/* Result count */}
      {showResultCount && totalResults > 0 && (
        <p className="text-xs text-gray-400">
          {from}–{to} / {totalResults.toLocaleString()} találat
        </p>
      )}
    </div>
  );
}
