import type { Preview } from '@storybook/react'

import '../src/tokens/index.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals['theme'] || 'light'
      return (
        <div className={theme === 'dark' ? 'dark' : ''}>
          <div className="bg-background text-foreground p-8 min-h-[200px]">
            <Story />
          </div>
        </div>
      )
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme switch',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
}

export default preview
