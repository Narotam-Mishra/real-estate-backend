
## [real-estate-backend]()

### Setup

```npm install && npm start```

### Sync MongoDB with prisma

```npx prisma db push```

### Database Connection
1. Import connectDB.js from db
2. Invoke in start()
3. setup .env in the root
4. Add mongoURL with correct value

### Routers
- auth.js
- jobs.js

### Models
- User
- Post 
- postDetail
- savedPost
- chat 
- message

#### Note - Expressjs middlware allow us to intercept any process to make youe verification and continue that process

### using console-ninja

#### command
```console-ninja node --watch app.js```