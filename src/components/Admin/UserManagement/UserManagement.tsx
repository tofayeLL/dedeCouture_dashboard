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
import Image from "next/image";
import userImage from "@/assets/User.png";
import { Button } from "@/components/ui/button";

const UserManagement = () => {
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
        <div className="px-4 rounded-2xl">
          {/* Header with filters */}
          <div className="flex items-center justify-between mb-8">
            <div className="">
              <h1 className="text-xl font-semibold text-gray-900">
                User Management
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
                      Email
                    </TableHead>

                    <TableHead className=" text-base font-semibold px-4">
                      Contact Info
                    </TableHead>
                    <TableHead className=" text-base font-semibold px-4">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow className="border-b last:border-b-0 ">
                    <TableCell className="font-medium text-gray-700 py-3 px-4  flex justify-start items-center gap-2">
                      <span>
                        <Image
                          src={userImage}
                          alt="image"
                          width={40}
                          height={40}
                          className="rounded-sm object-cover w-10 h-10"
                        />
                      </span>{" "}
                      John Doe
                    </TableCell>
                    <TableCell className="text-gray-700 py-3 px-4">
                      alma.lawson@example.com
                    </TableCell>

                    <TableCell className="text-gray-700 py-3 px-4">
                      +1 (555) 123-4567
                    </TableCell>
                    <TableCell className="text-gray-700 space-x-3">
                      {/* view button */}
                      <Button
                        variant="outline"
                        className="bg-[#F3F4F6] w-[40%] cursor-pointer text-[#2D2D2D] border-gray-200 hover:bg-[#e4e9f3] hover:text-[#2D2D2D] hover:border-[#F3F4F6] px-2 py-2 rounded-sm font-medium transition-colors"
                      >
                        View User
                      </Button>

                      {/* delete button */}
                      <Button
                        variant="outline"
                        className="bg-red-50 w-[40%] cursor-pointer text-[#FE0659] border-[#FE06591A] hover:bg-[#FE06591A] hover:text-[#FE0659] hover:border-[#FE06591A] px-2 py-2 rounded-sm font-medium transition-colors"
                      >
                        Delete User
                      </Button>
                    </TableCell>
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

export default UserManagement;
