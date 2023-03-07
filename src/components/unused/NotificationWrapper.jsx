import React from "react";
import Notification from "./Notification";

function NotificationWrapper() {
  return (
    <div className="fixed right-2 top-[112px] min-w-[100px] max-w-[300px] max-h-[400px] overflow-y-auto overflow-x-hidden z-30 flex flex-col text-white gap-2 justify-start items-end p-3"></div>
  );
}

export default NotificationWrapper;
