import React from "react";
import { FaTimes } from "react-icons/fa";

const ImagePopup = ({ isOpen, handleClose, selectedItem }) => {
  if (!isOpen) return null;

  const { fileName, photo } = selectedItem;

  return (
    <div className="popup-backdrop">
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
