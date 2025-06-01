import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable`

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
    host: DB_HOST,
    port: parseInt(DB_PORT as string),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: false,
  },
})
