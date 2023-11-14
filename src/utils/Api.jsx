const oneError = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    Promise.reject(`Что-то пошло не так: ${response.status}`)
  }
}
 class Api {
  constructor({ url, headers}) {
    this._url = url //https://mesto.nomoreparties.co/v1/cohort-77
    this._headers = headers
  }
// /users/me
  getUserInfo() {
     return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then((response) => oneError(response))

  }

  // /cards
  getCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
      .then((response) => oneError(response))
   }

// /users/me
  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
    .then((response) => oneError(response))
    }

    //  /cards
  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
  })
  .then((response) => oneError(response))
  }

// /cards/cardId - вместо cardId подставляем  параметр _id карточки, которую нужно удалить

  deleteCard(cardId) {
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then((response) => oneError(response))
}



changeLikeCardStatus(cardId, isLiked) {
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    method: `${isLiked ? 'PUT' : 'DELETE'}`,
    headers: this._headers,
    body: JSON.stringify({ cardId, isLiked})
  })
  .then((response) => oneError(response))
}

// /users/me/avatar
  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${link}`
      })
    })
    .then((response) => oneError(response))
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'f7b5bbba-2a09-453b-983e-947bcdc15520',
    'Content-Type': 'application/json'
}
})

export default api;