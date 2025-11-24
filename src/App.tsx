import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./page/homepage";
import ProductList from "./page/ProductList/ProductList";
import ProductDetail from "./page/ProductDetail/ProductDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shoes" element={<ProductList category="shoes" />} />
        <Route path="/clothes" element={<ProductList category="clothes" />} />
        <Route path="/racket" element={<ProductList category="racket" />} />
        <Route
          path="/accessory"
          element={<ProductList category="accessory" />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
