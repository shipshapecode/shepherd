import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

import { Link, routes, useParams } from '@redwoodjs/router';

import { cn } from 'src/lib/utils';

const ACTORS_PER_PAGE = 50;

const Pagination = ({ count }) => {
  const { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(count / ACTORS_PER_PAGE);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageNumbersToShow = () => {
    const MAX_PAGES = 12; // Maximum number of pages to display

    if (totalPages <= MAX_PAGES) {
      return pageNumbers;
    }

    const start = Math.max(1, Number(page) - Math.floor(MAX_PAGES / 2));
    const end = Math.min(totalPages, start + MAX_PAGES - 1);

    if (start > 1) {
      return [1, '...', ...pageNumbers.slice(start, end), '...', totalPages];
    }

    return pageNumbers.slice(start, end);
  };

  const renderPageNumbers = () => {
    const pagesToShow = getPageNumbersToShow();

    return pagesToShow.map((pageNumber) => (
      <Link
        key={pageNumber}
        to={routes.actors({ page: pageNumber })}
        className={cn(
          'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
          { 'border-indigo-500 text-indigo-600': pageNumber === parseInt(page) }
        )}
      >
        {pageNumber === '...' ? '...' : pageNumber}
      </Link>
    ));
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {!isFirstPage && (
          <Link
            to={routes.actors({ page: currentPage - 1 })}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </Link>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {!isLastPage && (
          <Link
            to={routes.actors({ page: currentPage + 1 })}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
