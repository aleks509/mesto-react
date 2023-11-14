import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx"


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
 
  const currentUser = React.useContext(CurrentUserContext);
// проверка id для отображения корзины
  const isOwn = card.owner._id === currentUser._id
 
  //  Определяем, есть ли у карточки лайк, 
  // поставленный текущим пользователем
  const isLiked = card.likes.some(item => item._id === currentUser._id);
 
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}` 
    );


//обработчики
  function handleDeleteClick() {
    onCardDelete(card)
    
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
    // console.log(card.likes)
  }

  return (
    <article className="element">
      {isOwn && <button
        onClick={handleDeleteClick}
        className="element__trash"
        type="button"
        aria-label="Корзина"
      ></button>}
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="element__image"
      />
      <div className="element__inner">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-box">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="element__likemeter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
