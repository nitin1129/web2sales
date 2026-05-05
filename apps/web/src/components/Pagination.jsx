import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable pagination control. Caller passes `currentPage`, `totalPages`,
 * and `onGo(page)`. Component handles the page-numbers array (with ellipsis
 * for long ranges) and renders Previous/Next buttons.
 *
 * Usage:
 *   <Pagination
 *     currentPage={currentPage}
 *     totalPages={totalPages}
 *     onGo={goToPage}
 *     ariaLabel="Posts pagination"
 *   />
 */
const Pagination = ({ currentPage, totalPages, onGo, ariaLabel = 'Pagination', className = '' }) => {
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    const sorted = [...nums].filter((n) => n >= 1 && n <= totalPages).sort((a, b) => a - b);
    const withGaps = [];
    sorted.forEach((n, idx) => {
      if (idx > 0 && n - sorted[idx - 1] > 1) withGaps.push('…');
      withGaps.push(n);
    });
    return withGaps;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className={`flex flex-wrap items-center justify-center gap-2 ${className}`}
    >
      <button
        type="button"
        onClick={() => onGo(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>
      <ul className="flex items-center gap-1.5">
        {pageNumbers.map((n, i) =>
          n === '…' ? (
            <li key={`gap-${i}`} className="px-2 text-sm text-slate-400 select-none">
              …
            </li>
          ) : (
            <li key={n}>
              <button
                type="button"
                onClick={() => onGo(n)}
                aria-current={n === currentPage ? 'page' : undefined}
                className={
                  n === currentPage
                    ? 'inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25'
                    : 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:border-primary/40 hover:text-primary transition'
                }
              >
                {n}
              </button>
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        onClick={() => onGo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

export default Pagination;
