import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md animate-pulse">
      {/* Image */}
      <div className="relative bg-gray-100">
        <div className="h-40 w-full bg-gray-200 sm:h-48 md:h-56 lg:h-64" />

        {/* Discount Badge */}
        <div className="absolute left-2 top-2 h-7 w-18 rounded-full bg-gray-300 sm:left-3 sm:top-3" />

        {/* Wishlist */}
        <div className="absolute right-2 top-2 h-8 w-8 rounded-full bg-gray-300 sm:right-3 sm:top-3 sm:h-10 sm:w-10" />
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-3 sm:p-4">
        {/* Rating */}
        <div className="absolute -top-4 right-3 h-8 w-14 rounded-md border border-gray-300 bg-gray-200 sm:right-4" />

        {/* Brand */}
        <div className="h-4 w-24 rounded bg-gray-200" />

        {/* Category */}
        <div className="mt-2 h-3 w-20 rounded bg-gray-200" />

        {/* Title */}
        <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />

        <div className="mt-auto">
          {/* Price */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-20 rounded bg-gray-200" />
            <div className="h-4 w-14 rounded bg-gray-200" />
          </div>

          {/* Save Badge */}
          <div className="mt-3 h-6 w-28 rounded-md bg-gray-200" />

          {/* Button */}
          <div className="mt-4 h-10 w-full rounded-lg bg-gray-300" />
        </div>
      </div>
    </div>
  );
}