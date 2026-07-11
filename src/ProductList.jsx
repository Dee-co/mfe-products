import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import React, { useCallback, useEffect, useState } from "react";
import api from "mfeShareUi/axios";
import ProductCard from "./components/ProductCard";
import { addItem, increaseQty, decreaseQty } from "shell/cartSlice";
import { toggleWishItem } from "shell/wishSlice";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "./components/ProductSkelaton";
const CustomButton = React.lazy(() => import("mfeShareUi/Button"));
function ProductList() {
  console.log("rander");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    setInitialLoading(true);
    try {
      const { data } = await api.get("/products");
      console.log(data);
      setProducts(data.products);
      setInitialLoading(false);
    } catch (error) {
      console.log(error);
      setInitialLoading(false);
    }
  };
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items ?? []);
  const wishItems = useSelector((state) => state.wish.items);
  const wishList = useCallback(
    (item) => {
      dispatch(toggleWishItem(item));
    },
    [dispatch]
  );

  const addToCart = useCallback(
    (item) => {
      dispatch(addItem(item));
    },
    [dispatch]
  );
  const productDetails = (item) => {
    navigate(`/productDetail/${item.id}`);
  };
  const handleIncreaseQty = useCallback(
    (item) => {
      dispatch(increaseQty(item));
    },
    [dispatch]
  );
  const handleDecreaseQty = useCallback(
    (item) => {
      dispatch(decreaseQty(item));
    },
    [dispatch]
  );
  return (
    <div className="grid grid-cols-2 gap-3 p-3 lg:grid-cols-3">
      {initialLoading
        ? [...Array(10)].map((item, index) => {
            return <ProductSkeleton key={index} />;
          })
        : products.map((p) => {
            const cartItem = cartItems.find((item) => item.id === p.id);
            const wishItem = wishItems.find((item) => item.id == p.id);
            return (
              <ProductCard
                key={p.id}
                item={p}
                cartItem={cartItem}
                wishItem={wishItem}
                handleToWish={wishList}
                handleDetail={productDetails}
                handleAddToCart={addToCart}
                increaseQty={handleIncreaseQty}
                decreaseQty={handleDecreaseQty}
              />
            );
          })}
    </div>
  );
}

export default ProductList;
