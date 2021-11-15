import React from "react";

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ skip, limit, total, onClick: setSkip }) => {
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(skip - MAX_LEFT, 1), maxFirst);

  function onPageChange(page) {
    setSkip(page);
  }

  return (
    <ul className="pagination">
      <li>
        <button onClick={() => onPageChange(skip - 1)} disabled={skip === 1}>
          <i className="fa fa-chevron-left "></i>
        </button>
      </li>
      
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={
                ("btn", page === skip ? "pagination__item--active" : null)
              }
            >
              {page}
            </button>
          </li>
        ))}
      {/* -
      <button>Total paginas 20</button> */}

      <li>
        <button
          onClick={() => onPageChange(skip + 1)}
          disabled={skip === pages}
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
