import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
    plugins: [
        tsConfigPaths()
    ],
    test: {
        environmentMatchGlobs: [
            ['src/http/controllers/**', 'prisma'] // Prisma name needs to be the same that folder vitest-environment-prisma final word
        ]
    }
})
