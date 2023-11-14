import React from "react";
function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`${isOpen ? "popup_opened" : ""} popup popup_type_${name}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close"
          aria-label="Закрыть"
          />
        <h3 className="popup__title">{title}</h3>
        <form onSubmit={onSubmit} className="form" name={`form-${name}`} >
          {children}
          <button type="submit" className="form__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;

// «Редактировать профиль»
// «Новое место»
// «Обновить аватар»
// «Вы уверены?»
// Вся общая разметка должна оказаться в новом компоненте.
// Извне должны будут передаваться только текст заголовка
//  и идентификатор формы (в виде строк).
//   Для этого добавьте соответствующие пропсы title и name
//    и подставляйте их значения в JSX.
