// src/components/Dashboard/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./Dashboard.module.css";
import userPlaceholder from "../../assets/user.png";
import EventCard, { Event } from "../EventCard/EventCard";
import CreatePostForm from "../CreatePost/CreatePost";
import axios from "axios";
import { storage } from "../../appwrite";

const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || "";
const API_URL = "http://localhost:8000/api";

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const [userInfo, setUserInfo] = useState<{
    username: string;
    email: string;
    id: string;
  }>({
    username: "",
    email: "",
    id: "",
  });

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [userPosts, setUserPosts] = useState<Event[]>([]);
  const navigate = useNavigate();

  const fetchProfileImageUrl = async (username: string) => {
    const sanitized = username.trim().replace(/\s+/g, "_").toLowerCase();
    const fileId = `${sanitized}.jpg`;

    try {
      const url = storage.getFileDownload(bucketId, fileId);
      setProfileImageUrl(url);
    } catch (err) {
      console.log("Nenhuma foto de perfil encontrada.", err);
      setProfileImageUrl(null);
    }
  };

  const handleProfileFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!userInfo.username) return;
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0];
    const ext = file.name.split(".").pop() || "jpg";
    const sanitized = userInfo.username
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();
    const fileId = `${sanitized}.${ext}`;

    try {
    
      await storage.createFile(bucketId, fileId, file);

      const url = storage.getFileDownload(bucketId, fileId);
      setProfileImageUrl(url);
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      alert("Falha ao enviar imagem. Tente novamente.");
    }
  };

  const handleDeleteProfileImage = async () => {
    if (!userInfo.username) return;
    const sanitized = userInfo.username
      .trim()
      .replace(/\s+/g, "_")
      .toLowerCase();
    const fileId = `${sanitized}.jpg`;

    try {
      await storage.deleteFile(bucketId, fileId);
      setProfileImageUrl(null);
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
      alert("Falha ao excluir imagem. Tente novamente.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async (res) => {
        const { username, email, _id } = res.data;
        setUserInfo({ username, email, id: _id });

        await fetchProfileImageUrl(username);

        axios
          .get(`${API_URL}/posts/`, {
            params: { user_id: _id },
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((postRes) => {
            const postsWithImages = postRes.data.map((post: any) => {
              const sanitizedTitle = post.title
                .trim()
                .replace(/\s+/g, "_")
                .toLowerCase();
              return {
                ...post,
                image: storage.getFileDownload(
                  bucketId,
                  `${sanitizedTitle}.jpg`
                ),
              };
            });
            setUserPosts(postsWithImages);
          })
          .catch((err) => {
            console.error("Erro ao buscar posts do usuário:", err);
          });
      })
      .catch((err) => {
        console.error("Erro ao buscar usuário:", err);
      });
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
                <img
                  src={profileImageUrl || userPlaceholder}
                  alt='avatar'
                  className={styles.avatar}
                />
                <div className={styles.username}>
                  {userInfo.username || "Carregando..."}
                </div>
                <div className={styles.email}>
                  {userInfo.email || "Carregando..."}
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleProfileFileChange}
                  />

                  {profileImageUrl && (
                    <button
                      style={{
                        marginLeft: "0.5rem",
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={handleDeleteProfileImage}
                    >
                      Excluir foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.stat}>
              <span className={styles.number}>{userPosts.length}</span>
              <span className={styles.label}>Posts</span>
            </div>
          </div>

          <button className={styles.newPost} onClick={() => setShowForm(true)}>
            Nova Postagem
          </button>
        </div>

        <section className={styles.postsSection}>
          <h2 className={styles.sectionTitle}>Meus Posts</h2>
          <div className={styles.postsGrid}>
            {userPosts.length === 0 ? (
              <p>Você ainda não tem posts.</p>
            ) : (
              userPosts.map((post) => <EventCard key={post._id} event={post} />)
            )}
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
