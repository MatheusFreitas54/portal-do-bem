import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import logo from "../../assets/logo.png";
import volunteers from "../../assets/background.png";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const AUTH_URL = "http://localhost:8000/api/auth/token/";

interface MeResponse {
  _id: string;
  username: string;
  email: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () =>
    setShowPassword((v) => !v);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new URLSearchParams();
      form.append("grant_type", "password");
      form.append("username", username);
      form.append("password", password);

      const response = await axios.post<{
        access_token: string;
        token_type: string;
      }>(AUTH_URL, form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      axios.defaults.headers.common[
        "Authorization"
      ] = `${"bearer"} ${access_token}`;

      const meResp = await axios.get<MeResponse> ("http://localhost:8000/api/users/me/");
      console.log(meResp.data)
      localStorage.setItem("user_id", meResp.data._id);
      navigate("/home");
    } catch (err: any) {
      console.error("Erro ao efetuar login:", err);
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Falha na autenticação";
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