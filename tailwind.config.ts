import type { Config } from 'tailwindcss'

const config: Config = {
    corePlugins: {
        preflight: false, // 🔴 DEZACTIVEAZĂ BASE
    },
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
