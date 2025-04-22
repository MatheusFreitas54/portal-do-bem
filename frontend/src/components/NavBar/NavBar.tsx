import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Pesquisar:", searchTerm);
  };

  const handleNewPost = () => {
    console.log("Nova postagem");
  };

  const handleUserClick = () => {
    navigate("/dashboard");
  };

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
      <div className={styles.rightSection}>
        <button onClick={handleNewPost} className={styles.newPostButton}>
          Nova Postagem
        </button>
        <FaUserCircle
          className={styles.userIcon}
          onClick={handleUserClick}
          title="Meu Dashboard"
        />
      </div>
    </nav>
  );
};

export default NavBar;
