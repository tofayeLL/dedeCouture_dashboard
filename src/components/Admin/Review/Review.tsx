/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
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
} from "@/components/ui/select";
import Image from "next/image";
import userImage from "@/assets/User.png";

// Define types for our review data
import type { StaticImageData } from "next/image";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with your actual data source
  const reviewsData: Review[] = [
    {
      id: 1,
      userName: "John Doe",
      userImage: userImage,
      serviceType: "Fashion",
      rating: 4.9,
      feedbackComment: "Excellent service, very professional.",
    },
    {
      id: 2,
      userName: "Jane Smith",
      userImage: userImage,
      serviceType: "Home Services",
      rating: 3.5,
      feedbackComment: "Good but could be better.",
    },
    {
      id: 3,
      userName: "Robert Johnson",
      userImage: userImage,
      serviceType: "Electronics",
      rating: 5,
      feedbackComment: "Perfect in every way!",
    },
    {
      id: 4,
      userName: "Emily Davis",
      userImage: userImage,
      serviceType: "Fashion",
      rating: 2.3,
      feedbackComment: "Disappointed with the quality.",
    },
    {
      id: 5,
      userName: "Michael Wilson",
      userImage: userImage,
      serviceType: "Automotive",
      rating: 4.2,
      feedbackComment: "Quick and efficient service.",
    },
  ];

  // Filter reviews based on search and category
  const filteredReviews = reviewsData.filter((review) => {
    const matchesSearch =
      review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.feedbackComment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      review.serviceType.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
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

  return (
    <section>
      <div>
        <div className="px-4 rounded-2xl">
          {/* Header with filters */}
          <div className="flex items-center justify-between mb-8">
            <div className="">
              <h1 className="text-xl font-semibold text-gray-900">
                User Reviews
              </h1>
            </div>
            <div className="flex lg:flex-row flex-col  items-center gap-4">
              {/* Search Input */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" pr-4 py-2 lg:w-40 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="">
                  <Filter className="h-4 w-4 text-[#FE0659]" />
                  Filter
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                  <SelectItem value="home services">Home Services</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                </SelectContent>
              </Select>
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
                      Feedback Comment
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                      <TableRow
                        key={review.id}
                        className="border-b last:border-b-0 "
                      >
                        <TableCell className="font-medium text-gray-700 py-3 px-4  flex justify-start items-center gap-2">
                          <span>
                            <Image
                              src={review.userImage}
                              alt="user image"
                              width={40}
                              height={40}
                              className="rounded-sm object-cover w-10 h-10"
                            />
                          </span>{" "}
                          {review.userName}
                        </TableCell>
                        <TableCell className="text-gray-700 py-3 px-4">
                          {review.serviceType}
                        </TableCell>

                        <TableCell className="text-gray-700 py-3 px-4">
                          {renderRating(review.rating)}
                        </TableCell>
                        <TableCell className="text-gray-700 px-4 space-x-3">
                          {review.feedbackComment}
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
    </section>
  );
};

export default Review;
