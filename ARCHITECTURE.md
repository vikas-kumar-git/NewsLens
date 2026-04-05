# NewsMonkey Architecture & Data Flow

## Component Structure

```
App (BrowserRouter)
├── MainLayout
│   ├── Navbar
│   │   ├── Search Input (Desktop) → Debounce Logic
│   │   ├── Search Input (Mobile) → Direct Submit
│   │   └── Categories Navigation
│   ├── Outlet (Route Content)
│   │   ├── Home
│   │   │   └── News Component
│   │   ├── Category/:cat
│   │   │   └── News Component`
│   │   ├── Search
│   │   │   └── News Component
│   │   ├── About
│   │   └── ForYou
│   │       └── News Component
│   └── Footer
│
└── ContextProvider
    └── NewsContext (Global State)
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      NEWSCONTEXT                             │
│  (Global State Management)                                   │
├─────────────────────────────────────────────────────────────┤
│ • query: string          [Search results filter]             │
│ • country: string        [Default: "in"]                     │
│ • search: string         [Current input value]               │
│ • category: string       [Selected category]                 │
│ • menuOpen: boolean      [Mobile menu state]                 │
└─────────────────────────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
    ┌─────────┐      ┌──────────┐      ┌──────────┐
    │ NAVBAR  │      │  HOME    │      │ SEARCH   │
    └─────────┘      └──────────┘      └──────────┘
         │                 │                 │
         │    ┌────────────┼────────────┐   │
         │    │            │            │   │
         ▼    ▼            ▼            ▼   ▼
    ┌──────────────────────────────────────────┐
    │        NEWS COMPONENT                     │
    │  (Fetches & Displays Articles)           │
    └──────────────────────────────────────────┘
              │
              ├─► buildNewsURL()
              │   ├─ query
              │   ├─ category
              │   └─ country
              │
              └─► fetch(URL)
                  │
                  ▼
         ┌────────────────────┐
         │ NEWSDATA.IO API    │
         │ (External Source)  │
         └────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ setArticles()        │
    │ [array of objects]   │
    └──────────────────────┘
              │
              ▼
    ┌────────────────────────────┐
    │   NewsItem Components      │
    │   (Rendered in Grid)       │
    └────────────────────────────┘
```

## User Interaction Flow

### Desktop Search Flow
```
User Types in Search Input
         │
         ▼
onChange event → setSearch(value)
         │
         ▼
useEffect1 (debounce)
  - 500ms timer starts
  - previous timers cleared
         │
         ▼
useEffect2 (debounce complete)
  - if (debouncedSearch.length > 2)
  - setQuery(debouncedSearch)
  - navigate("/search")
```

### Mobile Search Flow
```
User Types in Search Input
         │
         ▼
onChange event → setSearch(value)
         │
         ▼
User Clicks "Go" Button
         │
         ▼
onClick Handler
  - if (search.length > 0)
  - setQuery(search)
  - navigate("/search")
  - setMenuOpen(false)
```

### Category Navigation
```
User Clicks Category Link
         │
         ▼
Navigate to /category/:cat
         │
         ▼
Category Component
  - Extract cat from useParams()
  - useEffect: setCategory(cat)
         │
         ▼
News Component Renders
  - Uses category from context
  - Fetches category-specific articles
```

## API Request Flow

```
NEWS Component
     │
     ├─► buildNewsURL({ query, category, country })
     │
     ├─► Construct URL:
     │   base: "https://newsdata.io/api/1/news"
     │   params: "apikey=KEY&country=in&language=en"
     │   if query: append "&q=query"
     │   if category: append "&category=category"
     │
     ├─► fetch(url, { signal: controller.signal })
     │   [Abort controller for cleanup]
     │
     ├─► res.json()
     │
     ├─► setArticles(data.results || [])
     │
     └─► Render NewsItem components
         (with title, description, image, author, date, source)
```

## State Update Sequence

```
1. User navigates to page
   └─ useEffect in respective page
      └─ setCategory() → updates context

2. Category changes
   └─ News component re-renders
      └─ useEffect detects [query, category, country] change
         └─ fetchNews() called
            └─ API request sent
               └─ setArticles() updates state
                  └─ NewsItem grid re-renders

3. User searches
   Desktop:
   └─ onChange → setSearch
      └─ useEffect1 debounce
         └─ useEffect2 navigates & setQuery

   Mobile:
   └─ onChange → setSearch
      └─ onClick → setQuery & navigate directly
```

## Error Handling

```
fetch(url)
   │
   ├─► Success
   │   └─ res.json() → setArticles(data.results)
   │
   ├─► Network Error
   │   └─ catch(error)
   │       └─ Log error (not AbortError)
   │
   └─► AbortError
       └─ Request cancelled (component unmounted)
           └─ No error logged
```

## Performance Optimizations

| Optimization | Implementation | Benefit |
|---|---|---|
| Debouncing | 500ms delay on desktop search | Reduces API calls |
| Abort Controller | Cancel requests on unmount | Prevents memory leaks |
| Conditional Rendering | Only render if data exists | Faster UI updates |
| Line Clamp | limit-clamp-2/3 on text | Better layout control |
| Grid Layout | md:grid-cols-3 | Responsive design |

