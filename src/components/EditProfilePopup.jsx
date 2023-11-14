import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx"

function EditProfilePopup({ isOpen, onClose, onUpdateUser}) {
    // стэйт переменные
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
  
    
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser])

    // обработчики изменения 
    function handleInputChangeName(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handleInputChangeAbout(e) {
        e.preventDefault();
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
         // Передаём значения управляемых компонентов
        //   во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name="about"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            buttonText="Изменить"

        >
          <input
            value={name}
            onChange={handleInputChangeName}
            name="name"
            id="name"
            className="form__input form__input_type_name"
            type="text"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span id="name-error" className="form__error"></span>
          <input
            value={description}
            onChange={handleInputChangeAbout}
            name="about"
            id="about"
            className="form__input form__input_type_about"
            type="text"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
          />
          <span id="about-error" className="form__error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup