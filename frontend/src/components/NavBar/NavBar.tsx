import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import CreatePostForm from "../CreatePost/CreatePost";

const NavBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Pesquisar:", searchTerm);
  };

  const handlePostCancel = () => setShowForm(false);

  const handlePostSubmit = (data: any) => {
    console.log("Post criado:", data);
    setShowForm(false);
  };

  const handleUserClick = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => navigate("/");

  return (
    <nav className={styles.navBar}>
      
      <div className={styles.leftSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </form>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
      </button>

      <div className={styles.rightSection}>
        <button onClick={() => setShowForm(true)} className={styles.newPostButton}>
          Nova Postagem
        </button>
        <FaUserCircle
          className={styles.userIcon}
          onClick={handleUserClick}
          title="Meu Dashboard"
        />
      </div>
      
      {showForm && (
        <CreatePostForm
          onSubmit={handlePostSubmit}
          onCancel={handlePostCancel}
        />
      )}
    </nav>
  );
};

export default NavBar;
