"use client";

import React from "react";
import DashboardStat from "./DashboardStat";
import EarningsChart from "./EarningsChart";
import BrandUpdatePage from "./BrandUpdatePage";
import RecentActivityTable from "./RecentActivityTable";
import { BrandStatusChart } from "./BrandStatusChart";


/* import { BookList } from "./BookList"; */

const DashboardLayout = () => {
  return (
    <section className="space-y-8">
      <DashboardStat />

      <div>
        <div className="  grid lg:grid-cols-3 grid-cols-1 gap-6">
          <div className="col-span-2">
            <EarningsChart></EarningsChart>
          </div>
          <div className="col-span-1">
            <BrandUpdatePage></BrandUpdatePage>
          </div>
        </div>
      </div>

      <div>
        <div className="  grid lg:grid-cols-3 grid-cols-1 gap-6">
          <div className="lg:col-span-2 ">
            <RecentActivityTable></RecentActivityTable>
          </div>
          <div className="col-span-1">
            <BrandStatusChart></BrandStatusChart>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
