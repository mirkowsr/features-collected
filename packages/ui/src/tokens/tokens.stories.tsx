import type { Meta, StoryObj } from '@storybook/react'

function TokensPreview() {
  const colorTokens = [
    { name: 'background', var: '--color-background' },
    { name: 'foreground', var: '--color-foreground' },
    { name: 'surface', var: '--color-surface' },
    { name: 'muted', var: '--color-muted' },
    { name: 'muted-foreground', var: '--color-muted-foreground' },
    { name: 'primary', var: '--color-primary' },
    { name: 'primary-foreground', var: '--color-primary-foreground' },
    { name: 'secondary', var: '--color-secondary' },
    { name: 'secondary-foreground', var: '--color-secondary-foreground' },
    { name: 'accent', var: '--color-accent' },
    { name: 'accent-foreground', var: '--color-accent-foreground' },
    { name: 'destructive', var: '--color-destructive' },
    { name: 'destructive-foreground', var: '--color-destructive-foreground' },
    { name: 'border', var: '--color-border' },
    { name: 'border-strong', var: '--color-border-strong' },
    { name: 'input', var: '--color-input' },
    { name: 'ring', var: '--color-ring' },
    { name: 'overlay', var: '--color-overlay' },
  ]

  return (
    <div className="flex flex-col gap-6 w-[600px]">
      <h2 className="text-xl font-semibold">Color Tokens</h2>
      <div className="grid grid-cols-2 gap-3">
        {colorTokens.map((token) => (
          <div key={token.name} className="flex items-center gap-3">
            <div
              className="size-10 rounded-md border border-border-strong shrink-0"
              style={{ backgroundColor: `var(${token.var})` }}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{token.name}</span>
              <span className="text-xs text-muted-foreground font-mono">{token.var}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-4">Radius Tokens</h2>
      <div className="flex gap-4">
        {['sm', 'md', 'lg', 'xl'].map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <div
              className="size-16 border-2 border-foreground"
              style={{ borderRadius: `var(--radius-${size})` }}
            />
            <span className="text-xs font-mono">radius-{size}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-4">Shadow Tokens</h2>
      <div className="flex gap-4">
        {['sm', '', 'md', 'lg'].map((size) => (
          <div key={size || 'default'} className="flex flex-col items-center gap-2">
            <div
              className="size-16 rounded-md bg-surface"
              style={{ boxShadow: `var(--shadow${size ? `-${size}` : ''})` }}
            />
            <span className="text-xs font-mono">shadow{size ? `-${size}` : ''}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const meta: Meta<typeof TokensPreview> = {
  title: 'Foundation/Tokens',
  component: TokensPreview,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AllTokens: Story = {}
