import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import { useParams } from "react-router-dom";
import { Avatar } from "antd";

function Profile() {
  const { username } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const dataRef = collection(db, "studentdata");
      const data = await getDocs(dataRef);
      const userData = data.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .find(user => user.regno === username);
      console.log(userData);
      setStudent(userData);
    };

    fetchStudentData();
  }, [username]);

  if (!student) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-32 p-6 my-auto bg-slate-100 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {student.profileImg ? (
          <img
            src={student.profileImg}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />) : (<Avatar
            size={128}
            src={student.profileImg}
            alt="Profile"
            style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
          >
            {student.firstname?.charAt(0).toUpperCase()}{student.lastname?.charAt(0).toUpperCase()}
          </Avatar>

        )
        }

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {student.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-800 dark:text-gray-300">
        <ProfileItem label="Registration No" value={student.regno} />
        <ProfileItem label="Branch" value={student.branch} />
        <ProfileItem label="Year" value={student.year} />
        <ProfileItem label="Gender" value={student.gender} />
        <ProfileItem label="Contact No" value={student.contact_no} />
        <ProfileItem label="Address" value={student.address} />
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-semibold">{value || "—"}</p>
    </div>
  );
}

export default Profile;
