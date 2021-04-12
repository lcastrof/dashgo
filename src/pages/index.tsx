import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Flex, Stack } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().email().required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius="8"
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input name="email" error={errors.email} type="email" label="E-mail" {...register('email')} />
          <Input name="password" error={errors.password} type="password" label="Senha" {...register('password')} />
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={isSubmitting}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
