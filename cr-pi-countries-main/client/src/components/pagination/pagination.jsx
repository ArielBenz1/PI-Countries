import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const renderPaginationLinks = () => {
    const links = [];

    links.push(
      <button key="first" onClick={handleFirstPage} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
    );

    links.push(
      <button key="previous" onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt;
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }

    links.push(
      <button key="next" onClick={handleNextPage} disabled={currentPage === totalPages}>
        &gt;
      </button>
    );

    links.push(
      <button key="last" onClick={handleLastPage} disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>
    );

    return links;
  };

  return (
    <div className="pagination">
      {renderPaginationLinks()}
    </div>
  );
};

export default Pagination;
