import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { db } from '../../firebase-config';
import { collection, addDoc } from '@firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComplaintBox = () => {
  const [form] = Form.useForm();
  const userCollectionRef = collection(db, 'complaints');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString('en-US', options);

    try {
      await addDoc(userCollectionRef, {
        postdate: dateString,
        usersubject: values.subject,
        usermessage: values.message,
        username: values.name,
        useremail: values.email,
      });

      toast.success('Complaint submitted successfully!');
      form.resetFields();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10 tracking-wide">
          Complaint <span className="text-green-500">Box</span>
        </h2>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Form.Item
            label={<span className="text-sm font-medium text-gray-700">Name</span>}
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              placeholder="Enter your name"
              className="py-2 px-4 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium text-gray-700">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="py-2 px-4 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium text-gray-700">Subject</span>}
            name="subject"
            rules={[{ required: true, message: 'Please enter a subject' }]}
          >
            <Input
              placeholder="Subject of complaint"
              className="py-2 px-4 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm font-medium text-gray-700">Message</span>}
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea
              rows={5}
              placeholder="Write your complaint here..."
              className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-green-600 hover:bg-green-500 border-none rounded-md px-6 py-2 text-white font-medium"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default ComplaintBox;
