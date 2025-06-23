import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Post.module.css";
import api from "../../api";
import { Post } from "../../types/Post";
import { ContentRenderer } from "../RichTextEditor/ContentRenderer";

const PostComponent: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<Post>();
  const bannerUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZBRvZsXEf02-Ao0PlrNzak3GhFfS9yrq4AA&s";

  useEffect(() => {
    if (!params.id || post) return;

    api.post.getPostByID(params.id).then((post) => {
      setPost({...post, content: JSON.parse(post.content)})
    });
  });

  useEffect(() => {
    console.log(post)
  }, [post])

  return (
    <>
      {post && (
        <article className={styles.article}>
          <h1>{post.title}</h1>
          {bannerUrl && (
            <img src={bannerUrl} alt="Banner do post" className={styles.postBanner} />
          )}
          <div className={styles.postContent}>
            <ContentRenderer content={post.content} />
          </div>
        </article>
      )}
    </>
  );
};

export default PostComponent;
