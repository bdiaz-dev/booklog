import React from 'react';

interface SortButtonProps {
  isAscending: boolean;
  onClick: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ isAscending, onClick }) => {
  return (
    <button onClick={onClick} >
      {isAscending ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-bar-chart-2"
        >
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="12" x2="16" y2="12"></line>
          <line x1="4" y1="18" x2="10" y2="18"></line>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-bar-chart-2"
        >
          <line x1="4" y1="18" x2="20" y2="18"></line>
          <line x1="4" y1="12" x2="16" y2="12"></line>
          <line x1="4" y1="6" x2="10" y2="6"></line>
        </svg>
      )}
    </button>
  );
};

export default SortButton;
