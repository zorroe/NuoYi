// uno.config.ts
import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: ['Roboto', 'Noto Sans SC'],
                mono: ['Fira Code', 'Fira Mono:400,700'],
            },
        })
    ]
})