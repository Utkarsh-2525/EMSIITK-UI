// Pagination.tsx
import React from 'react';
import './Paginate.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                &laquo; {/* Left arrow */}
            </button>
            <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
            <button
                className="pagination-button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                &raquo; {/* Right arrow */}
            </button>
        </div>
    );
};

export default Pagination;
