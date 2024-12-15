import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import type { Meta, StoryObj } from '@storybook/react'

// Color palette object
export const colors = {
  primary: {
    title: 'theme.color.primary',
    subtitle: 'Main brand color',
    colors: {
      PrimaryBlue: 'bg-primary',
      PrimaryBlueDark: 'bg-primary-dark',
      PrimaryBlueLight: 'bg-primary-light',
    },
  },
  secondary: {
    title: 'theme.color.secondary',
    subtitle: 'Accent Colors',
    colors: {
      SecondaryGreen: 'bg-secondary-green',
      SecondaryGreenLight: 'bg-secondary-green-light',
      SecondaryTeal: 'bg-secondary-teal',
    },
  },
  neutral: {
    title: 'theme.color.neutral',
    subtitle: 'Background and base color',
    colors: {
      NeutralGrayLight: 'bg-neutral-light',
      NeutralGrayMid: 'bg-neutral-mid',
      NeutralGrayDark: 'bg-neutral-dark',
      NeutralWhite: 'bg-neutral-white',
    },
  },
  accent: {
    title: 'theme.color.accent',
    subtitle: 'Highlight and attention color',
    colors: {
      AccentOrange: 'bg-accent-orange',
      AccentYellow: 'bg-accent-yellow',
      AccentPurple: 'bg-accent-purple',
    },
  },
  error: {
    title: 'theme.color.error',
    subtitle: 'Error and alert color',
    colors: {
      ErrorRed: 'bg-error',
    },
  },
  gradient: {
    title: 'gradient',
    subtitle: 'Gradient Colors',
    colors: {
      GradientOne: 'linear-gradient(65deg, white, black)',
    },
  },
}

export default {
  title: 'Design Tokens/Colors',
  component: () => null,
  parameters: {
    docs: {
      page: () => (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
          <Toaster />
          <h1 style={{ color: '#333', marginBottom: '10px' }}>
            Color Palette Documentation
          </h1>
          <p style={{ color: '#555', lineHeight: '1.6' }}>
            A breakdown of our design system's color palette and their roles.
          </p>
          <p style={{ color: '#555', lineHeight: '1.6' }}>
            Each color has a corresponding className (e.g. bg-primary) which can
            be used to apply these styles.
          </p>

          {/* Include Color Category components here */}
          <ColorCategory {...colors.primary} />
          <ColorCategory {...colors.secondary} />
          <ColorCategory {...colors.neutral} />
          <ColorCategory {...colors.accent} />
          <ColorCategory {...colors.error} />
          <ColorCategory {...colors.gradient} />
        </div>
      ),
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof colors>

type Story = StoryObj<typeof colors>

const ColorSwatch = ({ className, style, name }) => {
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        name.split(': ')[1], // get class name or style value
      )
      toast({
        title: 'Copied to Clipboard',
        description: `${name.split(': ')[1]}`,
        variant: 'success',
      })
    } catch {
      toast({
        title: 'Error Copying',
        description: 'Failed to copy, please try again.',
      })
    }
  }

  const codeStyle = {
    backgroundColor: '#f0f0f0',
    padding: '5px 10px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        width: '200px',
        textAlign: 'center',
      }}>
      <div
        className={className}
        style={{
          height: '80px',
          width: '100%',
          marginBottom: '5px',
          ...(style ? { background: style } : {}),
        }}
      />
      <div style={{ width: '100%' }}>
        <pre
          style={{ margin: '5px 0' }}
          onClick={handleCopy}
          title='Click to Copy'>
          <code style={codeStyle}>{name.split(': ')[1]}</code>
        </pre>
        <span style={{ color: '#555', fontSize: '14px' }}>
          {name.split(': ')[0]}
        </span>
      </div>
    </div>
  )
}

const ColorCategory = ({ title, subtitle, colors }) => (
  <div style={{ marginBottom: '40px' }}>
    <h2 style={{ color: '#333', marginBottom: '5px' }}>{title}</h2>
    <p style={{ color: '#777', marginBottom: '15px', fontStyle: 'italic' }}>
      {subtitle}
    </p>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}>
      {Object.entries(colors).map(([key, value]) => (
        <ColorSwatch
          key={key}
          name={`${key}: ${value}`}
          className={value.startsWith('bg-') ? value : undefined}
          style={!value.startsWith('bg-') ? value : undefined}
        />
      ))}
    </div>
  </div>
)

export const PrimaryColorsList: Story = {
  render: () => <ColorCategory {...colors.primary} />,
}

export const SecondaryColorsList: Story = {
  render: () => <ColorCategory {...colors.secondary} />,
}

export const NeutralColorsList: Story = {
  render: () => <ColorCategory {...colors.neutral} />,
}

export const AccentColorsList: Story = {
  render: () => <ColorCategory {...colors.accent} />,
}

export const ErrorColorsList: Story = {
  render: () => <ColorCategory {...colors.error} />,
}

export const GradientColorsList: Story = {
  render: () => <ColorCategory {...colors.gradient} />,
}
