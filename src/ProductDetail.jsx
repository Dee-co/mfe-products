import React, { Suspense, useEffect, useState } from "react";
import api from "mfeShareUi/axios";
import { useParams } from "react-router-dom";
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Heart,
  ShoppingBag,
 
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQty, decreaseQty } from "shell/cartSlice";
import {toggleWishItem} from "shell/wishSlice"
import ProductImage from "./components/ProductImage";
const CustomButton = React.lazy(() => import("mfeShareUi/Button"));
const QuantityButton = React.lazy(() => import("mfeShareUi/QuantityButton"));
function AddToCartSkeleton() {
  return (
    <div className="flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] h-11 sm:h-12 md:h-[52px] rounded-lg sm:rounded-xl bg-gray-200 animate-pulse" />
  );
}
export default function ProductDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const cartItem = useSelector((state) => state.cart.items ?? []) ;
  const wishItem = useSelector(state => state.wish.items ?? [])
  const dispatch = useDispatch();
  useEffect(() => {
    const getQty = cartItem.find((item) => item.id == id);
    if (getQty && getQty.qty) {
      setQuantity(getQty.qty);
    }else{
      setQuantity(null)
    }
  }, [cartItem]);
  useEffect(() => {
    const getWishQty = wishItem.find((item) => item.id == id);
    if (getWishQty) {
       setIsWishlisted(true);
    }else{
      setIsWishlisted(false);
    }
  }, [wishItem]);
  useEffect(() => {
    if (id) getProductDetail(id);
  }, [id]);
  const handleAddItem = () => {
    dispatch(addItem(detail));
  };
  const increaseItem = () => {
    dispatch(increaseQty(detail));
  };
  const decreaseItem = () => {
    dispatch(decreaseQty(detail));
  };
  const handleWishList = ()=>{
    dispatch(toggleWishItem(detail))
  }
  const getProductDetail = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!detail)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  const discountedPrice = (
    detail.price -
    (detail.price * detail.discountPercentage) / 100
  ).toFixed(2);
  const images = detail.images || [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb - Hide on mobile */}
        <nav className="breadCrumb sm:flex mb-4 md:mb-6 text-xs md:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <span className="hover:text-primary cursor-pointer transition-colors" >
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer transition-colors truncate capitalize max-w-[100px] md:max-w-[200px]">
            {detail.category}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate max-w-[150px] md:max-w-[300px] capitalize">
            {detail.title}
          </span>
        </nav>

        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <ProductImage images={images} detail={detail}/>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-5 min-w-0">
            {/* Brand & Title */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="inline-block text-[10px] sm:text-xs md:text-sm font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {detail.brand}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight break-words">
                {detail.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 sm:px-3 py-1 rounded-lg">
                <Star
                  size={14}
                  className="sm:w-4 sm:h-4"
                  fill="white"
                  strokeWidth={0}
                />
                <span className="font-semibold text-xs sm:text-sm">
                  {detail.rating}
                </span>
              </div>
              <span className="text-gray-500 text-xs sm:text-sm">
                ({detail.reviews.length} Reviews)
              </span>
              <span className="text-gray-300 hidden min-[380px]:inline">|</span>
              <span className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-full">
                {detail.availabilityStatus}
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-end gap-2 sm:gap-3 md:gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                ₹{discountedPrice}
              </span>
              <span className="text-base sm:text-lg md:text-xl text-gray-400 line-through">
                ₹{detail.price}
              </span>
              <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold">
                Save ₹{(detail.price - discountedPrice).toFixed(2)}
              </span>
            </div>

            {/* Description - Truncate on mobile with expand option */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
              {detail.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              {quantity ? (
                <Suspense fallback={<AddToCartSkeleton />}>
                  <QuantityButton
                    className="flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[200px] "
                    quantity={quantity}
                    handleIncrease={increaseItem}
                    handleDecrease={decreaseItem}
                  />
                </Suspense>
              ) : (
                <Suspense fallback={<AddToCartSkeleton />}>
                  <CustomButton
                    className="flex-1 gap-2 items-center justify-center min-w-[140px] sm:min-w-[180px] md:min-w-[200px]"
                    title={
                      <>
                        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Add to Cart</span>
                      </>
                    }
                    onClick={handleAddItem}
                    type="primary"
                  />
                </Suspense>
              )}
              <button
                onClick={handleWishList}
                className={`px-2 h-10 rounded-lg sm:rounded-xl border-1 transition-all duration-300 ${
                  isWishlisted
                    ? "bg-red-50 border-red-500 text-red-500"
                    : "border-gray-300 hover:border-primary hover:bg-primary/5"
                }`}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-3 h-3 sm:w-5 sm:h-5 ${
                    isWishlisted ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>

            {/* Shipping & Warranty Cards - Responsive grid */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-blue-200/50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 leading-tight">
                  {detail.shippingInformation}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-green-200/50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="text-green-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 leading-tight">
                  {detail.warrantyInformation}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-purple-200/50">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                  <RotateCcw className="text-purple-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 leading-tight">
                  {detail.returnPolicy}
                </p>
              </div>
            </div>

            {/* Product Details - Responsive grid */}
            <div className="border-t pt-4 sm:pt-5 md:pt-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="min-w-0">
                  <span className="text-gray-500">Category</span>
                  <p className="font-medium text-gray-900 mt-0.5 truncate">
                    {detail.category}
                  </p>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-500">SKU</span>
                  <p className="font-medium text-gray-900 mt-0.5 truncate">
                    {detail.sku}
                  </p>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-500">Stock</span>
                  <p
                    className={`font-medium mt-0.5 ${
                      detail.stock > 50 ? "text-green-600" : "text-orange-500"
                    }`}
                  >
                    {detail.stock} units
                  </p>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-500">Minimum Order</span>
                  <p className="font-medium text-gray-900 mt-0.5">
                    {detail.minimumOrderQuantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
