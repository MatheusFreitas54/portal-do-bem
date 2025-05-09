import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import user from "../../assets/user.png";
import EventCard, { Event } from "../EventCard/EventCard";
import CreatePostForm from "../CreatePost/CreatePost";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const mockPosts: Event[] = [
  {
    id: "101",
    title: "Arrecadação de Roupas",
    image:
      "https://lirp.cdn-website.com/9bf456c1/dms3rep/multi/opt/Eventos-para-ongs-feiras-300x200-640w.jpg",
    dateStart: "05 Abr",
    location: "Belo Horizonte / MG",
    organizer: "Ajuda BH",
  },
  {
    id: "102",
    title: "Mutirão de Limpeza",
    image:
      "https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2022/10/Malawi_refeicoes.jpeg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "103",
    title: "Mutirão de Limpeza",
    image:
      "https://www.ongsehsocial.org.br/wp-content/uploads/2022/09/eventos.jpg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "104",
    title: "Mutirão de Limpeza",
    image:
      "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2024/02/mutirao.jpg?quality=70&strip=info&w=1024",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "105",
    title: "Mutirão de Limpeza",
    image: "https://static-cse.canva.com/blob/1534627/eventocorporativo1.jpg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "106",
    title: "Mutirão de Limpeza",
    image: "https://static-cse.canva.com/blob/1534627/eventocorporativo1.jpg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
];

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState<{ username: string; email: string }>(
    {
      username: "",
      email: "",
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/users/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const { username, email } = res.data;
          setUserInfo({ username, email });
        })
        .catch((err) => {
          console.error("Erro ao buscar usuário:", err);
        });
    }
  }, []);

  const handlePostSubmit = (data: any) => {
    console.log("Post criado:", data);
    setShowForm(false);
  };

  const handlePostCancel = () => setShowForm(false);
  const handleBackHome = () => navigate("/home");

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <button onClick={handleBackHome} className={styles.backButton}>
          ← Voltar à Home
        </button>

        <div className={styles.header}>
          <div className={styles.stats}>
            <div className={styles.profileInfo}>
              <div className={styles.profileHeader}>
                <img src={user} alt="avatar" className={styles.avatar} />
                <div className={styles.username}>
                  {userInfo.username || "Carregando..."}
                </div>
                <div className={styles.email}>
                  {userInfo.email || "Carregando..."}
                </div>
              </div>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>6</span>
              <span className={styles.label}>Posts</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>10</span>
              <span className={styles.label}>Follow</span>
            </div>
          </div>
          <button className={styles.newPost} onClick={() => setShowForm(true)}>
            Nova Postagem
          </button>
          <div className={styles.actions}>{/* actions */}</div>
        </div>

        <section className={styles.postsSection}>
          <h2 className={styles.sectionTitle}>Meus Posts</h2>
          <div className={styles.postsGrid}>
            {mockPosts.map((post) => (
              <EventCard key={post.id} event={post} />
            ))}
          </div>
        </section>
      </div>

      {showForm && (
        <CreatePostForm
          onSubmit={handlePostSubmit}
          onCancel={handlePostCancel}
        />
      )}
    </div>
  );
};

export default Dashboard;
