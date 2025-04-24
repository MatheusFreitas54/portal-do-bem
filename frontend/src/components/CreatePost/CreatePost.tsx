<<<<<<< HEAD
import React, { FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
=======
// import React, { FormEvent, ChangeEvent } from "react";
import React, { FormEvent } from "react";
>>>>>>> bcdccb311b2915a48365068002396b6bded25036
import styles from "./CreatePost.module.css";

interface CreatePostProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCancel, onSubmit }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token") || "";
  const userId = localStorage.getItem("user_id") || "";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const rawBanner = formData.get("banner");
    const bannerFile = rawBanner instanceof File ? rawBanner : null;

    const body = {
      title,
      content: description,
      user_id: userId,
    };

    try {
      const response = await axios.post<string>(
        "http://localhost:8000/posts/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post criado com ID:", response.data);
      navigate("/posts");
    } catch (error: any) {
      console.error("Erro ao criar post:", error);
      const msg =
        error.response?.data?.detail ||
        error.message ||
        "Não foi possível criar o post.";
      alert(msg);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Opcional: implementar preview ou validação do arquivo
    console.log(e.target.files);
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Criação de Postagem</h2>

        <label className={styles.label} htmlFor="title">
          Nome do Evento
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={styles.input}
          placeholder="Digite o nome..."
          required
        />

        <label className={styles.label} htmlFor="type">
          Tipo do Evento
        </label>
        <input
          id="type"
          name="type"
          type="text"
          className={styles.input}
          placeholder="Digite o tipo..."
          required
        />

        <label className={styles.label} htmlFor="banner">
          Banner
        </label>
        <div className={styles.fileWrapper}>
          <input
            id="banner"
            name="banner"
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
            required
          />
          <span className={styles.fileLabel}>Importe um Arquivo ⬆️</span>
        </div>

        <label className={styles.label} htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          placeholder="Digite uma descrição..."
          rows={5}
          required
        />

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitBtn} onClick={onSubmit}>
            Postar!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
