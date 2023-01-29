import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { Container, Form, FormError, Header } from './styles'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const registerFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'O usuário precisa ter pleo menos 3 letas.' })
        .regex(/ˆ([a-z\\-]+)$/i, { message: 'O usuário pode ter apenas letras e hífens.' })
        .transform(username => username.toLowerCase()),
    name: z.string()
        .min(3, { message: 'O usuário precisa ter pleo menos 3 letas.' })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: ''
        }
    })

    useEffect(() => {
        if (router.query?.username) {
            setValue('username', String(router.query?.username))
        }
    }, [router.query?.username])

    async function handleRegister(data: RegisterFormData) {

    }

    return (
        <Container>
            <Header>
                <Heading as="strong">
                    Bem-vindo ao Ignite Call!
                </Heading>

                <Text>
                    Precisamos de algumas informações para criar seu perfil!
                    Ah, você pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Home de usuário</Text>
                    <TextInput
                        prefix='ingnite.com/'
                        placeholder='seu-usuário'
                        {...register('username')}
                    />

                    {errors.username && (
                        <FormError size='sm'>{errors.username.message}</FormError>
                    )}
                </label>

                <label>
                    <Text size="sm">Nome completo</Text>
                    <TextInput
                        placeholder='Seu nome'
                        {...register('name')}
                    />

                    {errors.name && (
                        <FormError size='sm'>{errors.name.message}</FormError>
                    )}
                </label>

                <Button type='submit'>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    );
}