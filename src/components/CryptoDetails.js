import React, { useState } from "react";
import {
  DollarCircleOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useGetCoinQuery, useGetCoinHistoryQuery } from "../services/cryptoAPI";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Select, Spin } from "antd";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { Text, Title } = Typography;
  const { Option } = Select;
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCoinQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timePeriod });
  const coinDetails = data?.data?.coin;

  // console.log(coinDetails);

  if (isFetching) {
    return (
      <div>
        <Spin tip="Loading...."></Spin>
      </div>
    );
  }

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coinDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        coinDetails["24hVolume"] && millify(coinDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails.marketCap && millify(coinDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(coinDetails?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title
          level={2}
          className="coin-name"
          style={{ color: `${coinDetails.color}` }}
        >
          <img
            className="crypto-image-icon"
            src={coinDetails.iconUrl}
            alt="coin-image"
          />
          {coinDetails.name} ({coinDetails.symbol}) Price
        </Title>
        <p>
          {coinDetails.name} live price in US Dollars (USD). View value
          statistics, market cap nad supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select time Period"
        onChange={(value) => {
          console.log(value);
          setTimePeriod(value);
        }}
      >
        {time.map((t) => {
          return <Option key={t}>{t}</Option>;
        })}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coinDetails?.price)}
        coinName={coinDetails.name}
        color={`${coinDetails.color}`}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coinDetails.name} Value Statistics
            </Title>
            <p>An Overview showing stats of {coinDetails.name}</p>
          </Col>
          {stats.map(({ title, value, icon }, i) => (
            <Col key={i} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coinDetails.name} ?
            {HTMLReactParser(coinDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coinDetails.name} Links
          </Title>
          {coinDetails?.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.name}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.type}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
