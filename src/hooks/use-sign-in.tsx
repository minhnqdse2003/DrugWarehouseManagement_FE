import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useToast } from './use-toast'
import { QUERY_KEY } from '@/constants'

type SignInProps = {
  email: string
  password: string
}

type SignInResponseProps = {
  email: string
  role: string
  token: string
  refreshToken: string
}

type IUseSignIn = UseMutateFunction<
  SignInResponseProps,
  unknown,
  SignInProps,
  unknown
>

const signIn = async (
  credentials: SignInProps,
): Promise<SignInResponseProps> => {
  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) throw new Error('Failed on sign up request')
  return await response.json()
}

const useSignIn = (): IUseSignIn => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { mutate: signInMutation } = useMutation<
    SignInResponseProps,
    unknown,
    SignInProps,
    unknown
  >({
    mutationFn: (credentials: SignInProps) => signIn(credentials),
    onSuccess: (data: unknown) => {
      queryClient.setQueryData([QUERY_KEY.user], data)
      navigate('/')
    },
    onError: (error: unknown) => {
      toast({
        title: 'Ops.. Error on sign up. Try again!',
        description: error as string,
        variant: 'destructive',
      })
    },
  })

  return signInMutation
}

export default useSignIn
