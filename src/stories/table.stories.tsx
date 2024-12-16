import { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableColumnHeader } from '@/components/columns-header'
import { Input } from '@/components/ui/input'

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

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

const meta: Meta<typeof Table> = {
  title: 'Components/DataTable',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState<Payment[]>([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getData().then(setData)
    }, [])

    const columns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
      },
    ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })

    return (
      <div className='container mx-auto py-10'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
}

export const CellFormating: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState<Payment[]>([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getData().then(setData)
    }, [])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sorting, setSorting] = useState<SortingState>([]) /*Use for format */

    const columns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Amount' />
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(amount)

          return <div className='font-medium'>{formatted}</div>
        },
      },
    ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting /*Use for format */,
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting /*Use for format */,
      },
    })

    return (
      <div className='container mx-auto py-10'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
}

export const Filters: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState<Payment[]>([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getData().then(setData)
    }, [])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sorting, setSorting] = useState<SortingState>([])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const columns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Amount' />
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(amount)

          return <div className='font-medium'>{formatted}</div>
        },
      },
    ]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting /*Use for format */,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
      },
    })

    return (
      <div className='container mx-auto py-10'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='Filter emails...'
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('email')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
}
