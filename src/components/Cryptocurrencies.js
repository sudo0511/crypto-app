import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoAPI";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  // console.log(cryptosList);
  const [cryptos, setCryptos] = useState([]);
  const [cryptoSearch, setSearch] = useState("");

  useEffect(() => {
    const filteredCoins = cryptosList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(cryptoSearch.toLowerCase());
    });
    // console.log(filteredCoins);
    setCryptos(filteredCoins);
  }, [cryptosList, cryptoSearch]);
  // console.log(cryptos);

  if (isFetching) {
    return (
      <div>
        <Spin className="loader" tip="Loading..."></Spin>
      </div>
    );
  }
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => {
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
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt="coin-image"
                    />
                  }
                  hoverable
                >
                  <p>Price : {millify(currency.price)}</p>
                  <p>Price : {millify(currency.marketCap)}</p>
                  <p>Price : {millify(currency.change)}%</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
