import React, { useEffect, useState } from "react";
import ProductForm from "../components/product/ProductForm";
import { getProducts } from "../api/productApi/getProduct";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-5">
      <div className="fade-in">
        <ProductForm products={products} />
      </div>
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;