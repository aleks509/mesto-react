import React from "react";

function ImagePopup({ card, onClose }) {
  // console.log(card)
  return (
    <div
      className={`${card ? "popup_opened" : ""} popup popup_type_view-photo`}
    >
      <div className="popup__view-container">
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
        />
        <img className="popup__photo" src={card?.link} alt={card?.name} />
        <h3 className="popup__photo-title">{card?.name}</h3>
      </div>
    </div>
  );
}
export default ImagePopup;
