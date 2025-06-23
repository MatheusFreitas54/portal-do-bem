import React from "react";
import styles from "./Postcard.module.css";
import { Post } from "../../types/Post";
import { storage } from "../../appwrite";

const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || "";

interface Props {
  post: Post;
  onClick: () => void
}

const PostCard: React.FC<Props> = ({ post, onClick }) => {
  return (
    <div key={post._id} className={styles.card} onClick={onClick}>
      <img
        src={storage.getFileDownload(bucketId, `${post._id}`)}
        alt={post.title}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{post.title}</h3>
      </div>
    </div>
  );
};

export default PostCard;
