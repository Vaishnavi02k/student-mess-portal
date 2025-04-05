import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import { FiCalendar, FiMail, FiBell } from "react-icons/fi"; // Lucide-style icons

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const notificationCollectionRef = collection(db, "announcements");

  const getNotifications = async () => {
    const data = await getDocs(notificationCollectionRef);
    setNotifications(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
      <div className="text-center mb-10">
        <h3 className="text-4xl font-bold text-green-800 flex justify-center items-center gap-2">
          <FiBell className="text-green-700" />
          Notifications
        </h3>
        <p className="text-gray-500 text-sm mt-1">Stay updated with latest announcements</p>
      </div>

      <div className="space-y-6 max-w-8xl mx-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-600 text-center">No notifications available yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex flex-col gap-2">
                  <p className="text-green-800 font-semibold text-lg flex items-center gap-2">
                    <FiMail className="text-green-600" />
                    {notification.usersubject}
                  </p>
                  <p className="text-gray-700 text-sm pl-6">{notification.usermessage}</p>
                </div>
                <div className="text-green-600 text-sm flex items-center mt-3 sm:mt-0 gap-1">
                  <FiCalendar />
                  <span>{notification.postdate}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
