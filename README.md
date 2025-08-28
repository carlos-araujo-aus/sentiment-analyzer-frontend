# AI Sentiment Analyzer - Frontend

This is the frontend for the AI Sentiment Analyzer project, a modern, responsive, and interactive Single-Page Application (SPA) built with React, TypeScript, and Vite. It provides the user interface for text analysis and data visualization.

**➡️ Live Demo: [YOUR_LIVE_DEMO_URL_HERE] ⬅️**

## ✨ Core Features

-   **Interactive Analysis Form**: A clean and simple `textarea` for users to input text, secured by a Google **reCAPTCHA v2** "I'm not a robot" widget to prevent automated abuse.
-   **Dynamic Data Visualization**:
    -   The overall sentiment is prominently displayed with a color-coded label and a precise score.
    -   An interactive **bar chart** (using Chart.js) provides a detailed breakdown of the detected emotions.
    -   Relevant keywords are rendered as styled tags for quick insights.
-   **Robust State Management**: Utilizes **Redux Toolkit** to predictably manage the application's global state, including the complete lifecycle of API requests (`loading`, `succeeded`, `failed`), providing a smooth and responsive user experience.
-   **Private Analysis History**: Displays a list of the user's recent analyses. This feature is powered by a backend **anonymous session system**, ensuring that each user's history is private and tied to their browser session.
-   **Modern & Responsive UI**: Designed with a **dark theme** and built with **Tailwind CSS**, the application is fully responsive and provides a polished user experience on desktop, tablet, and mobile devices.
-   **Professional UX**: Includes loading indicators, clear error messages, and an automatic history refresh after a successful analysis for a seamless workflow.

## 🛠️ Tech Stack

| Technology             | Purpose                                            |
| :--------------------- | :--------------------------------------------------- |
| **React**              | Core library for building the user interface.      |
| **TypeScript**         | For robust, type-safe code.                        |
| **Vite**               | Modern, fast build tool for frontend development.    |
| **Redux Toolkit**      | For predictable and efficient global state management. |
| **Tailwind CSS**       | A utility-first CSS framework for rapid UI design.   |
| **Chart.js**           | For creating interactive data visualizations.      |
| **Axios**              | HTTP client for making requests to the backend API.  |
| **react-google-recaptcha** | For integrating the reCAPTCHA v2 widget.     |

## 🚀 Getting Started

Follow these steps to run the frontend on your local machine.

### Prerequisites

-   Node.js (v18 or higher) and npm.
-   The [backend server](https://github.com/YOUR_USERNAME/sentiment-analyzer-backend) must be running locally.

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/sentiment-analyzer-frontend.git
    cd sentiment-analyzer-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    -   Create a `.env` file in the project root. You can use `.env.example` as a template.
    -   Fill in the required variables:
        ```env
        # The base URL where your local backend API is running
        VITE_API_BASE_URL="http://127.0.0.1:5001/api"

        # Your public site key from the Google reCAPTCHA admin console
        VITE_RECAPTCHA_SITE_KEY="your-recaptcha-public-site-key"
        ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the port specified by Vite).

## 🧰 Code Quality

This project enforces a high standard of code quality using modern tools:

-   **ESLint**: For static code analysis to find and fix problems.
-   **Prettier**: For automatic code formatting to ensure a consistent style.

-   **Check for linting errors**:
    ```bash
    npm run lint
    ```
-   **Automatically format all code**:
    ```bash
    npm run format
    ```
