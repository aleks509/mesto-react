import { useState } from "react";
import { Link,  } from "react-router-dom";

// для регистрации пользователя;
function Register({  onRegister, title, buttonText, message }) {
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
    onRegister({ email, password })
  };

  return (
    <form onSubmit={handleSubmit} className="registration__form">
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
        <Link to="/sign-in" className="registration__link">
          {message}
        </Link>
      </div>
    </form>
  );
}
export default Register;
