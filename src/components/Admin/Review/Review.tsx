/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
/* 
import deleteIcon from "@/assets/icons/Warden Management/Delete.png";
import edit from "@/assets/icons/Warden Management/Edit Square.png"; */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Filter, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
// import userImage from "@/assets/User.png";

// Define types for our review data
import type { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { FlagContentModal } from "./FlagContentModal";
import { Loading } from "@/components/ui/loading";
import { useGetAllReviewQuery } from "@/redux/api/reviewsAPi";
import { useGetAllCategoryQuery } from "@/redux/api/CategoryApi";

interface Review {
  id: number;
  userName: string;
  userImage: string | StaticImageData;
  serviceType: string;
  rating: number;
  feedbackComment: string;
}

const Review = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFlagSubmit = (reason: string, comments: string) => {
    console.log("Flag submitted:", { reason, comments });
    // Handle the flag submission here
  };
  const [limit] = useState(5);

  // Fetch reviews with search parameter
  const { data: reviewsData, isLoading: reviewsLoading } = useGetAllReviewQuery({
    page: currentPage,
    limit: limit,
    search: searchTerm,
  });
  console.log("....reviews Data", reviewsData);

  // Fetch categories for filter
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategoryQuery({});

  console.log("....Categories Data", categoriesData);

  // Filter reviews by category (client-side filtering after search)
  const filteredReviews = useMemo(() => {
    if (!reviewsData?.result?.reviews) return [];

    let reviews = reviewsData?.result?.reviews;

    if (selectedCategory !== "all") {
      reviews = reviews.filter(
        (brand: any) => brand?.brand?.category?.categoryName === selectedCategory
      );
    }

    return reviews;
  }, [reviewsData, selectedCategory]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Component to render star ratings
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  if (reviewsLoading || categoriesLoading) {
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
                  placeholder="Search by service or comment"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-10 py-2 lg:w-72 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
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
                  <SelectItem value="all">All</SelectItem>
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

              <Button
                onClick={() => setIsModalOpen(true)}
                className="border border-[#FE0659] hover:bg-white bg-white text-[#FE0659] cursor-pointer"
              >
                Flag Content
              </Button>
            </div>
          </div>

          <div className="w-full bg-white space-y-4 ">
            {/* Table */}
            <div className="rounded-lg border bg-white overflow-hidden ">
              <Table className="">
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow className="border-b ">
                    <TableHead className=" text-base font-semibold  px-4">
                      User Name
                    </TableHead>
                    <TableHead className=" text-base font-semibold px-4">
                      Service Type
                    </TableHead>

                    <TableHead className=" text-base font-semibold px-4">
                      Rating
                    </TableHead>
                    <TableHead className=" text-base font-semibold px-4">
                     Category
                    </TableHead>
                    <TableHead className=" text-base font-semibold px-4">
                      Feedback Comment
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review: any) => (
                      <TableRow
                        key={review.id}
                        className="border-b last:border-b-0 "
                      >
                        <TableCell className="font-medium text-gray-700 py-3 px-4  flex justify-start items-center gap-2">
                          <span>
                            <Image
                              src={review?.user?.profileImage}
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-sm object-cover w-10 h-10"
                            />
                          </span>{" "}
                          {review?.user?.userName}
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 px-4">
                          {review?.brand?.brandName}
                        </TableCell>

                        <TableCell className="text-gray-700 py-3 px-4">
                          {renderRating(review?.rating)}
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 px-4">
                          {review?.brand.category?.categoryName || "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-700 px-4 space-x-3">
                          {review?.comment}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-4 text-gray-500"
                      >
                        No reviews found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {/* Add the FlagContentModal at the end */}
      <FlagContentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleFlagSubmit}
      />
    </section>
  );
};

export default Review;
