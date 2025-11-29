import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class","media"],
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}","./pages/**/*.{ts,tsx}","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors:{
        bg:{primary:"var(--bg-primary)",secondary:"var(--bg-secondary)"},
        surface:{card:"var(--surface-card)"},
        textc:{primary:"var(--text-primary)",secondary:"var(--text-secondary)"},
        gold:{500:"var(--gold-500)",600:"var(--gold-600)",700:"var(--gold-700)"},
        poker:{red:"var(--poker-red-500)"}
      },
      borderRadius:{btn:"var(--radius-button)",card:"var(--radius-card)"},
      boxShadow:{e1:"var(--shadow-e1)"}
    }
  },
  plugins:[]
}
export default config