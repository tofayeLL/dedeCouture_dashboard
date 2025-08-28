/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
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

import { Calendar, Mail, Search, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import userImage from "@/assets/User.png";
import { Button } from "@/components/ui/button";
import { useGetAllUsersQuery } from "@/redux/api/userAPi";
// import Pagination from "@/components/ui/pagination";
import { Loading } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  id: string;
  userName: string;
  email: string;
  profileImage: string;
  readLevel: string;
  points: number;
  createdAt?: string;
  phone?: string;
  status?: string;
}

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 1;

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset to first page when searching
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  const { data: getAllUser, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: limit,
    search: debouncedSearchTerm,
  });

  console.log("userManagement", getAllUser);
  console.log("userManagement2", getAllUser?.result?.users);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) {
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
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="w-full space-y-4">
          {/* Header with filters */}
          <div className="flex lg:flex-row flex-col items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              User Management
            </h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by name "
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pr-10 py-2 lg:w-64 bg-white border-gray-200 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-4 w-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
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

                {/*   <TableBody>
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
                      
                      <Button
                        variant="outline"
                        className="bg-[#F3F4F6] w-[40%] cursor-pointer text-[#2D2D2D] border-gray-200 hover:bg-[#e4e9f3] hover:text-[#2D2D2D] hover:border-[#F3F4F6] px-2 py-2 rounded-sm font-medium transition-colors"
                      >
                        View User
                      </Button>

                  
                      <Button
                        variant="outline"
                        className="bg-red-50 w-[40%] cursor-pointer text-[#FE0659] border-[#FE06591A] hover:bg-[#FE06591A] hover:text-[#FE0659] hover:border-[#FE06591A] px-2 py-2 rounded-sm font-medium transition-colors"
                      >
                        Delete User
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody> */}
                <TableBody>
                  {getAllUser?.result?.users?.slice(0,5).map((item: any) => (
                    <TableRow
                      key={item.id}
                      className="border-b last:border-b-0 "
                    >
                      <TableCell className="font-medium text-gray-700 py-3 px-4  flex justify-start items-center gap-2">
                        <span>
                          <Image
                            src={item?.profileImage || userImage}
                            alt="image"
                            width={40}
                            height={40}
                            className="rounded-sm object-cover w-10 h-10"
                          />
                        </span>{" "}
                        {item.userName}
                      </TableCell>
                      <TableCell className="text-gray-700 py-3 px-4">
                        {item?.email || " alma.lawson@example.com"}
                      </TableCell>

                      <TableCell className="text-gray-700 py-3 px-4">
                        {item?.phone || "no data available"}
                      </TableCell>

                      {/*  <Button
                        variant="outline"
                        className="bg-[#F3F4F6] w-[40%] cursor-pointer text-[#2D2D2D] border-gray-200 hover:bg-[#e4e9f3] hover:text-[#2D2D2D] hover:border-[#F3F4F6] px-2 py-2 rounded-sm font-medium transition-colors"
                      >
                        View User
                      </Button>

                  
                      <Button
                        variant="outline"
                        className="bg-red-50 w-[40%] cursor-pointer text-[#FE0659] border-[#FE06591A] hover:bg-[#FE06591A] hover:text-[#FE0659] hover:border-[#FE06591A] px-2 py-2 rounded-sm font-medium transition-colors"
                      >
                        Delete User
                      </Button> */}

                      <TableCell className="text-gray-700 py-3 space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => handleViewUser(item)}
                          className="bg-[#F3F4F6] lg:w-[80%] cursor-pointer text-[#2D2D2D] border-gray-200 hover:bg-[#e4e9f3] hover:text-[#2D2D2D] hover:border-[#F3F4F6] px-2 py-2 rounded-sm font-medium transition-colors"
                        >
                          View User
                        </Button>

                      {/*   <Button
                          onClick={() => handleDelete(item?.id)}
                          disabled={isDeleting}
                          variant="outline"
                          className="bg-red-50 w-[40%] cursor-pointer text-[#FE0659] border-[#FE06591A] hover:bg-[#FE06591A] hover:text-[#FE0659] hover:border-[#FE06591A] px-2 py-2 rounded-sm font-medium transition-colors"
                        >
                           {isDeleting ? "Deleting..." : "Delete"}delete
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto p-8">
          <DialogHeader>
            <div className="flex items-center justify-between ">
              <DialogTitle className="text-xl font-semibold text-gray-900">
                User Details
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="h-6 w-6 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-gray-600">
              Complete information about the selected user.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 py-4">
              {/* Profile Section */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative">
                  <Image
                    src={selectedUser?.profileImage || userImage}
                    alt="User profile"
                    width={80}
                    height={80}
                    className="rounded-lg object-cover w-20 h-20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedUser?.userName || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ID: {selectedUser?.id}
                  </p>
                </div>
              </div>

              {/* User Information Grid */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-900">
                      {selectedUser?.email || "N/A"}
                    </p>
                  </div>
                </div>

                {selectedUser?.phone && (
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <User className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-900">
                        {selectedUser?.phone}
                      </p>
                    </div>
                  </div>
                )}

                {selectedUser?.createdAt && (
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Member Since
                      </p>
                      <p className="text-sm text-gray-900">
                        {new Date(selectedUser.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {selectedUser.status && (
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        selectedUser?.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Status
                      </p>
                      <p
                        className={`text-sm font-medium capitalize ${
                          selectedUser.status === "active"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {selectedUser?.status}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button
              onClick={() => {
                // Add any additional action here if needed
                closeModal();
              }}
              className="bg-[#FE0659] hover:bg-[#FE0659] text-white"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UserManagement;
