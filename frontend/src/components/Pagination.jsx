function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {

  const pages =
    [...Array(totalPages).keys()];

  return (

    <div className="pagination-container">

      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(
            currentPage - 1
          )
        }
      >
        ← Previous
      </button>

      <div className="page-numbers">

        {pages.map((page) => (

          <button
            key={page}
            className={
              currentPage === page + 1
                ? "page-number active"
                : "page-number"
            }
            onClick={() =>
              setCurrentPage(page + 1)
            }
          >
            {page + 1}
          </button>

        ))}

      </div>

      <button
        className="page-btn"
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(
            currentPage + 1
          )
        }
      >
        Next →
      </button>

    </div>

  );
}

export default Pagination;