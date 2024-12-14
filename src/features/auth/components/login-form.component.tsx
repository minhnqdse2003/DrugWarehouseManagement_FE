import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useToast } from '@/hooks/use-toast'

// Improved schema with additional validation rules
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
})

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Assuming an async login function
      toast(
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>,
      )
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed!',
        description: `Failed to submit the form. Please try again.${error}`,
      })
    }
  }

  return (
    <div className='flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='johndoe@mail.com'
                          type='email'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <div className='flex justify-between items-center'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <a
                          href='#'
                          className='ml-auto inline-block text-sm underline'>
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id='password'
                          placeholder='******'
                          autoComplete='current-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' className='w-full'>
                  Login
                </Button>
                <Button variant='outline' className='w-full'>
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <a href='#' className='underline'>
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
