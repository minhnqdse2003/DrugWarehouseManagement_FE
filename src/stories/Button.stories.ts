import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button } from '@/components/ui/button' // Ensure the correct path to your Button component

const meta: Meta<typeof Button> = {
  title: 'Button Shadcn',
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
      ], // Extract variant keys from buttonVariants
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'], // Extract size keys from buttonVariants
    },
    children: {
      control: 'text',
      description: 'Button label or content',
    },
  },
  args: {
    onClick: fn(),
    variant: 'default',
    size: 'default',
    children: 'Button',
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
