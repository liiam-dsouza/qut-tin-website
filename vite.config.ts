import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { imagetools } from "vite-imagetools"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
		tailwindcss(),
		imagetools(),
    ],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		}
	}
})
