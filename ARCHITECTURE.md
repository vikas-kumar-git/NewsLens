# NewsLens Architecture And Data Flow

## High-Level Structure

```text
main.jsx
└── ContextProvider
    └── App
        └── BrowserRouter
            └── Routes
                └── MainLayout
                    ├── Navbar
                    ├── Outlet
                    │   ├── Home
                    │   │   └── News
                    │   ├── Category
                    │   │   └── News
                    │   ├── Search
                    │   │   └── News
                    │   ├── ForYou
                    │   │   └── News
                    │   └── About
                    └── Footer
```

## Routing

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Top headlines with `general` category |
| `/category/:cat` | `Category` | Category-specific news feed |
| `/search` | `Search` | Search results for the current query |
| `/foryou` | `ForYou` | Curated feed using `category="top"` |
| `/about` | `About` | Static app information |

## Global State

`ContextProvider` exposes a shared `NewsContext` used by the navbar and page-level components.

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

### State Responsibilities

| State | Type | Default | Used For |
|---|---|---|---|
| `query` | string | `""` | Active search term sent to the API |
| `country` | string | `"in"` | Country filter for all requests |
| `search` | string | `""` | Controlled navbar input value |
| `menuOpen` | boolean | `false` | Mobile navigation state |
| `category` | string | `"general"` | Active feed category |
| `darkMode` | boolean | `false` or stored preference | Theme mode persisted in `localStorage` |

## Component Responsibilities

### `Navbar`

- Displays the logo, main navigation, and category links
- Controls the search form for desktop and mobile
- Updates `query`, `category`, `search`, and `menuOpen`
- Toggles `darkMode`
- Navigates to `/search` after a valid submit

### `Home`

- Resets the app to the default feed
- Sets `category` to `general`
- Clears any active search query
- Renders `News`

### `Category`

- Reads `cat` from the route
- Updates the context category
- Clears previous search state
- Renders `News` for the chosen category

### `Search`

- Forces category back to `general`
- Uses the active `query` from context
- Shows a prompt when no query exists
- Renders `News` without its internal heading

### `ForYou`

- Uses the current `country` from context
- Passes `category="top"` and `query=""` directly into `News`

### `News`

- Combines context values with optional prop overrides
- Builds the external API request URL
- Fetches articles from NewsData.io
- Tracks `loading`, `error`, `articles`, and `completedRequestKey`
- Renders skeleton cards, error states, empty states, and article cards

### `NewsItem`

- Renders a single article card
- Falls back to `/E404.png` when the image is missing
- Displays source, title, description, author, date, and external link

## Request Lifecycle

```text
User action
  -> route change or search submit
  -> page component updates context
  -> News recomputes query/category/country
  -> buildNewsURL(...)
  -> fetch(..., { signal })
  -> response JSON parsed
  -> articles stored in local component state
  -> grid of NewsItem cards rendered
```

## API Request Rules

Base endpoint:

```text
https://newsdata.io/api/1/news
```

Request construction in `News.jsx`:

- Always includes `apikey`, `country`, and `language=en`
- Adds `q` when `query` is non-empty
- Otherwise adds `category` when the category is not `general`
- Uses `AbortController` to cancel stale requests on cleanup

Example request shapes:

```text
/news?apikey=KEY&country=in&language=en
/news?apikey=KEY&country=in&language=en&category=technology
/news?apikey=KEY&country=in&language=en&q=artificial%20intelligence
```

## Search Flow

```text
Navbar input change
  -> setSearch(value)
  -> form submit
  -> trim input
  -> if length < 3, stop
  -> setQuery(trimmedSearch)
  -> setCategory("general")
  -> setMenuOpen(false)
  -> navigate("/search")
```

## Category Flow

```text
User opens /category/:cat
  -> Category reads URL param
  -> setCategory(cat)
  -> setQuery("")
  -> setSearch("")
  -> News fetches category feed
```

## Theme Flow

```text
ContextProvider loads darkMode from localStorage
  -> effect toggles .dark class on documentElement
  -> effect persists the updated value to localStorage
```

## Error And Loading Handling

- `loading` starts as `true` for each request
- `waitingForCurrentRequest` prevents stale UI from rendering during a new fetch
- `AbortError` is ignored during cleanup
- Non-abort failures set a user-facing `Failed to load articles.` message
- Empty responses show `No Articles found ...`

## Current Architecture Notes

- The app is client-side only and has no backend or database layer
- `country` exists in shared state, but there is no UI yet for changing it
- `completedRequestKey` is used to avoid showing previous data during active transitions
