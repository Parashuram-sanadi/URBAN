import React, { useEffect } from "react";

export default function ImageLightbox({ imageUrl, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="image-lightbox-overlay" onClick={onClose}>
      <div className="image-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <img
          src={imageUrl}
          alt="Zoomed view"
          className="image-lightbox-image"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x300?text=No+Image";
          }}
        />
      </div>
    </div>
  );
}

