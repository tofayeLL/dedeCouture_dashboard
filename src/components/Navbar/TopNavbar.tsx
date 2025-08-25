"use client";

import React, { useState } from "react";
import {  Modal, message as AntMessage, Badge } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";

// import { LuMessageCircleMore } from "react-icons/lu";
import Image from "next/image";
// import { useGetMyProfileQuery } from "@/redux/api/settingsApi";
import {
  useGetMyNotificationsQuery,
  useUpdateNotificationMutation,
} from "@/redux/api/notifiyApi";
import { formatChatDate } from "@/lib/formateTimeStamp";

import userImage from "@/assets/images/userImage.jpg";
import { useSelector } from "react-redux";
import { useAuth } from "@/redux/features/authSlice";
import { ChevronDown } from "lucide-react";


// import Link from "next/link";


type NotificationType = {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

type UpdateNotificationPayload = {
  id: string;
  data: {
    isRead: boolean;
  };
};

const TopNavbar = () => {
  const { data: notificationsData, refetch } = useGetMyNotificationsQuery({});
  const [updateNotification] = useUpdateNotificationMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const notifications: NotificationType[] = notificationsData?.result || [];
  const authState = useSelector(useAuth)
  console.log("to navbar",authState);
  console.log("to navbar",authState?.adminInfo?.profileImage);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    const payload: UpdateNotificationPayload = {
      id,
      data: { isRead: true },
    };
    try {
      await updateNotification(payload).unwrap();
      AntMessage.success("Marked as read");
      refetch();
    } catch {
      AntMessage.error("Failed to mark as read");
    }
  };

  return (
    <>
      <div className="bg-white flex justify-between items-center gap-2 font-bold w-full h-[81px] px-4 md:px-6 py-4 sticky top-0 z-40  ">
        <div className=" flex justify-center items-center gap-5">
       <div>
           <p className="text-lg font-medium text-gray-500">welcome</p>
           <p className="lg:text-xl text-[#FE0659]">Devon Lane</p>
       </div>
        </div>
       

        <div className="flex justify-end items-center gap-6">
       {/* Notification Icon */}
          <div
            className="bg-[#F5F9FC] rounded-full px-2 py-1 h-full cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Badge count={unreadCount} size="small">
              <IoMdNotificationsOutline className="w-7 h-7 text-[#FE0659]" />
            </Badge>
          </div>

          {/* Profile */}
          <div className="flex justify-center items-center gap-3 text-[#636F85] font-medium bg-[#F5F9FC] rounded-3xl px-3 py-1.5 h-full">
            <Image
              src={ userImage}
              height={50}
              width={50}
              alt="avatar"
              className="rounded-full w-8 h-8"
              priority
            />
            <p className="text-[#FE0659]">{authState.role}</p>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Notifications Modal */}
      <Modal
        title="Notifications"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications found.</p>
        ) : (
          <ul className="space-y-4 max-h-[300px] overflow-y-auto">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`border rounded-lg p-3 shadow-sm ${
                  notif.isRead ? "bg-white" : "bg-[#F0F9FF]"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className="font-semibold">{notif.title}</p>
                    <p className="text-sm text-gray-600">{notif.body}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatChatDate(notif.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        notif.isRead
                          ? "bg-gray-200 text-gray-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {notif.isRead ? "Read" : "Unread"}
                    </span>

                    {!notif.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
};

export default TopNavbar;
