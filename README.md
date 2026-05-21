# Movie API med Fastify och MongoDB
Detta är ett RESTfulAPI byggd med Fastify och MongoDb. Webbtjänsten används för att hantera 
en samling av filmer och stödjer full CRUD-funktionalitet (Create, Read, Update, Delete).

## Verktyg
* Node.js (ESM)
* Fastify
* MongoDB (via @fastify/mongodb)
* JSON Schema validering

## Installation
1. **Klona Repo**
```bash     
git clone https://github.com/rare2400/fastify-movieAPI.git
```
2. **Installera beroenden:**
```bash     
npm install
```

3. **Skapa `.env`-fil i rotmappen och fyll i databasuppgifter:**

| Variabel     | Beskrivning                     |
|--------------|---------------------------------|
| `PORT=`      | Porten servern lyssnar på       |
| `DATABASE=`  | Anslutningssträng till MongoDB  |

4. **Starta server**
```bash
npm run dev
```

## Projektstruktur
```
fastify-movieapi/
│
├── server.js
├── src/
│   ├── controllers/
│   │   └── movieController.js
│   ├── plugins/
│   │   └── mongo.js
│   ├── routes/
│   │   └── movieRoute.js
│   └── schemas/
│       └── movieSchema.js
├── .env
└── package.json
```

## API Endpoints

| Metod  | Endpoint      | Skyddad | Beskrivning            |
|--------|---------------|---------|------------------------|
| GET    | /movies       | Nej     | Hämtar alla filmer     |
| GET    | /movies/:id   | Nej     | Hämtar en film         |
| POST   | /movies       | Ja      | Lägger till en ny film |
| PUT    | /movies/:id   | Ja      | Uppdaterar en film     |
| DELETE | /movies/:id   | Ja      | Tar bort en film       |

**Exempel på request body (POST och PUT)**

```json
{
  "title": "Inception",
  "year": 2010,
  "length": 148,
  "watched": true,
  "rating": 9.0
}
```

## Testning
API:t kan testas med program som:
- Thunder Client (vsc extension)
- Postman
- Advanced REST Client

## Skapad av
Skapad som en del av en skoluppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz   
[rare2400@student.miun.se](rare2400@student.miun.se)      
2026-05-21
