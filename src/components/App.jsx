import React from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useState, useEffect } from "react";
import api from "../utils/Api.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx"

function App() {
  // переменные состояния
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({})
  const [stateCards, setStateCards] = React.useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch(console.error)
  }, [])

  // обработчики 
  
  function handleCardDelete(card) {
    // console.log(card._id)
    api.deleteCard(card._id)
      .then(() => {
        setStateCards((arrayCards) => {
          arrayCards.filter((c) => c._id !== card._id)
        })
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setStateCards((state) =>
        state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            card={stateCards}
            onCardDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>

        <PopupWithForm
          name="about"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Изменить"
        >
          <input
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

        <PopupWithForm
          name="new-element"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Добавить"
        >
          <fieldset className="form__fieldset">
            <input
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
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
            name="avatar"
            id="avatar"
            className="form__input"
            type="url"
            placeholder="Ссылка на новое фото"
            required
          />
          <span id="avatar-error" className="form__error"></span>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
