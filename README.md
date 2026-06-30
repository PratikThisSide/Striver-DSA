<div align="center">
  <br/>
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&duration=2500&pause=500&color=22C55E&center=true&vCenter=true&width=600&lines=striver-dsa;Striver+A2Z+Roadmap;LeetCode-Style+Practice;Java+%7C+Monaco+%7C+Judge0" alt="Typing SVG" />
  <br/><br/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Monaco-FFBE00?style=for-the-badge&logo=visualstudiocode&logoColor=white" />
  <br/><br/>

  ![GitHub Repo stars](https://img.shields.io/github/stars/yourusername/dsa-mastery?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/yourusername/dsa-mastery?style=social)
  ![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/dsa-mastery)
  ![GitHub license](https://img.shields.io/github/license/yourusername/dsa-mastery)
  <br/><br/>

  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%" />
</div>

<br/>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-deployment">Deployment</a>
</p>

<br/>

## 🚀 Features

<table>
  <tr>
    <td width="50%">
      <h3>📚 Structured Roadmap</h3>
      <p>15 topics across 3 levels — from Time Complexity to Tries. Each topic has theory pages with definitions, analogies, code examples, complexity analysis, edge cases, and dry-run walkthroughs.</p>
    </td>
    <td width="50%">
      <h3>💻 In-Browser Code Editor</h3>
      <p>Monaco Editor (VS Code engine) with Java syntax highlighting. Run code against sample test cases or submit against hidden test cases via Judge0.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📊 Progress Tracking</h3>
      <p>Local-only progress via localStorage — solved problems, topic completion %, daily streak counter. No login required.</p>
    </td>
    <td width="50%">
      <h3>🌙 LeetCode-Style UI</h3>
      <p>Dark theme, collapsible sidebar with level-grouped navigation, progress bars, difficulty tags, and a split-pane editor layout.</p>
    </td>
  </tr>
</table>

<br/>

## 🗺️ Roadmap

<div align="center">

| Level | Topics | Status |
|-------|--------|--------|
| **1 — Basics** | Time Complexity, Arrays Basics, Recursion Basics | ✅ |
| **2 — Intermediate** | Sorting, Binary Search, Strings, Linked List, Stack & Queue | ✅ |
| **3 — Advanced** | Trees, BST, Heaps, Graphs, Greedy, DP, Tries | ✅ |

</div>

<br/>

## 🛠️ Tech Stack

<div align="center">

```
Frontend         │  React 18 + Vite + Tailwind CSS + Framer Motion + Monaco Editor
Backend          │  Node.js + Express
Database         │  SQLite (via Sequelize ORM)
Code Execution   │  Judge0 CE (RapidAPI or self-hosted Docker)
```

</div>

<br/>

## ⚡ Quick Start

```bash
# 1. Clone
git clone https://github.com/yourusername/striver-dsa.git
cd striver-dsa

# 2. Backend
cd backend
npm install
npm run seed        # Creates database + populates 15 topics + 4 problems
npm run dev         # Starts on :5000

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev         # Starts on :3000

# 4. Open http://localhost:3000 🎉
```

> **Note:** Code execution (Run/Submit) requires Judge0. See [DEPLOYMENT.md](./DEPLOYMENT.md) for setup.

<br/>

## 📁 Project Structure

```
striver-dsa/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── models/          # Sequelize models (Topic, Problem, Progress)
│   ├── routes/          # Express routes
│   ├── services/        # Judge0 execution service
│   ├── db.js            # Sequelize connection
│   ├── seed.js          # Database seeder
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Sidebar, Header, ProblemList, ProgressBar, OutputPanel
│   │   ├── pages/       # Home, TopicPage, ProblemPage, TheoryDetail
│   │   ├── editor/      # Monaco Editor wrapper
│   │   └── services/    # API client, localStorage progress
│   ├── index.html
│   └── package.json
├── DEPLOYMENT.md
└── README.md
```

<br/>

## 🌐 Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com) / [Railway](https://railway.app)
- **Database** → SQLite (file-based, no external DB needed)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full setup instructions.

<br/>

## 📝 Sample Problems

| # | Problem | Difficulty | Topic |
|---|---------|-----------|-------|
| 1 | [Two Sum](./frontend/src/pages/ProblemPage.jsx) | 🟢 Easy | Arrays Basics |
| 2 | [Reverse an Array](./frontend/src/pages/ProblemPage.jsx) | 🟢 Easy | Arrays Basics |
| 3 | [Binary Search (Find Target)](./frontend/src/pages/ProblemPage.jsx) | 🟢 Easy | Binary Search |
| 4 | [First and Last Position](./frontend/src/pages/ProblemPage.jsx) | 🟡 Medium | Binary Search |

Each problem includes: brute-force solution, optimal solution, and step-by-step explanation.

<br/>

## 📄 License

MIT © 2024

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png" width="100%" />
  <br/><br/>
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=100&color=22C55E&center=true&vCenter=true&width=400&lines=Happy+Coding!+%F0%9F%9A%80;Master+DSA+One+Topic+at+a+Time" alt="Footer Typing SVG" />
  <br/><br/>
  <sub>Built with ❤️ for the DSA community</sub>
</div>
