// для авторизации пользователя.
// положить в пропсы onLogin
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function Login({ onLogin, title, buttonText }) {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");

  // const navigate = useNavigate();
  
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPasssword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password })
  };

  return (
    <form className="registration__form" onSubmit={handleSubmit}>
      <h2 className="registration__title">{title}</h2>
      <input
        value={email}
        onChange={handleEmailInput}
        id="email"
        type="email"
        placeholder="Email"
        className="registration__input"
      />
      <input
        value={password}
        onChange={handlePasswordInput}
        id="password"
        type="password"
        placeholder="password"
        className="registration__input"
      />
      <div className="registration__container">
        <button className="registration__button">{buttonText}</button>
      </div>
    </form>
  );
}

export default Login;
