import { Routes, Route, Link } from "react-router-dom";
import { Layout, Space, Typography } from "antd";
import {
  Navbar,
  News,
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
} from "./Imports/imports";
import "./index.css";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" exact element={<Homepage />} />

              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />

              {/* <Route path="/exchanges" element={<Exchanges />} /> */}

              <Route path="/crypto/:coinId" element={<CryptoDetails />} />

              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Crypto App <br />
            All rights reserved Copyright © 2022
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
