import React, { FormEvent, ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../../appwrite";
import styles from "./UpdatePost.module.css";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { CustomElement } from "../RichTextEditor/editor.types";
import { Post } from "../../types/Post";

interface UpdatePostProps {
  onCancel: () => void;
  onSubmit: (data: Post) => void;
  toUpdate: Post;
}

const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || "";

const UpdatePost: React.FC<UpdatePostProps> = ({ onCancel, onSubmit, toUpdate }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id") || "";
  const token = localStorage.getItem("token") || "";
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editorValue, setEditorValue] = useState<CustomElement[]>(toUpdate.content);
  const [toUpdateCopy, setToUpdateCopy] = useState({...toUpdate});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={(ev) => {
        ev.preventDefault();
        
        onSubmit({...toUpdateCopy, content: editorValue});
        }}>
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
          value={toUpdateCopy.title}
          onChange={(ev) => setToUpdateCopy({...toUpdateCopy, title: ev.target.value})}
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
        <RichTextEditor value={editorValue} setValue={setEditorValue} />
        <div className={styles.actions}>
          <button type='button' className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button type='submit' className={styles.submitBtn}>
            Atualizar!
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
