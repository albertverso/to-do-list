import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BsArrowClockwise, BsEye, BsEyeSlash } from "react-icons/bs";
import { decodedFromToken } from './../services/authService';
import { getUser, updateUser } from "../services/userService";
import { TbUpload } from "react-icons/tb";
import CircularProgress from "../components/CircularProgress";
import blank from '../assets/fundo.png'
import { getAllTask } from "../services/taskService";
import img0 from "../assets/0.png"
import img10 from "../assets/1.png"
import img20 from "../assets/2.png"
import img30 from "../assets/3.png"
import img40 from "../assets/4.png"
import img50 from "../assets/5.png"
import img60 from "../assets/6.png"
import img70 from "../assets/7.png"
import img80 from "../assets/8.png"
import img90 from "../assets/9.png"
import img100 from "../assets/10.png"

export default function Profile() {
   
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepite, setPasswordRepite] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = decodedFromToken();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepite, setShowPasswordRepite] = useState(false);
    const [completedPercentage, setCompletedPercentage] = useState(0);

    const images = [img0,img10, img20, img30, img40, img50, img60, img70, img80, img90, img100];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const data = await getUser(userId, token);
                setLastName(data.lastName);
                setEmail(data.email);
                setProfilePic(data.profilePic);
                setFirstName(data.firstName);

                // Se a imagem do perfil já estiver no formato base64, pode ser convertida em URL
                if (data.profilePic) {
                    setProfilePicUrl(data.profilePic);
                }
            } catch (error) {
                setErrorMessage("Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        };

        const fetchTasks = async () => {
            try {
                const data = await getAllTask(userId, token);
                const completedTasks = data.filter(task => task.progress === 100);
                // Calcular a porcentagem de tasks concluídas
                const percentage = (completedTasks.length / data.length) * 100;
                // Armazenar o valor da porcentagem no estado
                setCompletedPercentage(percentage);
            } catch (error) {
                setError('Erro ao buscar tarefas');
            } finally {
                setLoading(false);
            }
        };

        

        fetchTasks();
        fetchUserData();
    }, [userId, token]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        // Criação do FormData contendo todos os campos
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('profilePic', profilePic);  // Certifique-se de que a chave seja 'file', ou o que seu backend espera
    
        try {
            // Envia o FormData diretamente
            await updateUser(userId, formData, token);
            navigate("/Home");
        } catch (error) {
            setErrorMessage("Erro ao atualizar perfil");
        } finally {
            setLoading(false);
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

// Calcular qual imagem deve ser exibida (de 0 a 10, representando de 0% a 100%)
  const imageIndex = Math.floor(completedPercentage / 10); // Divide por 10 e arredonda para baixo

    return (
        <form onSubmit={handleUpdateUser} className="flex flex-col px-8 md:px-32 gap-5 mt-10 w-full">
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4 mb-10'>
                <div className='flex flex-col gap-4 justify-center items-center col-span-2'>
                    <section className='flex flex-row rounded-3xl h-full px-2 py-4 gap-10 '>
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
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold'>Nome*</label>
                    <input
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full'
                        type="text"
                        placeholder="Nome"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        maxLength={20}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold'>Sobrenome*</label>
                    <input
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full'
                        type="text"
                        placeholder="Sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        maxLength={20}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4 col-span-1 lg:col-span-2'>
                    <label className='font-bold'>Email*</label>
                    <input
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full cursor-not-allowed'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={20}
                        disabled
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
                <div className='flex flex-col gap-4'>
                    <label className='font-bold'>Repita sua senha *</label>
                    <div className='flex flex-row w-full items-center bg-slate-200 border-2 focus-within:border-[#ab92bf] focus-within:text-[#ab92bf] rounded-md'>
                        <input
                            className='w-full outline-none text-black bg-slate-200 p-2 rounded-md'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Repita sua senha"
                            value={passwordRepite}
                            onChange={(e) => setPasswordRepite(e.target.value)}
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
            <div className='flex flex-col items-center justify-center font-semibold relative lg:col-span-2'>
                    <p>Total de tarefas concluidas!</p>
                    <CircularProgress progress={completedPercentage} stroke={10} radius={100} />
                    <img src={images[imageIndex]} alt={`Progresso: ${completedPercentage}%`} width={70} className="absolute" />
            </div>
            <div className="flex justify-center">
                <button
                    type='submit'
                    disabled={loading}
                    className={`w-full md:max-w-[200px] flex items-center justify-center mt-5 bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading && 'cursor-not-allowed bg-[#655a7c]'}`}
                >
                    {loading ? (
                   
                        <div className="animate-spin text-light mr-3">
                            <BsArrowClockwise size={20} />
                        </div>
                    ) : (
                        'Salvar'
                    )}
                </button>
            </div>
            {errorMessage && <p className='mt-5 text-[#ab92bf] text-lg text-center animate-pulse'>{errorMessage}</p>}

        </form>
    );
}
