import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import volunteers from "../../assets/background.png";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((s) => !s);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((s) => !s);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const data: RegisterData = { username, email, password };

    try {
      const response = await axios.post<string>(
        "http://localhost:8000/api/auth/signup/",
        data
      );
      console.log("Usuário criado com ID:", response.data);

      navigate("/home");
    } catch (err: any) {
      console.error("Erro ao cadastrar:", err);
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Não foi possível cadastrar, tente novamente.";
      alert(msg);
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
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className={styles.inputContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <p className={styles.registerLink}>
            Já possui conta? <Link to="/login">Entrar</Link>
          </p>

          <button type="submit">CADASTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default Register;