
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
    .then((response) => {
        return response.json()
    })
}
// обработку в реджистр и логин компонентах

authorize (password, email) {
    return fetch(`${this._url}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ password, email })
    })
    .then((response) => {
        return response.json()
    })
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
    .then(response => response.json())
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
