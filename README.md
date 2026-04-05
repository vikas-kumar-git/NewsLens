# NewsLens

NewsLens is a React news reader built with Vite, React Router, and Tailwind CSS. It fetches live headlines from the NewsData.io API and lets users browse top stories, explore categories, run keyword searches, and switch between light and dark mode.

## Features

- Browse top headlines on the home page
- Explore category feeds such as business, sports, technology, and world
- Search for news articles with a minimum 3-character query
- View a "For You" feed powered by the selected country
- Toggle dark mode with persistence in `localStorage`
- See loading skeletons, empty states, and fetch error states

## Tech Stack

- React 18
- Vite 5
- React Router DOM 7
- Tailwind CSS 4
- NewsData.io API

## Project Structure

```text
src/
  components/
    Navbar.jsx
    News.jsx
    NewsItem.jsx
    SkeletonCard.jsx
  context/
    contextProvider.jsx
    createcontext.jsx
  layout/
    MainLayout.jsx
  pages/
    Home.jsx
    Category.jsx
    Search.jsx
    ForYou.jsx
    About.jsx
  App.jsx
  main.jsx
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create a `.env` file in the project root:

```bash
VITE_NEWS_API_KEY=your_newsdata_api_key
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## How It Works

- Global UI state lives in `NewsContext`
- Route pages set the active category or search behavior
- `News.jsx` builds the API URL from `query`, `category`, and `country`
- Articles are fetched from `https://newsdata.io/api/1/news`
- Each response item is rendered through `NewsItem.jsx`

## Current Context State

```js
{
  query,
  setQuery,
  country,
  setCountry,
  search,
  setSearch,
  menuOpen,
  setMenuOpen,
  category,
  setCategory,
  darkMode,
  setDarkMode
}
```

## Notes

- Search requests are blocked until the query is at least 3 characters long
- Category requests omit the `category` parameter when the current category is `general`
- Dark mode is stored in `localStorage` under the `darkMode` key
- The app is currently fully client-side and does not use a database
