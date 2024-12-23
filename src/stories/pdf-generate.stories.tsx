import InvoiceSample from '@/components/invoice-sample'
import { PDFViewer } from '@react-pdf/renderer'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InvoiceSample> = {
  title: 'Components/Pdf Generate',
  component: InvoiceSample,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className='w-full h-[750px]'>
        <PDFViewer width='100%' height='100%' style={{ margin: '3em' }}>
          <Story />
        </PDFViewer>
      </div>
    ),
  ],

  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof InvoiceSample>

export const Default: Story = {
  render: () => {
    return <InvoiceSample />
  },
}
