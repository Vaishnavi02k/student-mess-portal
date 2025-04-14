import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase-config";
import { collection, getDocs } from "@firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";

function Login() {
    const [users, setUsers] = useState([]);
    const studentLoginRef = collection(db, "studentlogin");
    const navigate = useNavigate();

    useEffect(() => {

        const fetchUsers = async () => {
            const data = await getDocs(studentLoginRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        fetchUsers();
    }, []);

    const onFinish = async (values) => {
        const matchedUser = users.find(
            (user) =>
                user.username === values.username &&
                user.password === values.password
        );

        if (matchedUser) {
            localStorage.setItem("username", matchedUser.username);
            localStorage.setItem("name", matchedUser.name || matchedUser.username);
            toast.success("Logged in successfully!");
            setTimeout(() => {
                navigate(`/${matchedUser.username}/dashboard`); 
            }, 1500); // short delay to show toas
        } else {
            localStorage.setItem("username", "nouser");
            localStorage.setItem("name", "nouser");
            toast.error("Invalid credentials!");
        }
    };

    return (
        <div className="pt-20">
            <ToastContainer />
            <Form
                className="m-auto w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-6 dark:bg-gray-800 dark:border-gray-700"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className="flex">
                    <h5 className="m-auto mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        Login to HostelMess
                    </h5>
                </div>

                <Form.Item
                    label={<label className="dark:text-white">Username</label>}
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input placeholder="123" />
                </Form.Item>

                <Form.Item
                    label={<label className="dark:text-white">Password</label>}
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password placeholder="123" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        className="w-full h-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        htmlType="submit"
                    >
                        Login
                    </Button>
                    <div className="text-sm mt-2 font-medium text-gray-500 dark:text-gray-300">
                        Not registered?{" "}
                        <Link
                            href="/signup"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                        >
                            Create an account
                        </Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
