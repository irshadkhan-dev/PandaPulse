"use client";
import React, { useEffect, useState } from "react";

export const CategoryBody = () => {
  const [categoryData] = useState<CategoryTableProps[]>(() => {
    const storedData = localStorage.getItem("categoriesData");
    return storedData ? JSON.parse(storedData) : [];
  });

  return (
    <div>
      {categoryData.map((category) => (
        <div key={category.categoryId}>{category.categoryName}</div>
      ))}
    </div>
  );
};
