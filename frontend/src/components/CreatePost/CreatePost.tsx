import React, { FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../../appwrite";
import styles from "./CreatePost.module.css";

interface CreatePostProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || "";

const CreatePost: React.FC<CreatePostProps> = ({ onCancel }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id") || "";
  const token = localStorage.getItem("token") || "";
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const body: any = {
      title,
      content: description,
      user_id: userId,
    };

    try {
      const response = await axios.post<{ id: string }>(
        "http://localhost:8000/api/posts/",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        }
      );
      const postId = response.data.id;
      console.log("Post criado com ID:", postId);

      if (bannerFile) {
        const ext = bannerFile.name.split(".").pop() || "";
        const sanitizedTitle = title.trim().replace(/\s+/g, "_").toLowerCase();
        const filename = `${sanitizedTitle}.${ext}`;

        const uploadResponse = await storage.createFile(
          bucketId,
          filename,
          bannerFile
        );
        console.log("Upload realizado:", uploadResponse);
      }

      navigate("/home");
    } catch (error: any) {
      console.error("Erro ao criar post:", error);
      const msg =
        error.response?.data?.detail ||
        error.message ||
        "Não foi possível criar o post.";
      alert(msg);
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Criação de Postagem</h2>

        <label className={styles.label} htmlFor='title'>
          Nome do Evento
        </label>
        <input
          id='title'
          name='title'
          type='text'
          className={styles.input}
          placeholder='Digite o nome...'
          required
        />

        <label className={styles.label} htmlFor='type'>
          Tipo do Evento
        </label>
        <input
          id='type'
          name='type'
          type='text'
          className={styles.input}
          placeholder='Digite o tipo...'
          required
        />

        <label className={styles.label} htmlFor='banner'>
          Banner
        </label>
        <div className={styles.fileWrapper}>
          <input
            id='banner'
            name='banner'
            type='file'
            accept='image/*'
            className={styles.fileInput}
            onChange={handleFileChange}
            required
          />
          <span className={styles.fileLabel}>Importe um Arquivo ⬆️</span>
        </div>

        {previewUrl && (
          <div className={styles.previewWrapper}>
            <img
              src={previewUrl}
              alt='Preview do banner'
              className={styles.previewImage}
            />
          </div>
        )}

        <label className={styles.label} htmlFor='description'>
          Descrição
        </label>
        <textarea
          id='description'
          name='description'
          className={styles.textarea}
          placeholder='Digite uma descrição...'
          rows={5}
          required
        />

        <div className={styles.actions}>
          <button type='button' className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button type='submit' className={styles.submitBtn}>
            Postar!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
