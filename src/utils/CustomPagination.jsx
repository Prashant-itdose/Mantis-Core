import React from "react";
const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className="pagination"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "flex-end",
      }}
    >
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &#171; Prev
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next &#187;
      </button>
    </div>
  );
};

export default CustomPagination;

// const  CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };
// // console.log(totalPages,currentPage);

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   const handlePageClick = (page) => {
//     if (page !== currentPage) {
//       onPageChange(page);
//     }
//   };

//   return (
//     <div className="pagination" style={{float:"right"}}>
//       <button
//         className="pagination-button"
//         onClick={handlePrevious}
//         disabled={currentPage === 1}
//       >
//         <i className="fas fa-chevron-left"></i> {/* FontAwesome icon for 'Previous' */}
//       </button>

//       <span className="pagination-info">
//       Page {currentPage} of {totalPages}
//     </span>

//       <button
//         className="pagination-button"
//         onClick={handleNext}
//         disabled={currentPage === totalPages}
//       >
//         <i className="fas fa-chevron-right"></i> {/* FontAwesome icon for 'Next' */}
//       </button>
//     </div>
//   );
// };
// export default CustomPagination
