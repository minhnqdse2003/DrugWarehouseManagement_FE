import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from '@components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@components/ui/button'
import { ToastAction } from '@/components/ui/toast'

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toaster>

interface ToastConfig {
  title: string
  description: string
  variant?: 'default' | 'destructive' | 'success'
  action?: React.ReactNode
}

const triggerToast = (config: ToastConfig) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toast } = useToast()
  return () => {
    toast(config)
  }
}

export const Default: Story = {
  render: () => {
    const openDefaultToast = triggerToast({
      title: 'Notification Title',
      description: 'This is a default notification',
    })

    return (
      <>
        <Toaster />
        <Button onClick={openDefaultToast}>Open Default Toast</Button>
      </>
    )
  },
}

export const Destructive: Story = {
  render: () => {
    const openDestructiveToast = triggerToast({
      title: 'Error Notification',
      description: 'This is a destructive notification.',
      variant: 'destructive',
    })
    return (
      <>
        <Toaster />
        <Button onClick={openDestructiveToast}>Open Destructive Toast</Button>
      </>
    )
  },
}

export const Success: Story = {
  render: () => {
    const openSuccessToast = triggerToast({
      title: 'Success Notification',
      description: 'This is a success notification',
      variant: 'success',
    })
    return (
      <>
        <Toaster />
        <Button onClick={openSuccessToast}>Open Success Toast</Button>
      </>
    )
  },
}

export const WithAction: Story = {
  render: () => {
    const openActionToast = triggerToast({
      title: 'New version available',
      description: 'A new version of the app is available.',
      action: (
        <ToastAction altText='update-toast' onClick={() => alert('Update')}>
          Update
        </ToastAction>
      ),
    })
    return (
      <>
        <Toaster />
        <Button onClick={openActionToast}>Open Toast with Action</Button>
      </>
    )
  },
}

export const MultipleToasts: Story = {
  render: () => {
    const openDefaultToast = triggerToast({
      title: 'Notification Title',
      description: 'This is a default notification',
    })

    const openDestructiveToast = triggerToast({
      title: 'Error Notification',
      description: 'This is a destructive notification.',
      variant: 'destructive',
    })

    const openSuccessToast = triggerToast({
      title: 'Success Notification',
      description: 'This is a success notification',
      variant: 'success',
    })

    return (
      <div style={{ display: 'flex', gap: 10 }}>
        <Toaster />
        <Button onClick={openDefaultToast}>Open Default Toast</Button>
        <Button onClick={openDestructiveToast}>Open Destructive Toast</Button>
        <Button onClick={openSuccessToast}>Open Success Toast</Button>
      </div>
    )
  },
}
