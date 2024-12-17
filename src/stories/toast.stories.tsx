/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from '@components/ui/toaster'
import { Toast, useToast } from '@/hooks/use-toast'
import { Button } from '@components/ui/button'
import { ToastAction } from '@/components/ui/toast'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: `
          The \`Toaster\` component is a container that displays \`Toast\` notifications. It handles displaying multiple toasts and manages their appearance and dismissal.
          `,
    },
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

const useToastTrigger = () => {
  const { toast } = useToast()

  return (config: Toast) => {
    toast(config)
  }
}

export const Default: Story = {
  parameters: {
    docs: {
      description:
        'This is an example of a basic toast notification with a default style. It shows a title and a description.',
    },
  },
  render: () => {
    const triggerToast = useToastTrigger()

    return (
      <Button
        onClick={() =>
          triggerToast({
            title: 'Notification Title',
            description: 'This is a default notification',
          })
        }>
        Open Default Toast
      </Button>
    )
  },
}

export const Destructive: Story = {
  parameters: {
    docs: {
      description:
        'A destructive toast is used for notifications that indicate errors or require user attention. It should be used sparingly for important situations.',
    },
  },
  render: () => {
    const triggerToast = useToastTrigger()
    return (
      <Button
        onClick={() =>
          triggerToast({
            title: 'Error Notification',
            description: 'This is a destructive notification.',
            variant: 'destructive',
          })
        }>
        Open Destructive Toast
      </Button>
    )
  },
}

export const Success: Story = {
  parameters: {
    docs: {
      description:
        'A success toast is used to provide positive feedback after a user action or an event.',
    },
  },
  render: () => {
    const triggerToast = useToastTrigger()
    return (
      <Button
        onClick={() =>
          triggerToast({
            title: 'Success Notification',
            description: 'This is a success notification',
            variant: 'success',
          })
        }>
        Open Success Toast
      </Button>
    )
  },
}

export const WithAction: Story = {
  parameters: {
    docs: {
      description:
        'A toast with an action button allows the user to interact directly with the notification. ',
    },
  },
  render: () => {
    const triggerToast = useToastTrigger()

    return (
      <Button
        onClick={() =>
          triggerToast({
            title: 'New version available',
            description: 'A new version of the app is available.',
            action: (
              <ToastAction
                altText='update-toast'
                onClick={() => alert('Update')}>
                Update
              </ToastAction>
            ),
          })
        }>
        Open Toast with Action
      </Button>
    )
  },
}

export const MultipleToasts: Story = {
  parameters: {
    docs: {
      description:
        'This shows an example of how multiple toasts can be displayed at the same time. The toast component manages them properly and they should not overlap with each other.',
    },
  },
  render: () => {
    const triggerToast = useToastTrigger()
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          onClick={() =>
            triggerToast({
              title: 'Notification Title',
              description: 'This is a default notification',
            })
          }>
          Open Default Toast
        </Button>
        <Button
          onClick={() =>
            triggerToast({
              title: 'Error Notification',
              description: 'This is a destructive notification.',
              variant: 'destructive',
            })
          }>
          Open Destructive Toast
        </Button>
        <Button
          onClick={() =>
            triggerToast({
              title: 'Success Notification',
              description: 'This is a success notification',
              variant: 'success',
            })
          }>
          Open Success Toast
        </Button>
      </div>
    )
  },
}

export const EmptyToaster: Story = {
  parameters: {
    docs: {
      description:
        'The Toaster component in an idle state, without any visible toast notifications',
    },
  },
  render: () => {
    return <p>Toaster initially empty.</p>
  },
}
