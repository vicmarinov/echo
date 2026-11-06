# 💬 Echo

Echo is a minimalist **microblogging social platform** for sharing posts and engaging in community discussions in a clean, distraction-free environment. The app is an **educational project** developed as part of the [**React.js** course](https://softuni.bg/trainings/5151/reactjs-september-2026) at **[SoftUni](https://softuni.bg)**.

A fully functional, **deployed version** of the app is available at **[echo.vicmarinov.workers.dev](https://echo.vicmarinov.workers.dev)**.

![All posts feed view](./docs/screenshots/all-posts.png)

## 📖 Overview

- **Posts:** Browse a public feed of posts. Signed-in users can create posts and edit or delete **only their own**.
- **Comments:** Signed-in users can join the discussion on any post.
- **Profiles:** Every user has a profile page that lists their published posts.
- **Authentication:** Sign up and log in with Supabase Auth. Guests have read-only access.

A deeper description of the application's user access, authentication, routing, data operations, forms and validation, and the React techniques used is provided in the **[Functional Guide](./docs/functional-guide.md)**.

![Posts feed on mobile and post details](./docs/screenshots/all-posts-mobile-and-post-details.png)

## 🛠️ Technologies & Tools Used

- <img src="https://cdn.simpleicons.org/typescript?size=18"        alt="TypeScript logo"         /> TypeScript (language)
- <img src="https://cdn.simpleicons.org/react?size=18"             alt="React logo"              /> React (UI library)
- <img src="https://cdn.simpleicons.org/reactrouter?size=18"       alt="React Router logo"       /> React Router (routing)
- <img src="https://cdn.simpleicons.org/supabase?size=18"          alt="Supabase logo"           /> Supabase (database and authentication)
- <img src="https://cdn.simpleicons.org/zod?size=18"               alt="Zod logo"                /> Zod Mini (form validation)
- <img src="https://cdn.simpleicons.org/cssmodules/_/FFF?size=18"  alt="CSS Modules logo"        /> CSS Modules (styling)
- <img src="https://cdn.simpleicons.org/figma?size=18"             alt="Figma logo"              /> Figma (UX/UI design and prototyping)
- <img src="https://cdn.simpleicons.org/vite?size=18"              alt="Vite logo"               /> Vite (build tool)
- <img src="https://cdn.simpleicons.org/eslint?size=18"            alt="ESLint logo"             /> ESLint (linting)
- <img src="https://cdn.simpleicons.org/cloudflareworkers?size=18" alt="Cloudflare Workers logo" /> Cloudflare Workers (hosting)

## 🚀 How to Run

1. **Clone the repository** and navigate into the project directory:
    ```bash
    git clone https://github.com/vicmarinov/echo.git
    cd echo
    ```

2. **Install the dependencies** (requires [Node.js](https://nodejs.org)):
    ```bash
    npm install
    ```

3. **Configure the environment variables** in the [`.env`](./.env) file, using the credentials of your own [Supabase](https://supabase.com) project having the same database schema and authentication setup as the one in the deployed version. The [`.env`](./.env) file should look like this:
    ```env
    SUPABASE_PROJECT_ID="your-project-id"
    VITE_SUPABASE_URL="https://your-project-id.supabase.co"
    VITE_SUPABASE_KEY="your-publishable-key"
    ```

4. **Start the development server** with `npm run dev`.

    Use `npm run build` to create a production build, `npm run lint` to lint the code, and `npm run deploy` to deploy the app to Cloudflare Workers.