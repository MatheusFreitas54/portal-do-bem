# 🌍 Portal do Bem

Plataforma web que centraliza ações sociais — adoção de animais, projetos comunitários, campanhas de arrecadação, entre outros — conectando quem precisa de ajuda a quem quer ajudar.

## 📁 Estrutura do Projeto

```
.
├── README.md
├── backend
    ├── .example.env
    ├── .gitignore
    ├── Dockerfile.back
    ├── auth.py
    ├── config.py
    ├── main.py
    ├── models
    │   ├── __init__.py
    │   ├── base.py
    │   ├── post.py
    │   ├── py_object_id.py
    │   ├── token.py
    │   └── user.py
    ├── repositories
    │   ├── __init__.py
    │   ├── base_repo.py
    │   ├── post_repo.py
    │   └── user_repo.py
    ├── requirements.txt
    └── routers
    │   ├── __init__.py
    │   ├── auth.py
    │   ├── post.py
    │   └── user.py
├── docker-compose.yml
└── frontend
    ├── .gitignore
    ├── Dockerfile.front
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
        └── vite.svg
    ├── src
        ├── App.tsx
        ├── assets
        │   ├── Montserrat-Regular.ttf
        │   ├── background.png
        │   ├── logo.png
        │   └── user.png
        ├── components
        │   ├── Carousel
        │   │   ├── Carousel.module.css
        │   │   └── Carousel.tsx
        │   ├── CreatePost
        │   │   ├── CreatePost.module.css
        │   │   └── CreatePost.tsx
        │   ├── Dashboard
        │   │   ├── Dashboard.module.css
        │   │   └── Dashboard.tsx
        │   ├── EventCard
        │   │   ├── EventCard.module.css
        │   │   └── EventCard.tsx
        │   ├── EventList
        │   │   ├── EventList.module.css
        │   │   └── EventList.tsx
        │   ├── Home
        │   │   ├── Home.module.css
        │   │   └── Home.tsx
        │   ├── Login
        │   │   ├── Login.tsx
        │   │   └── login.module.css
        │   └── NavBar
        │   │   ├── NavBar.module.css
        │   │   └── NavBar.tsx
        ├── index.css
        ├── main.tsx
        └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts

```

---

## 🚀 Funcionalidades

- 📰 **Feed Social** filtrável por categoria & localização  
- 📝 **CRUD de Publicações** com editor rich‑text e upload de mídias  
- 💬 **Contato Direto** via WhatsApp ou e‑mail  
- 📊 **Dashboard** com estatísticas de alcance (views, cliques, shares)  
- 🔐 **Autenticação** (e‑mail/senha ou OAuth Google/Facebook)  
- 🛡 **Painel Admin** para moderação de conteúdo e analytics globais 

---

## 🛠️ Stack & Execução

---

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Front‑end  | React 18 (Vite/Next.js), Tailwind, Vite |
| Back‑end   | Python 3.11 · FastAPI · Motor (Mongo)   |
| Banco      | MongoDB Atlas / Docker                  |
| Autenticação | JWT + OAuth (Google / Facebook)       |

---

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MatheusFreitas54/pipeline_data.git
   cd pipeline_data
   ```
   
2. **Suba tudo com Docker (recomendado)**

   ```bash
   docker compose up -d --build
   ```

3. **Rodar localmente sem Docker (opcional)**

   `FrontEnd`

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   `Backend`

   ```bash
   cd backend
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

---

## 🧠 Conceitos Utilizados

   - Clean Architecture dividindo camadas API / Service / Repository
   - ODM Pydantic + Motor para tipagem forte e acesso assíncrono ao MongoDB
   - React Hooks e Context API para estado global (auth, toast, etc.)
   - Testes automatizados: pytest (backend) · vitest/react‑testing‑library (frontend)
   - CI/CD GitHub Actions com lint, testes e deploy Docker

---

## 🔧 Melhorias Futuras

   - Notificações em tempo real (WebSockets + Push)
   - Busca full‑text com MongoDB Atlas Search
   - Integração com serviços de pagamento para doações diretas

---

## Autores

Desenvolvido por Grupo 1 - Bootcamp ™