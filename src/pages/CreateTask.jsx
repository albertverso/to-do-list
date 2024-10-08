import { useState } from "react";
import { IoAddCircle, IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { createTask } from "../services/taskService";
import { BsArrowClockwise } from "react-icons/bs";
import { decodedFromToken } from './../services/authService';

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [itemTasks, setItemTasks] = useState([{ title: '' }]); // Inicia com um itemTask vazio
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = decodedFromToken();

    const handleAddItemTask = () => {
        setItemTasks([...itemTasks, { title: '' }]); // Adicionando um novo objeto com title vazio
    };

    const handleInputChange = (index, e) => {
        const newItemTasks = [...itemTasks];
        newItemTasks[index].title = e.target.value; // Atualizando a propriedade title
        setItemTasks(newItemTasks);
    };

    // Remove um input de itemTask, mas mantém pelo menos um
    const handleRemoveItemTask = (index) => {
        if (itemTasks.length > 1) {
            const newItemTasks = itemTasks.filter((_, i) => i !== index);
            setItemTasks(newItemTasks); // Remove o itemTask do array
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (itemTasks.length < 1 || itemTasks.some(item => item.title.trim() === '')) {
            setErrorMessage("A tarefa precisa ter pelo menos um item com título.");
            return;
        }

        setLoading(true);
    
        const newTask = {
            title: title,       
            description: description, 
            userId: userId,          
            taskItems: itemTasks   
        };
    
        try {
            await createTask(newTask, token); 
            navigate("/Home");
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleCreateTask} className="flex flex-col px-8 md:px-32 gap-5 mt-10 w-full">
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold dark:text-white '>Título *</label>
                    <input
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full'
                        type="text"
                        placeholder="Nome"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={20}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold dark:text-white '>Descrição *</label>
                    <textarea
                        className='focus:outline-[#ab92bf] text-black bg-slate-200 p-2 rounded-md w-full'
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={220}
                        required
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold dark:text-white '>Itens da tarefa *</label>
                    {itemTasks.map((itemTask, index) => (
                        <div key={index} className="flex flex-row items-center">
                            <input
                                className='focus:outline-[#ab92bf] w-full text-black bg-slate-200 p-2 rounded-md'
                                type="text"
                                placeholder="Item da tarefa"
                                value={itemTask.title}
                                onChange={(e) => handleInputChange(index, e)}
                                required
                            />
                            {itemTasks.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveItemTask(index)}
                                    className="ml-2 text-red-500"
                                >
                                    <IoCloseSharp size={20} />
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleAddItemTask}
                            className="text-[#ab92bf] outline-none hover:text-[#655a7c] p-2 mb-4"
                        >
                            <IoAddCircle size={30} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    type='submit'
                    disabled={loading}
                    className={`w-full md:max-w-[200px] flex items-center justify-center bg-[#ab92bf] rounded-md p-2 font-bold text-white hover:bg-[#655a7c] ${loading && 'cursor-not-allowed bg-[#655a7c]'}`}
                >
                    {loading ? (
                        <div className="animate-spin text-light mr-3">
                            <BsArrowClockwise size={20}/>
                        </div>
                    ) : (
                        'Criar Tarefa'
                    )}
                </button>
            </div>
            {errorMessage && <p className='text-[#655a7c] font-semibold text-lg text-center animate-pulse'>{errorMessage}</p>}
        </form>
    );
}
