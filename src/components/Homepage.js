import React, { useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const { Title } = Typography;
  const globalStats = data?.data?.stats;
  // console.log(globalStats);

  if (isFetching) {
    return (
      <div>
        <Spin tip="Loading...."></Spin>
      </div>
    );
  }
  return (
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto Statistic
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total crypto currencies"
            value={globalStats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={2} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={2} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News />
    </>
  );
};

export default Homepage;
