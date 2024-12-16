import { Meta, StoryObj } from '@storybook/react'
import { Payment, columns } from './columns'
import { DataTable } from './data-table'
import { useEffect, useState } from 'react'

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: 'a1b2c3d4',
      amount: 250,
      status: 'processing',
      email: 'john.doe@example.com',
    },
    {
      id: 'e5f6g7h8',
      amount: 50,
      status: 'success',
      email: 'jane.smith@example.com',
    },
    {
      id: 'i9j0k1l2',
      amount: 75,
      status: 'failed',
      email: 'test1@example.com',
    },
    {
      id: 'm3n4o5p6',
      amount: 1200,
      status: 'pending',
      email: 'test2@example.com',
    },
    {
      id: 'q7r8s9t0',
      amount: 750,
      status: 'processing',
      email: 'another@example.com',
    },
    {
      id: 'u1v2w3x4',
      amount: 300,
      status: 'success',
      email: 'email3@example.com',
    },
    {
      id: 'y5z6a7b8',
      amount: 10000,
      status: 'failed',
      email: 'email4@example.com',
    },
    {
      id: 'c9d0e1f2',
      amount: 150,
      status: 'processing',
      email: 'email5@example.com',
    },
    {
      id: 'g3h4i5j6',
      amount: 600,
      status: 'success',
      email: 'email6@example.com',
    },
  ]
}

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState<Payment[]>([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getData().then(setData)
    }, [])

    return (
      <div className='container mx-auto py-10'>
        <DataTable columns={columns} data={data} />
      </div>
    )
  },
}
