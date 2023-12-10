import React from "react";

function InfoTooltip({ name, isOpen, isSuccess, onClose }) {
  return (
    <div className={`${isOpen ? "popup_opened" : ""} popup popup_type_${name}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
        />
          <div
            className={`popup__success ${isSuccess ? "popup__success_type_done" : "popup__success_type_fail"}`}
          />
            <h2 className="popup__success-title">
              {isSuccess
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте еще раз."}
            </h2>
        </div>
    </div>
  );
}
export default InfoTooltip;
