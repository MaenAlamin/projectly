import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function TaskChart({ taskData }) {
  let result = [];
  function generateDatesOfMonth() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const datesOfMonth = [];

    for (
      let day = firstDayOfMonth.getDate();
      day <= lastDayOfMonth.getDate();
      day++
    ) {
      const date = new Date(
        firstDayOfMonth.getFullYear(),
        firstDayOfMonth.getMonth(),
        day
      );
      const formattedDate = date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
      });
      datesOfMonth.push(formattedDate);
    }

    return datesOfMonth;
  }

  // Function to count the number of objects for each date in the current month
  function countObjectsByDate(datesOfMonth) {
    datesOfMonth.forEach((date) => {
      let count = 0;
      taskData.forEach((obj) => {
        const objDate = new Date(obj.createdAt);
        const formattedObjDate = objDate.toLocaleString("en-US", {
          month: "long",
          day: "numeric",
        });

        if (formattedObjDate === date) {
          count++;
        }
      });
      result.push({ name: date, numerOfTasks: count });
    });

    return result;
  }
  function sortDaysAndCountObjects() {
    const datesOfMonth = generateDatesOfMonth();
    result = countObjectsByDate(datesOfMonth);
  }

  sortDaysAndCountObjects();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={result}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="numerOfTasks"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
