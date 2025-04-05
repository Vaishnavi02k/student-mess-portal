import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Select } from 'antd';
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import Password from 'antd/es/input/Password';

const { Title } = Typography;
const { Option } = Select;

const SignUp = () => {
  const [form] = Form.useForm();

  const [studentData, setStudentData] = useState({
    firstname: '',
    lastname: '',
    regno: '',
    password: '',
    email: '',
    address: '',
    city: '',
    gender: '',
    contact_no: '',
    year: '',
    imagedrive: '',
  });
  const studentCollectionRef = collection(db, "studentdata");
  const studentLoginRef=collection(db,"studentlogin")


  const handleChange = (key, value) => {
    setStudentData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    console.log('Submitted Student Data:', studentData);
    // event.preventDefault();
    await addDoc(studentCollectionRef,studentData);
    await addDoc(studentLoginRef,{
        username:studentData.regno,
        password:studentData.password,
        name:studentData.firstname
    })
    // setTimeout(function () {
    //     window.router.push('/')
    // }, 1000);

  };

  return (
    <div className="max-w-xl mx-auto py-5 px-4 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">
        Student <span className="text-blue-600">Signup</span>
      </Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                { required: true, message: 'Please enter your first name' },
                { pattern: /^[A-Za-z\s]+$/, message: 'Only alphabets allowed' },
              ]}
            >
              <Input
                placeholder="John"
                value={studentData.firstname}
                onChange={e => handleChange('firstname', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                { required: true, message: 'Please enter your last name' },
                { pattern: /^[A-Za-z\s]+$/, message: 'Only alphabets allowed' },
              ]}
            >
              <Input
                placeholder="Wick"
                value={studentData.lastname}
                onChange={e => handleChange('lastname', e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Reg Number"
              name="regno"
              rules={[
                { required: true, message: 'Please enter your registration number' },
                { pattern: /^[0-9]+$/, message: 'Only numbers allowed' },
                { min: 7, message: 'Minimum 7 digits' },
              ]}
            >
              <Input
                placeholder="12345678"
                value={studentData.regno}
                onChange={e => handleChange('regno', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter a password' },
                { min: 6, message: 'Minimum 6 characters required' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Password must contain letters and numbers',
                },
              ]}
            >
              <Input.Password
                placeholder="********"
                value={studentData.password}
                onChange={e => handleChange('password', e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please enter an email' },
            { type: 'email', message: 'Enter a valid email address' },
          ]}
        >
          <Input
            placeholder="email@domain.com"
            value={studentData.email}
            onChange={e => handleChange('email', e.target.value)}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              label="Address / Street"
              name="address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input
                placeholder="IIT Goa"
                value={studentData.address}
                onChange={e => handleChange('address', e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input
                placeholder="Ponda"
                value={studentData.city}
                onChange={e => handleChange('city', e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select
                placeholder="Select gender"
                value={studentData.gender}
                onChange={value => handleChange('gender', value)}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact No"
              name="contact_no"
              rules={[
                { required: true, message: 'Please enter contact number' },
                { pattern: /^[0-9]{10}$/, message: 'Must be 10 digits' },
              ]}
            >
              <Input
                placeholder="1234567890"
                value={studentData.contact_no}
                onChange={e => handleChange('contact_no', e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Year"
              name="year"
              rules={[{ required: true, message: 'Please select year' }]}
            >
              <Select
                placeholder="Select year"
                value={studentData.year}
                onChange={value => handleChange('year', value)}
              >
                <Option value="FY">FY</Option>
                <Option value="SY">SY</Option>
                <Option value="TY">TY</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              label="Drive Link of Photo"
              name="imagedrive"
              rules={[
                { required: true, message: 'Please enter drive link' },
                {
                  pattern: /^https:\/\/drive\.google\.com\/.+$/,
                  message: 'Must be a valid Google Drive link',
                },
              ]}
            >
              <Input
                placeholder="https://drive.google.com/..."
                // https://drive.google.com/file/d/1zex0fd2ZeZey8PLE40yqvxoMCdkspTkZ/view?usp=drive_link
                value={studentData.imagedrive}
                onChange={e => handleChange('imagedrive', e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="text-right">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
