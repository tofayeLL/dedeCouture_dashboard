/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo } from "react";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategoryQuery } from "@/redux/api/CategoryApi";
import { useGetAllBrandsQuery } from "@/redux/api/brandApi";
import { Loading } from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";

const BrandManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  // Fetch brands with search parameter
  const { data: brandsData, isLoading: brandsLoading } = useGetAllBrandsQuery({
    page: currentPage,
    limit: limit,
    search: searchTerm,
  });
    console.log("....Brands Data", brandsData);

  // Fetch categories for filter
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoryQuery({});


  console.log("....Categories Data", categoriesData);

  // Filter brands by category (client-side filtering after search)
  const filteredBrands = useMemo(() => {
    if (!brandsData?.result?.brands) return [];
    
    let brands = brandsData?.result?.brands;
    
    if (selectedCategory !== "all") {
      brands = brands.filter((brand: any) => 
        brand?.category?.categoryName === selectedCategory
      );
    }
    
    return brands;
  }, [brandsData, selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (brandsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="flex items-center justify-center space-x-2">
          <Loading></Loading>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div>
        <div className="px-4 rounded-2xl">
          {/* Header with filters */}
          <div className="flex items-center justify-between mb-8">
            <div className="">
              <h1 className="text-xl font-semibold text-gray-900">
                Brand Management
              </h1>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-4">
              {/* Search Input */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by brand name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-10 py-2 lg:w-60 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="lg:w-40">
                  <Filter className="h-4 w-4 text-[#FE0659] mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoriesData?.result?.map((category: any) => (
                    <SelectItem 
                      key={category.id || category._id} 
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full  space-y-4">
            {/* Table */}
            <div className="rounded-lg border bg-white overflow-hidden">
              <Table className="">
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow className="border-b">
                    <TableHead className="text-base font-semibold px-4">
                      Brand/Business
                    </TableHead>
                    <TableHead className="text-base font-semibold px-4">
                      Category
                    </TableHead>
                    <TableHead className="text-base font-semibold px-4">
                      Description
                    </TableHead>
                    <TableHead className="text-base font-semibold px-4">
                      Average Rating
                    </TableHead>
                   
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredBrands?.length > 0 ? (
                    filteredBrands.map((brand: any) => (
                      <TableRow key={brand.id} className="border-b last:border-b-0">
                        <TableCell className="font-medium text-gray-700 py-3 px-4">
                          {brand.brandName}
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 px-4">
                          {brand.category?.categoryName || "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 px-4 max-w-xs">
                          <div className="truncate" title={brand.description}>
                            {brand.description || "No description"}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 px-4">
                          <div className="flex items-center gap-1">
                            <span>{brand.avgRating >= 0 ? brand.avgRating.toFixed(1) : "No rating"}</span>
                            {/* {brand.avgRating > 0 && (
                              <span className="text-yellow-500">★</span>
                            )} */}
                          </div>
                        </TableCell>
                       
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {searchTerm || selectedCategory !== "all" 
                          ? "No brands found matching your criteria" 
                          : "No brands available"
                        }
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

             {/* Pagination */}
            {brandsData?.result?.brands?.length > 0 && (
              <div className="flex justify-end items-center mt-14">
                <Pagination
                  totalPage={brandsData?.result?.meta?.totalPages || 1}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            )}

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandManagement;