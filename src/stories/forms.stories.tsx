/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  FileInput,
  FileSvgDraw,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FileValidationConfig, validateFiles } from '@/lib/file-utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { Paperclip } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: () => {
    const formSchema = z.object({
      username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
      }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='username' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    )
  },
}

export const FormFile: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)
    const [fileErrors, setFileErrors] = useState<string[]>([])

    const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
    const MAX_FILE_SIZE = 1024 * 1024 * 4 // 4MB in bytes
    const MAX_FILES = 5

    const dropZoneConfig = {
      maxFiles: MAX_FILES,
      maxSize: MAX_FILE_SIZE,
      multiple: true,
    }

    const fileValidationConfig: FileValidationConfig = {
      maxFiles: MAX_FILES,
      maxSize: MAX_FILE_SIZE,
      acceptedFileTypes: ACCEPTED_FILE_TYPES,
    }

    const validateFilesWrapper = useMemo(() => validateFiles, [])

    const handleFileChange = (newFiles: File[] | null) => {
      //Clear previous errors
      setFileErrors([])
      if (!newFiles) {
        setFiles(null)
        return
      }

      const errors = validateFilesWrapper(newFiles, fileValidationConfig)

      if (errors.length > 0) {
        setFileErrors(errors)
        setFiles(null)
        return
      }

      setFiles(newFiles)
    }

    const formSchema = z.object({
      username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
      }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: '',
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      let data: { username: string; files?: File[] } = values
      if (files) data = { ...data, files }
      console.log(data)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUploader
            value={files}
            onValueChange={handleFileChange}
            dropzoneOptions={dropZoneConfig}
            className='relative bg-background border-[.2rem] border-dashed rounded-lg p-2'>
            <FileInput className='outline-dashed outline-1 outline-white'>
              <div className='flex items-center justify-center flex-col pt-3 pb-4 w-full '>
                <FileSvgDraw />
              </div>
            </FileInput>
            <FileUploaderContent>
              {files &&
                files.length > 0 &&
                files.map((file, i) => (
                  <FileUploaderItem key={i} index={i}>
                    <Paperclip className='h-4 w-4 stroke-current' />
                    <span>{file.name}</span>
                  </FileUploaderItem>
                ))}
              {fileErrors.map((error, i) => (
                <p key={i} className='text-sm text-red-500'>
                  {error}
                </p>
              ))}
            </FileUploaderContent>
          </FileUploader>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    )
  },
}
