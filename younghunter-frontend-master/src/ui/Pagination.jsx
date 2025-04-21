import { useLanguage } from "../context/useLanguageContext";
import { usePagination } from "../context/usePaginationContext";
import { toPersianNumbers } from "../utils/toPersianNumbers";

function Pagination() {
  const { language } = useLanguage();
  const { currentPage, totalPages, setPage, nextPage, previousPage } =
    usePagination();

  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        {language === "en" ? "Previous" : "صفحه قبلی"}
      </button>
      {/* Display page numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-gray-950 bg-opacity-90 text-neutral-200"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {language === "en" ? page : toPersianNumbers(page)}
          </button>
        )
      )}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        {language === "en" ? "Next" : "صفحه بعدی"}
      </button>
    </div>
  );
}

export default Pagination;
