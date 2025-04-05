import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const MessMenuCard = ({ day, breakfast, lunch, snacks, dinner }) => {
  const renderMeal = (meal, icon, label) => (
    <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg border border-green-100 dark:border-green-700 shadow-sm">
      <Text className="font-semibold text-green-800 dark:text-green-200 text-sm flex items-center mb-2">
        {icon} <span className="ml-2">{label}</span>
      </Text>
      <div className="grid grid-cols-2 gap-1 text-sm">
        {Object.entries(meal || {}).map(([key, value]) => (
          <Text
            key={key}
            className="capitalize text-gray-700 dark:text-gray-300 flex items-center"
          >
            {key === "main" ? "🍛" :
             key === "sides" ? "🥘" :
             key === "extras" ? "✨" :
             key === "fruits" ? "🍎" :
             key === "salad" ? "🥗" :
             key === "sweets" ? "🍮" :
             key === "drinks" ? "🥤" : ""}{" "}
            <span className="ml-1">{value}</span>
          </Text>
        ))}
      </div>
    </div>
  );

  return (
    <Card
      className="mb-6 rounded-2xl shadow-lg dark:shadow-md bg-white dark:bg-green-950 border border-gray-200 dark:border-green-800 transition-all"
      bodyStyle={{ padding: "16px 20px" }}
    >
      <Title level={5} className="text-center text-green-800 dark:text-green-300 font-semibold mb-3">
        📅 {day}
      </Title>

      <div className="space-y-4">
        {renderMeal(breakfast, "🌞", "Breakfast")}
        {renderMeal(lunch, "🍱", "Lunch")}
        {renderMeal(snacks, "🍪", "Snacks")}
        {renderMeal(dinner, "🌙", "Dinner")}
      </div>
    </Card>
  );
};

export default MessMenuCard;
