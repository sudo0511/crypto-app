import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const Cryptocurrencies = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);

  console.log(cryptos);
  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos.map((currency) => {
          return (
            <Col
              xs={24}
              lg={6}
              sm={12}
              className="crypto-card"
              key={currency.uuid}
            >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                ></Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
