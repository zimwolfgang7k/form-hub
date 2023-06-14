import { useForm } from 'react-hook-form';
import { ICreateUser } from './types';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const Formulary = () => {
    const createUserFormSchema = z.object({
        name: z
            .string()
            .nonempty('Nome é obrigatório')
            .min(1)
            .max(18)
            .transform(name => {
                return name
                    .trim()
                    .split(' ')
                    .map(word => {
                        return word[0].toUpperCase().concat(word.substring(1));
                    })
                    .join(' ');
            }),
        secondName: z
            .string()
            .nonempty('Sobrenome é obrigatório')
            .min(1)
            .max(18)
            .transform(secondName => {
                return secondName
                    .trim()
                    .split(' ')
                    .map(word => {
                        return word[0].toUpperCase().concat(word.substring(1));
                    })
                    .join(' ');
            }),
        email: z
            .string()
            .toLowerCase()
            .nonempty('Email é obrigatório')
            .email('Email invalido'),
        tel: z
            .string()
            .nonempty('Telefone é obrigatório')
            .min(10)
            .regex(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
            ),
        password: z.string().nonempty('Senha é obrigatória').min(8),
        confirmPassword: z.string(),
        inputRadios: z.string().nonempty('Por favor selecione algum genero'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
    });

    type CreateUserFormData = z.infer<typeof createUserFormSchema>;

    const createUser = (data: any) => {
        console.log(data);
    };

    return (
        <div className="w-2/4 bg-white p-14">
            <header className="flex justify-between items-center">
                <h1 className="font-bold text-4xl">Cadastre-se</h1>
                <button className="bg-purple-500 text-white p-1 pl-6 pr-6 rounded-md font-semibold">
                    Entrar
                </button>
            </header>
            <div className="w-24 bg-purple-500 h-2 rounded-full mt-3"></div>

            <form
                onSubmit={handleSubmit(createUser)}
                action=""
                className="mt-10 h-3/4 flex flex-wrap items-center gap-5 justify-between"
            >
                <div className="flex flex-col gap-2 w-2/5">
                    <label htmlFor="name" className="font-semibold">
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="h-16 border-solid border-2 border-gray-400 rounded-md p-5 shadow-md"
                        placeholder="Digite seu primeiro nome"
                        {...register('name')}
                    />
                    {errors.name && (
                        <span className="text-red-600">
                            {errors.name.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                    <label htmlFor="second-name" className="font-semibold">
                        Sobrenome
                    </label>
                    <input
                        id="second-name"
                        type="text"
                        placeholder="Digite seu sobrenome"
                        className="h-16 border-solid border-2 border-gray-400 rounded-md p-5 shadow-md"
                        {...register('secondName')}
                    />
                    {errors.secondName && (
                        <span className="text-red-600">
                            {errors.secondName.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                    <label htmlFor="email" className="font-semibold">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="h-16 border-solid border-2 border-gray-400 rounded-md p-5 shadow-md"
                        {...register('email')}
                    />
                    {errors.email && (
                        <span className="text-red-600">
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                    <label htmlFor="tel" className="font-semibold">
                        Celular
                    </label>
                    <input
                        id="tel"
                        type="tel"
                        placeholder="(XX) XXXXX-XXXX"
                        className=" h-16 border-solid border-2 border-gray-400 rounded-md p-5 shadow-md"
                        {...register('tel')}
                    />
                    {errors.tel && (
                        <span className="text-red-600">
                            {errors.tel.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-2/5">
                    <label htmlFor="password" className="font-semibold">
                        Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Digite a sua senha"
                        className=" h-16 border-solid border-2 border-gray-400 rounded-md p-5 shadow-md"
                        {...register('password')}
                    />
                    {errors.password && (
                        <span className="text-red-600">
                            {errors.password.message}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-2/5">
                    <label htmlFor="confirmPassword" className="font-semibold">
                        Confirme sua Senha
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Digite a sua senha novamente"
                        className="h-16 border-solid border-2 border-gray-400 rounded-md p-5 shadow-md"
                        {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-600">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                <div className="w-full">
                    <p className="font-semibold mb-2">Gênero</p>

                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <input
                                type="radio"
                                value="woman"
                                id="woman"
                                checked
                                {...register('inputRadios')}
                            />
                            <label htmlFor="woman" className="font-semibold">
                                Feminino
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="radio"
                                value="man"
                                id="man"
                                {...register('inputRadios')}
                            />
                            <label htmlFor="man" className="font-semibold">
                                Masculino
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="radio"
                                value="other"
                                id="others"
                                {...register('inputRadios')}
                            />
                            <label htmlFor="others" className="font-semibold">
                                Outro
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <input
                                type="radio"
                                value="rather_not_say"
                                id="rather_not_say"
                                {...register('inputRadios')}
                            />
                            <label
                                htmlFor="rather_not_say"
                                className="font-semibold"
                            >
                                Prefiro não dizer
                            </label>
                        </div>
                    </div>
                    <button className="w-full bg-purple-500 text-white font-semibold rounded-md h-12 mt-8">
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
};

export { Formulary };
