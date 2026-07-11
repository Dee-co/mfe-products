import React, { useEffect, useMemo, useState, Suspense } from "react";
import { Heart, Star, Zap, Loader2 } from "lucide-react";
const CustomButton = React.lazy(() => import("mfeShareUi/Button"));
const QuantityButton = React.lazy(() => import("mfeShareUi/QuantityButton"));
function ButtonSkeleton() {
  return (
    <div
      className="
        flex
        w-full
        px-4 py-2
        text-transparent
        bg-gray-200
        rounded-md
        animate-pulse
        items-center justify-center
      "
    >
      Loading
    </div>
  );
}

function ProductCard({
  item,
  handleToWish,
  cartItem,
  wishItem,
  handleAddToCart,
  increaseQty,
  decreaseQty,
  handleDetail,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const discountedPrice = useMemo(() => {
    return (item.price - (item.price * item.discountPercentage) / 100).toFixed(
      2
    );
  }, [item]);

  const saveAmount = useMemo(() => {
    return (item.price - discountedPrice).toFixed(0);
  }, [discountedPrice, item]);
  useEffect(() => {
    if (cartItem) {
      setIsAdding(false);
    }
  }, [cartItem]);

  const onAddToCart = async (e) => {
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);
    try {
      await Promise.resolve(handleAddToCart(item));
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      onClick={() => handleDetail(item)}
      className="
        flex flex-col overflow-hidden
        h-full
        bg-white
        rounded-xl border border-gray-100
        shadow-md
        transition hover:shadow-xl
      "
    >
      {/* IMAGE */}
      <div
        className="
          bg-gray-100
          relative
        "
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className="
            object-contain
            h-40 w-full
            sm:h-48
            md:h-56
            lg:h-64
          "
        />

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleToWish(item);
          }}
          className="
            flex
            px-2 py-1
            bg-black
            rounded-full
            cursor-pointer
            absolute left-2 top-2 items-center gap-1
            sm:px-3 sm:left-3 sm:top-3
          "
        >
          <Zap size={13} fill="white" color="black" />
          <span
            className="
              text-[10px] text-white
              sm:text-xs
            "
          >
            {parseInt(item.discountPercentage)}% OFF
          </span>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleToWish(item);
          }}
          className="
            flex
            h-8 w-8
            bg-white
            rounded-full
            cursor-pointer
            absolute right-2 top-2 items-center justify-center shadow
            sm:h-10 sm:w-10 sm:right-3 sm:top-3
          "
        >
          <Heart size={18} fill={wishItem ? "red" : "white"} />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex flex-1 flex-col
          p-3
          relative
          sm:p-4
        "
      >
        <div
          className="
            flex
            px-2 py-1
            text-xs
            bg-white
            rounded-md border
            absolute -top-4 right-3 items-center gap-1 shadow
            sm:right-4
          "
        >
          <Star size={14} fill="yellow" color="black" />
          {item.rating.toFixed(1)}
        </div>

        <div
          className="
            flex flex-col
            min-h-[30px]
          "
        >
          <span
            className="
              text-sm font-semibold text-primary
              line-clamp-1
              sm:text-base
            "
          >
            {item.brand}
          </span>

          <span
            className="
              text-sm text-gray-500
              capitalize line-clamp-1
              sm:text-base
            "
          >
            {item.category}
          </span>
        </div>

        <h3
          className="
            mt-1
            text-base font-semibold
            line-clamp-1
            sm:text-lg
          "
        >
          {item.title}
        </h3>

        {/* Push everything below to bottom */}
        <div
          className="
            mt-auto
          "
        >
          <div
            className="
              flex
              items-center justify-between
            "
          >
            <div>
              <div
                className="
                  flex flex-wrap
                  items-center gap-2
                "
              >
                <span
                  className="
                    text-base font-bold
                    sm:text-lg
                  "
                >
                  ₹{discountedPrice}
                </span>

                <span
                  className="
                    text-sm text-gray-500
                    line-through
                    sm:text-md
                  "
                >
                  ₹{item.price}
                </span>
              </div>

              <span
                className="
                  inline-flex
                  mt-2 px-2 py-1
                  text-xs text-green-600
                  bg-green-100
                  rounded-md
                "
              >
                You save ₹{saveAmount}
              </span>
            </div>
          </div>

          <div
            className="
              mt-4
            "
          >
            {cartItem ? (
              <Suspense fallback={<ButtonSkeleton />}>
                <QuantityButton
                  quantity={cartItem.qty}
                  handleIncrease={(e) => {
                    e.stopPropagation();
                    increaseQty(item);
                  }}
                  handleDecrease={(e) => {
                    e.stopPropagation();
                    decreaseQty(item);
                  }}
                  className="w-full"
                />
              </Suspense>
            ) : isAdding ? (
              <button
                type="button"
                disabled
                className="
                  flex
                  w-full
                  px-4 py-2
                  text-white
                  bg-primary/70
                  rounded-md
                  cursor-not-allowed
                  items-center justify-center gap-2
                "
              >
                <Loader2
                  size={18}
                  className="
                    animate-spin
                  "
                />
                Adding...
              </button>
            ) : (
              <Suspense fallback={<ButtonSkeleton />}>
                <CustomButton
                  title="Add to Cart"
                  onClick={onAddToCart}
                  className="
                    w-full
                    text-center
                  "
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
