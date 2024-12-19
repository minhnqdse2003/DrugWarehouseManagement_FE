/* eslint-disable react-hooks/rules-of-hooks */
import { DateTimePicker, TimePicker } from '@/components/date-time-picker'
import { Label } from '@/components/ui/label'
import { Story } from '@storybook/blocks'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof DateTimePicker>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DateTimePicker value={date} onChange={setDate} className='w-[280px]' />
    )
  },
}

export const HourCycle: Story = {
  storyName: 'Hour Cycle - 12H / 24H',
  render: () => {
    const [date12, setDate12] = useState<Date | undefined>(undefined)
    const [date24, setDate24] = useState<Date | undefined>(undefined)
    return (
      <div className='flex flex-col gap-3 lg:flex-row'>
        <div className='flex w-72 flex-col gap-2'>
          <Label>12 Hour</Label>
          <DateTimePicker hourCycle={12} value={date12} onChange={setDate12} />
        </div>
        <div className='flex w-72 flex-col gap-2'>
          <Label>24 Hour</Label>
          <DateTimePicker hourCycle={24} value={date24} onChange={setDate24} />
        </div>
      </div>
    )
  },
}

export const DefaultPopup: Story = {
  storyName: 'Default Popup value',
  render: () => {
    const DefaultDate = new Date()
    DefaultDate.setMonth(DefaultDate.getMonth() - 3)
    DefaultDate.setHours(13, 14, 0, 0)

    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
      <DateTimePicker
        value={date}
        defaultPopupValue={DefaultDate}
        onChange={setDate}
        className='w-[280px]'
      />
    )
  },
}

export const DateTimePickerOption: Story = {
  storyName: 'Date picker or Time picker',
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [time, setTime] = useState<Date | undefined>(undefined)

    return (
      <div className='flex flex-col gap-3 md:flex-row md:gap-10'>
        <div className='w-72 space-y-2'>
          <p>Date Picker</p>
          <DateTimePicker granularity='day' value={date} onChange={setDate} />
        </div>
        <div className='w-72 space-y-2'>
          <p>Time Input</p>
          <TimePicker date={time} onChange={setTime} />
        </div>
      </div>
    )
  },
}

export const YearDropdownRange: Story = {
  storyName: 'Year Dropdown Range',
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined)

    return (
      <div className='flex flex-col gap-3 lg:flex-row'>
        <div className='flex w-72 flex-col gap-2'>
          <Label>± 3 Years</Label>
          <DateTimePicker yearRange={3} value={date} onChange={setDate} />
        </div>
        <div className='flex w-72 flex-col gap-2'>
          <Label>± 10 Years</Label>
          <DateTimePicker yearRange={10} value={date} onChange={setDate} />
        </div>
        <div className='flex w-72 flex-col gap-2'>
          <Label>± 30 Years</Label>
          <DateTimePicker yearRange={30} value={date} onChange={setDate} />
        </div>
      </div>
    )
  },
}

export const DisplayFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DateTimePicker
        displayFormat={{ hour24: 'yyyy/MM/dd' }}
        value={date}
        onChange={setDate}
        className='w-72'
      />
    )
  },
}
