"use client" 

import React, { useRef } from "react";

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);

  const handleSearch = () => {
    const searchTerm = inputRef.current.value;
    console.log('Valor del input:', searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar..."
        ref={inputRef}
        onChange={handleSearch}
        className="text-black" 
      />
    </div>
  );
};

export default SearchBar;

