import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@components/ui/card'
import { Label } from '@components/ui/label'
import { Input } from '@components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Button } from '@components/ui/button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  },
  argTypes: {
    className: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Card>

// Define the custom type for the args
interface CardStoryArgs {
  title?: string
  description?: string
  content?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

// Template Function for Reusability
const CardTemplate: React.FC<CardStoryArgs> = ({
  title = 'Card Title',
  description = 'This is a default card description.',
  content = <p>Card content goes here.</p>,
  footer = <div>Card footer</div>,
  className,
}) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{content}</CardContent>
    <CardFooter>{footer}</CardFooter>
  </Card>
)

// Default Card
export const Default: Story = {
  render: args => <CardTemplate {...args} />,
  args: {},
}

export const WithCustomContent: Story = {
  render: args => <CardTemplate {...args} />,
  args: {
    title: 'Card with custom content',
    description: 'Example of custom content',
    content: (
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    ),
  },
}

export const WithCustomFooter: Story = {
  render: args => <CardTemplate {...args} />,
  args: {
    title: 'Card with Custom Footer',
    description: 'Example of a custom footer',
    footer: <div>Custom Footer for a list</div>,
  },
}

export const WithClassName: Story = {
  render: args => <CardTemplate {...args} />,
  args: {
    className: 'bg-blue-100',
    title: 'Card with custom class',
    description: 'Example of a card with custom style',
    content: <p>This card has a blue background.</p>,
  },
}

export const WithForm: Story = {
  render: () => (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Name of your project' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='framework'>Framework</Label>
              <Select>
                <SelectTrigger id='framework'>
                  <SelectValue placeholder='Select' />
                </SelectTrigger>
                <SelectContent className='bg-white' position='popper'>
                  <SelectItem value='next'>Next.js</SelectItem>
                  <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                  <SelectItem value='astro'>Astro</SelectItem>
                  <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}
