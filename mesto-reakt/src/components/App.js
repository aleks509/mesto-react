import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="page">
      <div className="page__container">
      <Header />
      <Main />
      <Footer /> 
        </div>
        {/* popup edit profile */}
        <div className="popup popup_type_about">
          <div className="popup__container" >
            <button type="button" className="popup__button-close" aria-label="Закрыть"></button>
            <h3 className="popup__title">Редактировать профиль</h3>
            <form className="form" name="form-about" noValidate>
            <fieldset className="form__fieldset">
              <input name="name" id="name" className="form__input form__input_type_name" type="text"
              placeholder="Имя" required minLength="2" maxLength="40"/>
              <span id="name-error" className="form__error"></span> 
              <input name="about" id="about" className="form__input form__input_type_about" type="text" placeholder="О себе"
              required minLength="2" maxLength="200"/>
              <span id="about-error" className="form__error"></span> 
            </fieldset>
              <button  type="submit" className="form__button-save">Сохранить</button>
            </form>
          </div>
        </div>
      {/* popup add new element */}
        <div className="popup popup_type_new-element">
          <div className="popup__container" >
            <button type="button" className="popup__button-close" aria-label="Закрыть"></button>
            <h3 className="popup__title">Новое место</h3>
            <form className="form form-new-element" name="form-new-element" noValidate>
              <fieldset className="form__fieldset">
                  <input name="place" id="place" className="form__input form__input_type_place" type="text"
                  placeholder="Название" required minLength="2" maxLength="30"/>
                  <span id="place-error" className="form__error"></span>
                  <input name="link" id="link" className="form__input form__input_type_link" type="url"
                  placeholder="Ссылка на картинку" required/>
                  <span id="link-error" className="form__error"></span>
              </fieldset>
                  <button type="submit" className="form__button-save">Создать</button>
            </form>
          </div>
        </div>
        {/* popup view photo */}
        <div className="popup popup_type_view-photo">
          <div className="popup__view-container">
            <button type="button" className="popup__button-close" aria-label="Закрыть"></button>
            <img src="." className="popup__photo" alt=""/>
            <h3 className="popup__photo-title">-</h3>
          </div>
        </div>
        {/* popup delete photo */}
        <div className= "popup popup_type_delete-photo">
          <div className="popup__delete-container">
            <button type="button" className="popup__button-close" aria-label="Закрыть"></button>
            <h3 className="popup__confirmation">Вы уверены?</h3>
            <button type="submit" className="popup__button-yes">Да</button>
          </div>
        </div>
          {/* popup chenge avatar */}
          <div className= "popup popup_type_change-avatar">
            <div className="popup__cnange-container">
              <button type="button" className="popup__button-close" aria-label="Закрыть"></button>
              <h3 className="popup__confirmation">Обновить аватар</h3>
              <form className="form form-new-avatar" name="form-new-avatar" noValidate>
                <input name="avatar" id="avatar" className="form__input" type="url"
                placeholder="Ссылка на новое фото" required/>
                <span id="avatar-error" className="form__error"></span>
                <button type="submit" className="form__button-save">Сохранить</button>
            </form>
            </div>
          </div>
        {/* template */}
        <template className="element-template">
          <article className="element">
            <button className="element__trash" type="button" aria-label="Корзина"></button>
            <img src="./images/Elbrus.png" alt="" className="element__image"/>
            <div className="element__inner">
            <h2 className="element__title"></h2>
            <div className="element__like-box">
            <button className="element__like" type="button" aria-label="Нравится"></button>
            <span className="element__likemeter"></span>
            </div>
          </div>
        </article>
        </template>
    </div>
  );
}

export default App;
