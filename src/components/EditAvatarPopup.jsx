import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useState, useEffect, useContext, useRef } from "react";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const [value, setValue] = React.useState('');
    const inputRef = React.useRef();

    function handleInputChange(e) {
        setValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: inputRef.current.value
        })
        // console.log(inputRef.current.value)
        setValue("")
    }
       

    return (
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          isOpen={isOpen}
          onClose={onClose}
          buttonText="Сохранить"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            onChange={handleInputChange}
            value={value}
            name="avatar"
            id="avatar"
            className="form__input"
            type="url"
            placeholder="Ссылка на новое фото"
            required
          />
          <span id="avatar-error" className="form__error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;