import { defineConfig, env } from "prisma/config";

// Only load dotenv if DATABASE_URL is not set (for local development)
if (!process.env.DATABASE_URL) {
  try {
    require("dotenv/config");
  } catch (e) {
    // dotenv not available, that's okay
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Use a dummy URL for generation if DATABASE_URL is not set
    url: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
  },
  generate: {
    client: {
      output: "../node_modules/.prisma/client",
    },
  },
});
