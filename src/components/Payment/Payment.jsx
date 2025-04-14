import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { db } from '../../firebase-config';
import {
  collection,
  getDocs,
  query,
  where,
  doc
} from 'firebase/firestore';
import { Card, Button, Typography, Row, Col, Divider } from 'antd';

const { Title, Text } = Typography;

function Payment() {
  const [amount, setAmount] = useState(0);
  const [docId, setDocId] = useState(null);
  const [mealCounts, setMealCounts] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
  });
  const [mealPrices, setMealPrices] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
  });

  const regNo = localStorage.getItem('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'messPayment'), where('regNo', '==', Number(regNo)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();
          setDocId(userDoc.id);
          setMealCounts({
            breakfast: data.breakfast || 0,
            lunch: data.lunch || 0,
            snacks: data.snacks || 0,
            dinner: data.dinner || 0,
          });

          const pricesSnap = await getDocs(collection(db, 'messPrices'));
          const prices = {};
          pricesSnap.forEach(doc => {
            prices[doc.id] = doc.data().price;
          });
          setMealPrices(prices);

          const total =
            (data.breakfast || 0) * (prices.breakfast || 0) +
            (data.lunch || 0) * (prices.lunch || 0) +
            (data.snacks || 0) * (prices.snacks || 0) +
            (data.dinner || 0) * (prices.dinner || 0);

          setAmount(total);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [regNo]);

  const makePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/payment', {
        amount,
        regNo,
      });

      if (response?.status === 200) {
        window.location.href = response.data.session.url;
      }
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];
  const labels = {
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    snacks: 'Snacks',
    dinner: 'Dinner',
  };
  const emojis = {
    breakfast: '🍽️',
    lunch: '🍛',
    snacks: '☕',
    dinner: '🍲',
  };

  return (
    <div className=" p-20 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <Title level={2} className="text-center text-green-700 mb-10">Meal Consumption Summary</Title>

        <Row gutter={[24, 24]} justify="center">
          {mealTypes.map(meal => (
            <Col xs={24} sm={12} md={6} key={meal}>
              <Card
                title={
                  <span className="text-lg font-semibold text-green-800">
                    {emojis[meal]} {labels[meal]}
                  </span>
                }
                bordered
                className="rounded-xl shadow hover:shadow-lg transition duration-200"
                headStyle={{ backgroundColor: '#d1fae5', borderBottom: 'none' }}
              >
                <div className="space-y-1">
                  <Text type="secondary">Meals Availed</Text>
                  <Title level={3} className="text-green-700">{mealCounts[meal]}</Title>

                  <Divider />

                  <Text type="secondary">Rate per Meal</Text>
                  <p className="text-green-600">₹{mealPrices[meal] || 0}</p>

                  <Text strong>Total: ₹{mealCounts[meal] * (mealPrices[meal] || 0)}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="flex justify-between text-center mt-12">
          <Title level={4} className="text-green-700">Total Due: <span className="text-red-600">₹{amount}</span></Title>
          <Button
            type="primary"
            size="large"
            onClick={makePayment}
            disabled={amount === 0}
            className="bg-green-600 hover:bg-green-700 transition"
          >
            Proceed to Pay ₹{amount}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
