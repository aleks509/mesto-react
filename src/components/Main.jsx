import React from "react";
import KustoAvatar from "../images/JIKusto.png";
import { useState, useEffect, useContext } from "react";
import api from "../utils/Api.jsx";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx"

function Main({ onAddPlace, onEditAvatar, onEditProfile, onCardClick, onCardLike, card, onCardDelete}) {
  const [cards, setCards] = React.useState([]);
  // console.log(cards)

  const currentUserData = React.useContext(CurrentUserContext);


  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error)
  }, [card]);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-profile-container">
          <div className="profile__avatar">
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__avatar-edit-button"
              aria-label="Добавить"
            ></button>
            <img
              className="profile__photo"
              
              src={currentUserData.avatar}
              alt={currentUserData.name}
            />
          </div>
          <div className="profile__profile-info">
            <div className="profile__wrap">
              <h1 className="profile__title">{currentUserData.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"
                aria-label="Редактирование"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUserData.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="elements" aria-label="Фотографии пользователя">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              // {...item}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
        
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;