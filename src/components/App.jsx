import React from "react";
import "../index.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useState, useEffect } from "react";
import api from "../utils/Api.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
// import InfoTooltip from "./InfoTooltip"
import auth from "../utils/Auth";

function App() {
  // переменные состояния
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [stateCards, setStateCards] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setloggedIn] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error);
  }, [stateCards]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        // console.log(data)
        setCurrentUser(data);
      })
      .catch(console.error);
  }, []);

  // проверка токена
  const authorization = (jwt) => {
    if (jwt) {
      auth.tockenCheck(jwt).then((res) => {
        if (res) {
          console.log(res);
          setloggedIn(true);
          navigate("/", { replace: true})
        }
      });
    }
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    authorization(jwt);
  });
  // обработчики

  function handleRegister({ email, password }) {
    console.log(email, password);
    return auth.register(email, password).then((res) => {
      if (res) {
        return res;
      } else {
        throw new Error("Некорректно заполнено одно из полей");
      }
    });
  }

  function handleLogin({  password, email }) {
    console.log(password, email);
    return auth.authorize(password, email).then((res) => {
      // if (!res) {
      //   throw new Error("пользователь с email не найден");
      // }
      if (res.jwt) {
        localStorage.setItem("jwt", res.jwt);
        setloggedIn(true);
        return res;
      }
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    // console.log(name, link)
    api
      .addNewCard(name, link)
      .then((newCard) => {
        // console.log(newCard)
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({ avatar }) {
    // console.log(avatar)
    api
      .changeAvatar(avatar)
      .then((resp) => {
        setCurrentUser(resp);
        // console.log(resp)
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      // console.log(name, about)
      .then((editedData) => {
        setCurrentUser(editedData);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    // console.log(card._id)
    api
      .deleteCard(card._id)
      .then(() => {
        setStateCards((arrayCards) => {
          arrayCards.filter((c) => c._id !== card._id);
        });
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) =>
        setStateCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch(console.error);
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
          <Routes>
            <Route
                path="/"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    component={Main}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />}
              />
              <Route
                path="/sign-up"
                element={
                  <Register
                    onRegister={handleRegister}
                    title="Регистрация"
                    buttonText="Зарегистрироваться"
                    message="Уже зарегистрированы? Войти"
                  />
                }
              />
              <Route
                path="/sign-in"
                element={
                  <Login
                    onLogin={handleLogin}
                    title="Вход"
                    buttonText="Войти"
                  />
                }
              />
              
              {/* <Route 
              path="*" 
              element={<Navigate replace to="/sign-in" />} /> */}
          </Routes>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
        </div>
        {/* <InfoTooltip /> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
