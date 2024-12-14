import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button' // Ensure the correct path to your Button component
import { Loader2, Mail } from 'lucide-react'
import { action } from '@storybook/addon-actions'

const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Updated title for better organization in Storybook
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'Visual style of the button.',
      table: {
        defaultValue: { summary: 'default' }, // Explicitly state default value in the table
      },
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the button.',
      table: {
        defaultValue: { summary: 'default' }, // Explicitly state default value in the table
      },
    },
    children: {
      control: 'text',
      description: 'Button label or content (text or other React components).', // More descriptive
      table: {
        type: { summary: 'ReactNode' }, // Show that children can be more than text
      },
    },
    onClick: {
      action: 'clicked', // Use action addon for click events
      description: 'Callback function triggered when the button is clicked.',
      table: {
        type: { summary: '() => void' }, // Clearly indicates a function type
        category: 'Events', // Group onClick in an "Events" category in the ArgsTable
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button interaction.',
      table: {
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
  },
  args: {
    onClick: action('Button Clicked'),
    variant: 'default',
    size: 'default',
    children: 'Button',
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Button>

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Primary Button',
  },
}

// Destructive Button
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: 'Destructive Button',
  },
}

// Outline Button
export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Outline Button',
  },
}

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Secondary Button',
  },
}

// Ghost Button
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    children: 'Ghost Button',
  },
}

// Link Button
export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    children: 'Link Button',
  },
}

// Large Button
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

// Small Button
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

// Icon Button
export const Icon: Story = {
  args: {
    size: 'icon',
    children: '🔍', // Example of an icon or use <svg> for real icons
  },
}

// Icon Button with contents
export const IconContent: Story = {
  args: {
    children: (
      <>
        <Mail />
        Login with Email
      </>
    ),
  },
}

// Loading Button with indicator
export const LoadingContent: Story = {
  args: {
    children: (
      <>
        <Loader2 className='animate-spin' />
        Login with Email
      </>
    ),
  },
}
