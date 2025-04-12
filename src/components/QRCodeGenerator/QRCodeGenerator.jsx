import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Use QRCodeCanvas
import { Button, Select, Input, Form, Row, Col, message, Typography } from 'antd';
import { toast, ToastContainer } from 'react-toastify';

const { Option } = Select;
const { Title, Text } = Typography;

const QRCodeGenerator = () => {
    const [qrData, setQrData] = useState('');
    const [guests, setGuests] = useState(0); // Default 0 guests
    const [selectedMeal, setSelectedMeal] = useState(''); // State for meal selection
    const [isSubmitted, setIsSubmitted] = useState(false);


    useEffect(() => {
        if (isSubmitted && selectedMeal) {
            const username = localStorage.getItem('username') || 'guest_user';

            // 🧮 meal count = 1 (self) + guests if selected
            const mealCounts = {
                [selectedMeal]: guests + 1, // Only the selected meal is counted
            };

            // Final string to encode in QR
            const dataString = JSON.stringify({
                username,
                guests,
                meals: mealCounts,
            });

            setQrData(dataString);
        }
    }, [guests, selectedMeal, isSubmitted]);

    const handleSubmit = () => {
        if (!guests) {
            toast.error('Please enter a no. of guest before generating the QR code.');
            return;
        }
        if (!selectedMeal) {
            toast.error('Please select a meal before generating the QR code.');
            return;
        }
        setIsSubmitted(true);  // Set the submission state to true, triggering QR code generation
        toast.success('QR Code generated successfully!'); // Show success toast
    };

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen">
            {/* Form for guest number and meal selection */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
            {!isSubmitted && (
                <div className='flex flex-col items-center justify-center p-6 space-y-6 bg-green-50'>
                    <Title level={2} className="text-center text-green-700">Generate Your Meal QR Code</Title>

                    {/* Instructions for the user */}
                    <Text className="text-center text-green-600 text-lg mb-4">
                        Select a meal, enter the number of guests, and generate your QR code to enjoy your meal at the entrance.
                    </Text>
                    <Form className="w-full max-w-md" onFinish={handleSubmit}>
                        <Row gutter={[16, 16]}>
                            {/* Guests Input */}
                            <Col span={24}>
                                <Form.Item label="Number of Guests">
                                    <Input
                                        type="number"
                                        value={guests}
                                        onChange={(e) => setGuests(Math.max(0, Number(e.target.value)))}
                                        min={0}
                                        className="border p-2 rounded text-green-700 w-full"
                                    />
                                </Form.Item>
                            </Col>

                            {/* Meal Selection (Dropdown style with AntD's Select) */}
                            <Col span={24}>
                                <Form.Item label="Select a Meal">
                                    <Select
                                        value={selectedMeal}
                                        onChange={(value) => setSelectedMeal(value)}
                                        placeholder="Select a meal"
                                        className="w-full"
                                        style={{ borderRadius: '8px', borderColor: 'green' }}
                                    >
                                        <Option value="breakfast" className="text-green-700">
                                            Breakfast
                                        </Option>
                                        <Option value="lunch" className="text-green-700">
                                            Lunch
                                        </Option>
                                        <Option value="snacks" className="text-green-700">
                                            Snacks
                                        </Option>
                                        <Option value="dinner" className="text-green-700">
                                            Dinner
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            {/* Submit Button */}
                            <Col span={24}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    className="bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:bg-green-700 border-none shadow-md transition-all duration-200"
                                >
                                    Generate QR Code
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </div>
            )}

            {/* Show QR Code only after submission */}
            {isSubmitted && qrData && (
                <div className="mt-6 text-center">
                    <QRCodeCanvas value={qrData} size={256} className="mx-auto" />
                </div>
            )}

            {/* Scan QR Code Message */}
            {isSubmitted && qrData && (
                <div className="mt-6 text-center text-lg text-green-700 font-semibold">
                    <Text>Scan this QR code at the entrance to enjoy your meal!</Text>
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;
