import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, color }) => {
  const [coinPrice, setCoinPrice] = useState([]);
  const [coinTimestamp, setCoinTimestamp] = useState([]);

  console.log(coinHistory?.data);

  useEffect(() => {
    setCoinPrice(
      coinHistory?.data?.history.map(
        (ele, i) => coinHistory?.data?.history[i]?.price
      )
    );
    setCoinTimestamp(
      coinHistory?.data?.history.map((ele, i) =>
        new Date(
          coinHistory?.data?.history[i]?.timestamp * 1000
        ).toLocaleDateString()
      )
    );
  }, [coinHistory]);

  //   console.log(coinPrice);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price",
        data: coinPrice,
        fill: false,
        backgroundColor: color,
        borderColor: color,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={3} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Price Change % : {coinHistory?.data?.change}
          </Title>
          <Title level={5} className="current-price">
            Current Bitcoin Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line className="line-chart" data={data} options={options} />
    </>
  );
};

export default LineChart;
