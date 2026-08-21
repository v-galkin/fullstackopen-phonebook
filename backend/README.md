# Phonebook Backend

FullStackOpen Part 3 exercise: an Express REST API for a phonebook, serving the built Phonebook frontend (`dist/`) as static files.

## Endpoints

- `GET /api/phonebook` — list all entries
- `GET /api/phonebook/:id` — get a single entry
- `POST /api/phonebook` — create an entry (`{ name, number }`)
- `DELETE /api/phonebook/:id` — delete an entry
- `GET /info` — entry count and server time

## Run

```
npm install
npm run dev
```

Server listens on port 3001 and also serves the frontend from `dist/` at `/`.
