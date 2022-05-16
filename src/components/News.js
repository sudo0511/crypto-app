import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsAPI";
import { useGetCryptosQuery } from "../services/cryptoAPI";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 15,
  });
  const { data: cryptoCoins } = useGetCryptosQuery(100);
  // console.log(newsCategory);

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (isFetching) {
    return (
      <div>
        <Spin className="loader" tip="Loading..."></Spin>
      </div>
    );
  }
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="View News by Category"
              onChange={(value) => setNewsCategory(value)}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {cryptoCoins?.data?.coins.map((coin) => {
                return (
                  <Option key={coin.uuid} value={coin.name}>
                    {coin.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((article, i) => {
          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={article.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {article.name}
                    </Title>
                    <img
                      src={article?.image?.thumbnail?.contentUrl || demoImage}
                      alt="news"
                    />
                  </div>
                  <p>
                    {article.description > 100
                      ? `${article.description.substring(0, 100)}....`
                      : article.description}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={
                          article?.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt="news provider"
                      />
                      <Text className="provider-name">
                        {article?.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(article.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default News;
