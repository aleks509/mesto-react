import React from 'react';
function PopupWithForm(props) {
    
    return (
        <div className={`popup popup_type_${props.name}`}>  
          <div className="popup__container" >
            <button type="button" className="popup__button-close" aria-label="Закрыть"></button>
            <h3 className="popup__title">{props.title}</h3>
            <form className="form" name={`form-${props.name}`} noValidate>
            {props.children}
              <button  type="submit" className="form__button-save">Сохранить</button>
            </form>
          </div>
        </div>
    )

}
export default PopupWithForm;

// «Редактировать профиль»
// «Новое место»
// «Обновить аватар»
// «Вы уверены?»
// Вся общая разметка должна оказаться в новом компоненте. 
// Извне должны будут передаваться только текст заголовка
//  и идентификатор формы (в виде строк).
//   Для этого добавьте соответствующие пропсы title и name
//    и подставляйте их значения в JSX.