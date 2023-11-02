import React from 'react';
import KustoAvatar from '../images/JIKusto.png'

function handleEditProfileClick() {
    document.querySelector('.popup_type_about').classList.add('popup_opened')
}

function handleEditAvatarClick() {
    document.querySelector('.popup_type_change-avatar').classList.add('popup_opened')
}

function handleAddPlaceClick() {
    document.querySelector('.popup_type_new-element').classList.add('popup_opened')
}

function Main() {
    return (
        <main className="content">
        <section className="profile">
          <div className="profile__avatar-profile-container">
            <div className= "profile__avatar">
              <button onClick={handleEditAvatarClick} type="button" className="profile__avatar-edit-button" aria-label="Добавить"></button>
              <img className="profile__photo" src={KustoAvatar} alt="фото Ж.-И.Кусто"/>
            </div>
            <div className="profile__profile-info">
              <div className="profile__wrap">
                <h1 className="profile__title">Жак-Ив Кусто</h1>
                <button onClick={handleEditProfileClick} type="button" className="profile__edit-button" aria-label="Редактирование"></button>
              </div>
              <p className="profile__subtitle">Исследователь океана</p>
            </div>
        </div>
          <button onClick={handleAddPlaceClick}  type="button" className="profile__add-button" aria-label="Добавить"></button>
        </section>
        <section className="elements" aria-label="Фотографии пользователя"></section>
      </main>
    );
  }
    
  export default Main;