import { useState, useEffect, useCallback } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'

interface PaginationState {
  pageIndex: number
  pageSize: number
}

interface UseTableProps<TData, TFilters> {
  fetchData: (params: {
    pageIndex: number
    pageSize: number
    sorting?: SortingState
    filters?: TFilters
  }) => Promise<{ data: TData[]; total: number }>
  columns: ColumnDef<TData>[]
  initialPageSize?: number
  initialFilters?: TFilters
}

function useTable<TData, TFilters>({
  fetchData,
  columns,
  initialPageSize = 10,
  initialFilters,
}: UseTableProps<TData, TFilters>) {
  const [data, setData] = useState<TData[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<TFilters | undefined>(initialFilters)

  const fetchDataWrapper = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchData({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        filters,
      })

      setData(response.data)
      setTotal(response.total)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [fetchData, pagination, sorting, filters])

  useEffect(() => {
    fetchDataWrapper()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sorting, filters])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    pageCount: Math.ceil(total / pagination.pageSize),
  })

  const setLocalFilters = (newFilters: TFilters) => {
    setFilters(newFilters)
  }

  const gotoPage = (page: number) => {
    table.setPageIndex(page)
  }

  const setPageSize = (size: number) => {
    table.setPageSize(size)
  }

  return {
    table,
    isLoading,
    error,
    gotoPage,
    setPageSize,
    setLocalFilters,
  }
}

export default useTable
