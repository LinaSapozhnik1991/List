import React from 'react';
import './Pagination.css';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='Pagination'>
            {pageNumbers.map(number => (
                <button 
                    className='Pagination-button' 
                    key={number} 
                    onClick={() => setCurrentPage(number)} 
                    disabled={currentPage === number}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;