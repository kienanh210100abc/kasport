import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./page/homepage";
import Shoes from "./page/shoes";
import Clothes from "./page/clothes";
import ProductDetail from "./page/ProductDetail/ProductDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
