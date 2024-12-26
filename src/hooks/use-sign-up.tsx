import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useToast } from './use-toast'
import { QUERY_KEY } from '@/constants'

type SignUpProps = {
  email: string
  password: string
}

type SignUpResponseProps = {
  email: string
  token: string
  role: string
  refreshToken: string
}

type IUseSignUp = UseMutateFunction<
  SignUpResponseProps,
  unknown,
  SignUpProps,
  unknown
>

const signIn = async (
  credentials: SignUpProps,
): Promise<SignUpResponseProps> => {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) throw new Error('Failed on sign up request')
  return await response.json()
}

const useSignUp = (): IUseSignUp => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { mutate: signUpMutation } = useMutation<
    SignUpResponseProps,
    unknown,
    SignUpProps,
    unknown
  >({
    mutationFn: (credentials: SignUpProps) => signIn(credentials),
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

  return signUpMutation
}

export default useSignUp
