import { defineConfig } from "prisma/config";

// Load dotenv for local development (optional)
try {
  require("dotenv/config");
} catch (e) {
  // dotenv not available, that's okay
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Use a dummy URL for generation if DATABASE_URL is not set
    // Prisma generation doesn't actually connect to the database
    url: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
  },
});
