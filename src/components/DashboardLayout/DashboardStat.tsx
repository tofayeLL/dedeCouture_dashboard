"use client";

import {  useGetAllStatsQuery } from "@/redux/api/adminApi";
import React from "react";
import { Loading } from "../ui/loading";
import chart from "@/assets/images/chartImage/chart.png";
import chart1 from "@/assets/images/chartImage/chart 1.png";
import chart2 from "@/assets/images/chartImage/chart 2.png";
import chart3 from "@/assets/images/chartImage/chart (3).png";
import Image from "next/image";

const DashboardStat = () => {
  const { data: allStatsData, isLoading } = useGetAllStatsQuery({});

  console.log("...", allStatsData);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="bg-white rounded-xl flex flex-col justify-center item-center shadow py-4">
        <div className="flex justify-between items-center lg:px-10 px-4">
          <div className=" space-y-2">
            <h1 className="font-medium text-lg text-gray-600">Fashion Brand</h1>
            <p className="text-3xl font-bold text-[#FE0659]">{allStatsData?.result?.fashionBrand || "not data available"}</p>
            <p className="text-lg text-gray-900 mt-3">+10%</p>
          </div>
          {/* image */}
          <div className=" rounded-full">
            <div className="relative w-24 h-28">
              <Image
                src={chart}
                alt="chart"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="bg-white rounded-xl flex flex-col justify-center item-center shadow py-4">
        <div className="flex justify-between items-center lg:px-10 px-4">
          <div className=" space-y-2">
            <h1 className="font-medium text-lg text-gray-600">Music Brand</h1>
            <p className="text-3xl font-bold text-[#FE0659]">{allStatsData?.result?.musicBrand || "not data available"}</p>
            <p className="text-lg text-gray-900 mt-3">+10%</p>
          </div>
          {/* image */}
          <div className=" rounded-full">
            <div className="relative w-24 h-28">
              <Image
                src={chart1}
                alt="chart"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div className="bg-white rounded-xl flex flex-col justify-center item-center shadow py-4">
        <div className="flex justify-between items-center lg:px-10 px-4">
          <div className=" space-y-2">
            <h1 className="font-medium text-lg text-gray-600">Total Brand</h1>
            <p className="text-3xl font-bold text-[#FE0659]">{allStatsData?.result?.totalBrand || "not data available"}</p>
            <p className="text-lg text-gray-900 mt-3">+10%</p>
          </div>
          {/* image */}
          <div className=" rounded-full">
            <div className="relative w-24 h-28">
              <Image
                src={chart2}
                alt="chart"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Card 4 */}
      <div className="bg-white rounded-xl flex flex-col justify-center item-center shadow py-4">
        <div className="flex justify-between items-center lg:px-10 px-4">
          <div className=" space-y-2">
            <h1 className="font-medium text-lg text-gray-600">Beauty Brand</h1>
            <p className="text-3xl font-bold text-[#FE0659]">{allStatsData?.result?.beautyBrand || "not data available"}</p>
            <p className="text-lg text-gray-900 mt-3">+10%</p>
          </div>
          {/* image */}
          <div className=" rounded-full">
            <div className="relative w-24 h-28">
              <Image
                src={chart3}
                alt="chart"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardStat;
