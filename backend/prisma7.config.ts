import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    url: "postgresql://galileo_user:galileo_password@127.0.0.1:5444/galileo_coworking?schema=public",
  }
})