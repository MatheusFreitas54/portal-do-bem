import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate e Link para navegação
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import volunteers from "../../assets/background.png";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Senha:", password);

    if (email === "teste@email.com" && password === "123456") {
      navigate("/home");
    } else {
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img
        src={volunteers}
        alt="Voluntários"
        className={styles.backgroundImage}
      />

      <div className={styles.loginCard}>
        <img src={logo} alt="Portal do Bem" className={styles.logo} />
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className={styles.inputIcon} />
          </div>

          <div className={styles.inputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <p className={styles.registerLink}>
            Não possui conta? <Link to="/register">Cadastre-se</Link>
          </p>

          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
