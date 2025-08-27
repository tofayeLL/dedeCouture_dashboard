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

import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const StaffManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  /*   const { data: AllStaffs, isLoading } = useGetAllStaffsQuery({});
  console.log("....", AllStaffs); */
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Add filtering logic here based on your needs
  };

  /*   if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-white">
        <div className="flex items-center justify-center space-x-2">
          <Loading></Loading>
        </div>
      </div>
    );
  } */

  return (
    <section>
      <div>
        <div className="bg-white p-6 rounded-2xl">
          <div className="w-full space-y-4">
            {/* Header with filters */}
            <div className="flex items-center justify-between l">
              <div className="">
                <h1 className="text-xl font-semibold text-gray-900">
                  Brand Management
                </h1>
              </div>
              <div className="flex lg:flex-row flex-col  items-center gap-4">
                {/* Search Input */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search"
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
                    <SelectItem value="all">All Category</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="cases">Cases</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border bg-white overflow-hidden">
              <Table className="">
                <TableHeader className="bg-[#F8FAFC]">
                  <TableRow className="border-b">
                    <TableHead className=" text-base font-semibold">
                      Brand/Business
                    </TableHead>
                    <TableHead className=" text-base font-semibold">
                      Category
                    </TableHead>

                    <TableHead className=" text-base font-semibold">
                      Talent name
                    </TableHead>
                    <TableHead className=" text-base font-semibold">
                      Address
                    </TableHead>
                    <TableHead className=" text-base font-semibold">
                      Average Rating
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow className="border-b last:border-b-0">
                    <TableCell className="font-medium text-gray-700 py-3 flex justify-start items-center gap-2">
                      Chic Boutique
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      Fashion
                    </TableCell>

                    <TableCell className="text-gray-700 py-3">
                      Devon Lane
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">
                      Springfield, IL 62704,USA
                    </TableCell>
                    <TableCell className="text-gray-700 py-3">4.8</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffManagement;
