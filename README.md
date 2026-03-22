# Portfolio - Alaric (Aman Kumar)

A modern, interactive, and fully responsive 3D portfolio website built with React, Vite, Tailwind CSS, Three.js, and Framer Motion. 

## ✨ Features

- **3D Interactive Elements**: Built with Three.js and React Three Fiber to provide an immersive experience.
- **Smooth Animations**: Page transitions and scroll animations powered by Framer Motion.
- **DSA & Problem Solving Section**: Dynamically fetches and displays live coding statistics from platforms like LeetCode, Codeforces, CodeChef, and HackerRank.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Modern UI/UX**: Includes glassmorphism effects, neon glows, and a seamless theme toggle (Dark/Light mode).
- **Working Contact Form**: Integrated with EmailJS for direct messaging without a backend.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations**: Framer Motion, React Scroll
- **Icons**: React Icons
- **Email Service**: EmailJS

## 🚀 Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

You need Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Amankumar140/PORTFOLIO.git
   ```

2. Navigate into the project directory:
   ```bash
   cd PORTFOLIO/portfolio
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables for EmailJS. Create a `.env` file in the root of the React project (`portfolio/`) and add:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

- `portfolio/src/components/` - Reusable UI components (Navbar, Cards, etc.)
- `portfolio/src/sections/` - Major page sections (Hero, About, Skills, Projects, DSA, Contact)
- `portfolio/src/utils/` - Utility functions and API integrations (e.g., EmailJS)
- `portfolio/src/assets/` - Static assets like images and 3D models

## 🧑‍💻 Author

**Aman Kumar**
- GitHub: [@Amankumar140](https://github.com/Amankumar140)

## 📝 License

This project is open-source and available under the MIT License.
