import React from "react";
import { FaTimes } from "react-icons/fa";

const ImagePopup = ({ isOpen, handleClose, selectedItem }) => {
  if (!isOpen) return null;

  const { fileName, photo } = selectedItem;
  const handlePopupClick = (e) => {
    // Check if the click occurred on the background or "x" button
    if (e.target.classList.contains("popup-backdrop") || e.target.classList.contains("popup-close")) {
      handleClose();
    }
  };

  return (
    <div className="popup-backdrop" onClick={handlePopupClick}>
      <div className="popup">
        <button className="popup-close" onClick={handleClose}>
          <FaTimes />
        </button>
        <div className="popup-content">
          {photo.endsWith(".mp4") || photo.endsWith(".avi") ? (
            <video controls className="popup-media">
              <source
                src={`http://localhost:5000/uploads/${photo}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={`http://localhost:5000/uploads/${photo}`}
              alt={fileName}
              className="popup-media"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
