import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl"; // この行を追加

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()], // この行を変更
});
