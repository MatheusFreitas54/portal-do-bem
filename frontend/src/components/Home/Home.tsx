import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../appwrite";
import Carousel from "../Carousel/Carousel";
import styles from "./Home.module.css";
import { Post } from "../../types/Post";



const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || "";

const Home: React.FC = () => {
  const navigate = useNavigate();
  

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Post[]>("http://localhost:8000/api/posts/")
      .then(res => setPosts(res.data))
      .catch(err => console.error("Erro ao buscar posts:", err))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts.slice(0, 5);
  const recent = posts.slice(5);

  const getImageUrl = (post: Post) => {
    return storage.getFileDownload(bucketId, `${post._id}`);
  };

  return (
    <>
      <div className={styles.carouselWrapper}>
        <Carousel />
      </div>

      <main className={styles.main}>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>Posts em Destaque</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : featured.length === 0 ? (
            <p>Nenhum post encontrado.</p>
          ) : (
            <div className={styles.eventsGrid}>
              {featured.map(post => (
                <div key={post._id} className={styles.card} onClick={() => navigate(`/post/${post._id}`)}>
                  <img
                    src={getImageUrl(post)}
                    alt={post.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Grid responsivo */}
        {/* <section className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>Outros Posts</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : recent.length === 0 ? (
            <p>Nenhum post encontrado.</p>
          ) : (
            <div className={styles.recentGrid}>
              {recent.map(post => (
                <div key={post._id} className={styles.card}>
                  <img
                    src={getImageUrl(post.title)}
                    alt={post.title}
                    className={styles.cardImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x200.png?text=Sem+Imagem";
                    }}
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardDescription}>{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section> */}
      </main>
    </>
  );
};

export default Home;
