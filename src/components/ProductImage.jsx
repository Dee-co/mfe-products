import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
function ProductImage({ images, detail }) {
  console.log("rander");
  const [activeImage, setActiveImage] = useState(0);
  const goPrev = () =>
    setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () =>
    setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  return (
    <div>
      <div className="relative rounded-xl sm:rounded-2xl bg-white shadow-lg sm:shadow-xl overflow-hidden group">
        <div className="h-[230px] min-[380px]:h-[260px] sm:h-[350px] md:h-[400px] flex items-center justify-center bg-gray-50">
          {images[activeImage] && (
            <img
              src={images[activeImage]}
              alt={`${detail.title} - Image ${activeImage + 1}`}
              className="h-full w-full object-contain p-3 sm:p-4 transition-transform duration-500"
              loading="lazy"
            />
          )}
        </div>

        {/* Prev/Next arrows - only if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-white transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}
        {/* Badge */}
        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-10">
          <span className="bg-gradient-to-r from-primary to-primary/80 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
            {detail.discountPercentage}% OFF
          </span>
        </div>

        {/* Mobile dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 sm:hidden flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeImage ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails - Hide on mobile */}
      {images.length > 1 && (
        <div className="thumbnail-grid grid-cols-4 gap-2 mt-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`h-16 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                index === activeImage
                  ? "border-primary shadow-[0_0_0_3px_rgba(139,92,246,0.2)]"
                  : "border-transparent hover:border-primary/50"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default React.memo(ProductImage);
