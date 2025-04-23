import React, { FormEvent, ChangeEvent } from "react";
import styles from "./CreatePost.module.css";

interface CreatePostFormProps {
  onSubmit: (formData: {
    title: string;
    type: string;
    banner: File | null;
    description: string;
  }) => void;
  onCancel?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);

    const rawBanner = formData.get("banner");
    const bannerFile = rawBanner instanceof File ? rawBanner : null;
  
    onSubmit({
      title: formData.get("title") as string,
      type: formData.get("type") as string,
      banner: bannerFile,
      description: formData.get("description") as string,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
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
          {onCancel && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
          <button type="submit" className={styles.submitBtn}>
            Postar!
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;