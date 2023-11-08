import React from "react";
import KustoAvatar from "../images/JIKusto.png";
import { useState, useEffect } from "react";
import api from "../utils/Api.jsx";
import Card from "./Card.jsx";

function Main({ onAddPlace, onEditAvatar, onEditProfile, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
        // console.log(cards)
      })
      .catch(console.error)
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        const userData = data;
        // console.log(userData)
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(console.error)
  }, []);
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
              
              src={userAvatar}
              alt={userName}
            />
          </div>
          <div className="profile__profile-info">
            <div className="profile__wrap">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"
                aria-label="Редактирование"
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
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
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;