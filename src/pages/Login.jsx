import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import gmail from '../assets/gmail.svg'
import icon from '../assets/to-do-list.svg'
import { authLogin, isAuthenticated } from '../services/authService';
import { useLocation } from 'react-router-dom';
import { BsArrowClockwise, BsEye, BsEyeSlash } from "react-icons/bs";
import { createAccount, createAccountGoogle } from "../services/userService";
import Cover from '../components/Cover';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import blank from '../assets/fundo.png'
import { TbUpload } from 'react-icons/tb';
import '../styles/index.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepite, setPasswordRepite] = useState('');
    const [name, setName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [isSighUp, setIsSighUp] = useState(false || location.state?.loginRequested);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepite, setShowPasswordRepite] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            await authLogin(email, password);
            if (isAuthenticated) {
                navigate('/Home');
            } else {
                setErrorMessage("Usuário ou senha incorretos!");
            }
        } catch (error) {
            setErrorMessage("Erro!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async (data) => {
        const decodedToken = jwtDecode(data.credential);
        const { email, given_name, family_name, sub, picture } = decodedToken; // Supondo que o token contém o email e o nome do usuário
        setLoading(true);
        setErrorMessage('');

        try {
            await authLogin(email, sub);
            if (isAuthenticated) {
                navigate('/Home');
            }
        } catch {
            try {
                const userData = { firstName: given_name, lastName: family_name, email: email, password: sub, profilePic: picture };
                
                await createAccountGoogle(userData); // Tenta criar o usuário
                // Se a conta for criada com sucesso, redireciona para a página de login
                try {
                    await authLogin(email, sub);
                    if (isAuthenticated) {
                        navigate('/Home');
                    } else {
                        setErrorMessage("Usuário ou senha incorretos!");
                    }
                } catch (error) {
                    setErrorMessage(error.message);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        } finally {
            setLoading(false);
        }
         
    };


    const handleCreateAccount = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Verifica se as senhas coincidem
        if (password !== passwordRepite) {
            setErrorMessage('As senhas não coincidem!');
            setLoading(false);
            return;
        }

        try {
            // Configura o FormData para envio ao backend
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('firstName', name);

            if (profilePic) {
                formData.append('profilePic', profilePic);
            } else {
                formData.append('profilePic', null)
            }

            await createAccount(formData); // Captura a resposta da criação da conta

            // Autentica o usuário automaticamente após a criação da conta
            try {
                await authLogin(email, password); // Faz o login
                if (isAuthenticated) {
                    navigate('/Home'); // Redireciona para a página inicial se autenticado
                } else {
                    setErrorMessage('Usuário ou senha incorretos!');
                }
            } catch (error) {
                setErrorMessage('Falha ao autenticar. Verifique suas credenciais.');
            }
        } catch (error) {
            setErrorMessage('Erro ao criar a conta. Tente novamente.');
        } finally {
            setLoading(false); // Oculta o indicador de carregamento
        }
    };



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);

            // Cria a URL da imagem selecionada
            const url = URL.createObjectURL(file);
            setProfilePicUrl(url);

            // Limpa a URL quando o componente for desmontado
            return () => URL.revokeObjectURL(url);
        }
    };

    return (
        <body class="flex items-center justify-center min-h-screen max-xl:bg-gradiente-login dark:max-xl:bg-gradiente-login-dark overflow-hidden lg:bg-white dark:bg-[#190028]">
            <div className="w-10/12 h-full p-5 bg-white dark:bg-[#190028] hidden xl:flex">
                {/* <img className="w-full h-full rounded-[40px] p-5" src={image} alt="" /> */}
                < Cover />
            </div>
            <div class="xl:w-3/12 pt-10 lg:mt-0 h-full flex flex-col items-center lg:pt-2 break-normal mb-5 lg:mb-0 dark:bg-[#]" >
                {!isSighUp &&
                    <div className='flex items-center mb-2'>
                        <img src={icon} alt="" width={70} />
                    </div>
                }
                <div className='flex flex-col items-center justify-center gap-2 dark:text-white'>
                    <p className='text-3xl font-bold'>{!isSighUp ? 'Acesse sua conta' : 'Crie sua conta'}</p>
                    <p>{!isSighUp ? 'Novo cliente? Então registre-se' : 'Já possui uma conta? Entre'} <a onClick={() => setIsSighUp(!isSighUp)} className=' underline cursor-pointer' >aqui.</a></p>
                </div>
                <div class="flex mt-5">
                    {isSighUp ?
                        <form onSubmit={handleCreateAccount}>
                            <div className='flex flex-col gap-4 mb-5'>
                                <section className='flex flex-row items-center justify-center rounded-3xl h-full gap-10'>
                                    <div className='w-32 h-32 bg-white rounded-full relative flex items-center justify-center'>
                                        {profilePicUrl ? (
                                            <img
                                                src={profilePicUrl}
                                                alt="Perfil"
                                                className="absolute inset-0 w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={blank}
                                                alt="Perfil"
                                                className="absolute inset-0 w-full h-full rounded-full object-cover"
                                            />
                                        )}
                                        <label className="absolute left-24 top-20 bg-[#ab92bf] z-10 rounded-full p-2 font-bold text-white hover:bg-[#655a7c] cursor-pointer">
                                            <TbUpload size={20} className="z-10" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden z-10"
                                                onChange={handleImageUpload}
                                            />
                                        </label>
                                    </div>
                                </section>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold dark:text-white'>Nome *</label>
                                    <input
                                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md'
                                        type="text"
                                        placeholder="Nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold dark:text-white'>Email *</label>
                                    <input
                                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md'
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold dark:text-white'>Senha *</label>
                                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                                        <input
                                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Senha"
                                            value={password}
                                            maxLength={20}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}
                                        />
                                        {
                                            showPassword ?
                                                <BsEye size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(false)} />
                                                :
                                                <BsEyeSlash size={22} className='mr-5 cursor-pointer' onClick={() => setShowPassword(true)} />
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold dark:text-white'>Repita sua senha *</label>
                                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                                        <input
                                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md'
                                            type={showPasswordRepite ? 'text' : 'password'}
                                            placeholder="Repita sua senha"
                                            value={passwordRepite}
                                            maxLength={20}
                                            onChange={(e) => setPasswordRepite(e.target.value)}
                                            required
                                            style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}
                                        />
                                        {
                                            showPasswordRepite ?
                                                <BsEye size={22} className='mr-5 cursor-pointer' onClick={() => setShowPasswordRepite(false)} />
                                                :
                                                <BsEyeSlash size={22} className='mr-5 cursor-pointer' onClick={() => setShowPasswordRepite(true)} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                disabled={loading}
                                className={`w-full mt-2 bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading ? 'cursor-not-allowed bg-[#655a7c]' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <BsArrowClockwise className="animate-spin" size={20} />
                                    </div>
                                ) : (
                                    'Criar Conta'
                                )}
                            </button>

                        </form>
                        :
                        <form onSubmit={handleLogin}>
                            <div className='flex flex-col gap-4 mb-5'>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold dark:text-white'>Login *</label>
                                    <input
                                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md'
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-bold dark:text-white'>Senha *</label>
                                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                                        <input
                                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            style={{ WebkitAppearance: "none", MozAppearance: "none", appearance: "none" }}
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
                            <a href="" className='underline dark:text-white hover:text-[#ab92bf]'>Esqueci minha senha</a>
                            <button
                                type='submit'
                                disabled={loading}
                                className={`w-full mt-2 bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading ? 'cursor-not-allowed bg-[#655a7c]' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <BsArrowClockwise className="animate-spin" size={20} />
                                    </div>
                                ) : (
                                    'Acessar Conta'
                                )}
                            </button>
                        </form>
                    }
                </div>
                {errorMessage && <p className=' text-[#655a7c] font-semibold text-lg text-center animate-pulse'>{errorMessage}</p>}
                <div className='flex flex-row items-center justify-center mt-2 gap-5'>
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        handleGoogle(credentialResponse)
                    }
                    }
                        onError={() => {
                            console.log('Login Failed');
                        }} />

                </div>
            </div>

        </body>
    )
}