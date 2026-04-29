import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  activeColor?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, activeColor = '#EAB308' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-3 rounded-full hover:bg-zinc-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                currentPage === page 
                  ? 'bg-black text-white' 
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-3 rounded-full hover:bg-zinc-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
      
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
        PAGE {currentPage} / {totalPages}
      </p>
    </div>
  );
}
