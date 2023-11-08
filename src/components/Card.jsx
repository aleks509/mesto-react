import React from 'react';

function Card ({ card, onCardClick }) {
    
  function handleClick() {
        onCardClick(card)
        // console.log(card)
      } 

    return (
      
    <article  className="element">
    <button className="element__trash" type="button" aria-label="Корзина"></button>
    <img onClick={handleClick} src={card.link} alt={card.name} className="element__image" />
    <div className="element__inner">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-box">
            <button className="element__like" type="button" aria-label="Нравится"></button>
        <span className="element__likemeter">{card.likes.length}</span>
        </div>
    </div>
  </article>
  
    ) 
}


export default Card;