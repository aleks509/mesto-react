const oneError = (response) => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }
  }
class Auth {
    constructor({ url, headers}) {
        this._url = url;
        this._headers = headers
    }

    register (email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
        .then((response) => oneError(response))
        
    }
    // обработку в реджистр и логин компонентах

    authorize (email, password ) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password  })
        })
        .then((response) => oneError(response))
    }

    tockenCheck (token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => oneError(response))
    }

}

const auth = new Auth({
    url: 'https://auth.nomoreparties.co',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default auth;
