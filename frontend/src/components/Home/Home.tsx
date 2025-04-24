import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Carousel from "../Carousel/Carousel";
import EventList from "../../components/EventList/EventList";
import { Event } from "../../components/EventCard/EventCard";
import EventCard from "../EventCard/EventCard";
import styles from "./Home.module.css";
// import { Event } from "../../types/Event";  // Ajuste o caminho conforme a localização da interface Event

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Feira de Adoção de Animais",
    image: "https://static-cse.canva.com/blob/1534627/eventocorporativo1.jpg",
    dateStart: "24 Jan",
    dateEnd: "25 Jan",
    location: "Rio de Janeiro / RJ",
    organizer: "Vivo Rio",
  },
  {
    id: "2",
    title: "Campanha de Vacinação",
    image: "https://www.icc.fiocruz.br/wp-content/uploads/2023/09/vacina.jpg",
    dateStart: "30 Jan",
    location: "São Paulo / SP",
    organizer: "Saúde SP",
  },
  {
    id: "3",
    title: "Campanha de Vacinação",
    image:
      "https://www.ongsehsocial.org.br/wp-content/uploads/2022/09/eventos.jpg",
    dateStart: "30 Jan",
    location: "São Paulo / SP",
    organizer: "Saúde SP",
  },
  {
    id: "4",
    title: "Campanha de Vacinação",
    image:
      "https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2022/10/Malawi_refeicoes.jpeg",
    dateStart: "30 Jan",
    location: "São Paulo / SP",
    organizer: "Saúde SP",
  },
  {
    id: "5",
    title: "Campanha de Vacinação",
    image:
      "https://lirp.cdn-website.com/9bf456c1/dms3rep/multi/opt/Eventos-para-ongs-feiras-300x200-640w.jpg",
    dateStart: "30 Jan",
    location: "São Paulo / SP",
    organizer: "Saúde SP",
  },
  {
    id: "6",
    title: "Campanha de Vacinação",
    image:
      "https://lirp.cdn-website.com/9bf456c1/dms3rep/multi/opt/Eventos-para-ongs-feiras-300x200-640w.jpg",
    dateStart: "30 Jan",
    location: "São Paulo / SP",
    organizer: "Saúde SP",
  },
];

const recentEvents: Event[] = [
  {
    id: "101",
    title: "Arrecadação de Roupas",
    image:
      "https://lirp.cdn-website.com/9bf456c1/dms3rep/multi/opt/Eventos-para-ongs-feiras-300x200-640w.jpg",
    dateStart: "05 Abr",
    location: "Belo Horizonte / MG",
    organizer: "Ajuda BH",
  },
  {
    id: "102",
    title: "Mutirão de Limpeza",
    image:
      "https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2022/10/Malawi_refeicoes.jpeg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "103",
    title: "Mutirão de Limpeza",
    image:
      "https://www.ongsehsocial.org.br/wp-content/uploads/2022/09/eventos.jpg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "104",
    title: "Mutirão de Limpeza",
    image:
      "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2024/02/mutirao.jpg?quality=70&strip=info&w=1024",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "105",
    title: "Mutirão de Limpeza",
    image: "https://static-cse.canva.com/blob/1534627/eventocorporativo1.jpg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
  {
    id: "106",
    title: "Mutirão de Limpeza",
    image: "https://static-cse.canva.com/blob/1534627/eventocorporativo1.jpg",
    dateStart: "10 Abr",
    location: "Curitiba / PR",
    organizer: "Verde Curitiba",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  return (
    <div className={styles.container}>
      <NavBar />

      <div className={styles.carouselWrapper}>
        <Carousel />
      </div>
      <main className={styles.main}>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
          <div className={styles.eventsGrid}>
            <EventList events={mockEvents} />
          </div>
        </section>

        <section className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>Eventos Recentemente Criados</h2>
          <div className={styles.recentGrid}>
            {recentEvents.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </footer>
    </div>
  );
};

export default Home;