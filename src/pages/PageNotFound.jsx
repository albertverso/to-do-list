import { GiGhost } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


export default function PageNotFound(){
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
    return (
        <div className="flex w-full mt-52 items-center justify-center text-center">
          <div className="flex flex-col gap-10">
            <p className="text-2xl font-bold text-text-[#ab92bf]">Ops! Página não encontrada!</p>
            <div className="flex flex-col justify-center items-center gap-10">
                <GiGhost className="text-[#ab92bf] hover:scale-125 transition-transform duration-600" size={100}/>
                <button onClick={handleClick}>
                    <HiHome size={30} className="hover:text-[#ab92bf]"/>
                </button>
            </div>
          </div>
        </div>
    )
}