import type { Preview } from '@storybook/react'
import 'tailwindcss/tailwind.css'
import { themes } from '@storybook/theming'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
