import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import gmail from '../assets/gmail.svg'
import icon from '../assets/to-do-list.svg'
import { authLogin, isAuthenticated } from '../services/authService';
import { useLocation } from 'react-router-dom';
import { BsArrowClockwise, BsEye, BsEyeSlash } from "react-icons/bs";
import { createAccount } from "../services/createUserService";
import Cover from '../components/Cover';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepite, setPasswordRepite] = useState('');
    const [name, setName] = useState('');
    
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [isSighUp, setIsSighUp] = useState(false || location.state?.loginRequested);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const data = await authLogin(email, password);
            if (isAuthenticated) {
                navigate('/Home');
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAccount = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
    
        // Verifica se as senhas são iguais
        if (password !== passwordRepite) {
            setErrorMessage('Senhas diferentes! Tente Novamente');
            setLoading(false);
            return; // Interrompe o processo se as senhas não forem iguais
        }
    
        try {
            const userData = { firstName, lastName, email, password };
            await createAccount(userData); // Tenta criar o usuário
    
            // Se a conta for criada com sucesso, redireciona para a página de login
            try {
                const data = await authLogin(email, password);
                if (isAuthenticated) {
                    navigate('/Home');
                } else {
                    setErrorMessage(data.message);
                }
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        } catch (error) {
            // Exibe a mensagem de erro caso haja uma falha ao criar a conta
            setErrorMessage('Falha ao Criar Conta. Verifique e tente novamente.');
        } finally {
            // Finaliza o estado de loading, independentemente de sucesso ou erro
            setLoading(false);
        }
    };
    

    return (
        <body class="flex lg:h-screen items-center justify-center ">
            <div className="w-10/12 h-full p-5 bg-white hidden xl:flex">
                {/* <img className="w-full h-full rounded-[40px] p-5" src={image} alt="" /> */}
                < Cover/>
            </div>
            <div class="xl:w-3/12 h-full flex flex-col items-center pt-14 break-normal" >
                <div className='flex items-center mb-5'>
                    <img src={icon} alt="" width={70}/>
                </div>
                <div className='flex flex-col gap-5'>
                    <p className='text-3xl font-bold'>{!isSighUp ? 'Acesse sua conta' : 'Crie sua conta'}</p>
                    <p>{!isSighUp ? 'Novo cliente? Então registre-se' : 'Já possui uma conta? Entre'} <a onClick={() => setIsSighUp(!isSighUp)} className=' underline cursor-pointer' >aqui.</a></p>
                </div>
                <div class="flex mt-5">
                    {isSighUp ?
                        <form onSubmit={handleCreateAccount}>
                            <div className='flex flex-col gap-4 mb-5'>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-bold'>Nome *</label>
                                    <input
                                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md'
                                        type="text"
                                        placeholder="Nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-bold'>Email *</label>
                                    <input
                                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md'
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-bold'>Senha *</label>
                                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                                        <input 
                                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md' 
                                            type={showPassword ? 'text' : 'password'} 
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required 
                                        />
                                         {
                                            showPassword ?
                                                <BsEye size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(false)}/>
                                            : 
                                                <BsEyeSlash size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(true)}/>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-bold'>Repita sua senha *</label>
                                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                                        <input 
                                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md' 
                                            type={showPassword ? 'text' : 'password'} 
                                            placeholder="Repita sua senha"
                                            value={passwordRepite}
                                            onChange={(e) => setPasswordRepite(e.target.value)}
                                            required 
                                        />
                                         {
                                            showPassword ?
                                                <BsEye size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(false)}/>
                                            : 
                                                <BsEyeSlash size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(true)}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button type='submit' disabled={loading} className={`w-full mt-5 bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading && 'cursor-not-allowed bg-[#655a7c]'}`}>
                                {loading ? (
                                    <span className="flex items-center text-light justify-center">
                                        <div className="animate-spin text-light mr-3">
                                            <BsArrowClockwise />
                                        </div>
                                        Carregando...
                                    </span>
                                ) : (
                                    'Criar Conta'
                                )}
                            </button>
                            {errorMessage && <p className='mt-5 text-[#ab92bf] text-lg text-center animate-pulse'>{errorMessage}</p>}
                        </form>
                        :
                        <form onSubmit={handleLogin}>
                            <div className='flex flex-col gap-4 mb-5'>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-bold'>Login *</label>
                                    <input
                                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md'
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-bold'>Senha *</label>
                                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                                        <input
                                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        {
                                            showPassword ?
                                                <BsEye size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(false)} />
                                                :
                                                <BsEyeSlash size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(true)} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <a href="" className='underline'>Esqueci minha senha</a>
                            <button type='submit' disabled={loading} className={`w-full mt-5 bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading && 'cursor-not-allowed bg-[#655a7c]'}`}>
                                {loading ? (
                                    <span className="flex items-center text-light justify-center">
                                        <div className="animate-spin text-light mr-3">
                                            <BsArrowClockwise />
                                        </div>
                                        Carregando...
                                    </span>
                                ) : (
                                    'Acessar Conta'
                                )}
                            </button>
                            {errorMessage && <p className='mt-5 text-[#655a7c] text-lg text-center animate-pulse'>{errorMessage}</p>}
                        </form>
                    }
                </div>
                <div className='flex flex-row items-center justify-center mt-5 gap-5'>
                    <p>Ou faça login com</p>
                    <a href="">
                        <img src={gmail} alt="" />
                    </a>
                </div>
            </div>

        </body>
    )
}