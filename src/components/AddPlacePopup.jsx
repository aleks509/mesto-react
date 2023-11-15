import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { useState, useEffect, useContext, useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
//    стэйт переменые 
    const [link, setLink] = React.useState('')
    const [place, setPlace] = React.useState('')
    
    function handlePlaceInput(e) {
        setPlace(e.target.value)
    }

    function handleLinkInput(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: place,
            link: link
        })
        setLink('')
        setPlace('')
   }

    return(
        <PopupWithForm
          name="new-element"
          title="Новое место"
          isOpen={isOpen}
          onClose={onClose}
          buttonText="Добавить"
          onSubmit={handleSubmit}
        >
          <fieldset className="form__fieldset">
            <input
              value={place}
              onChange={handlePlaceInput}
              name="place"
              id="place"
              className="form__input form__input_type_place"
              type="text"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span id="place-error" className="form__error"></span>
            <input
              value={link}
              onChange={handleLinkInput}
              name="link"
              id="link"
              className="form__input form__input_type_link"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span id="link-error" className="form__error"></span>
          </fieldset>
        </PopupWithForm>
    )
}
export default AddPlacePopup;