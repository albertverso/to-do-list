import { HiHeart, HiOutlineHeart, HiOutlinePencilAlt } from "react-icons/hi";
import CircularProgress from './CircularProgress';
import { useState } from "react";

export default function Notes() {
    const [fav, setFav] = useState(false)

    return (
        <div className="flex flex-col rounded-2xl bg-[#ab92bf] w-full min-h-96 p-8 overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-600">
            <div className="flex flex-row items-center justify-between">
                <p className="text-3xl font-semibold">Programar</p>
                <button className="outline-none hover:text-[#AFC1D6]" onClick={() => setFav(!fav)}>
                    {
                        fav ? 
                        <HiHeart size={30} className=""/>
                        :
                        <HiOutlineHeart size={30} className=""/> 
                    }
                </button>
            </div>
            <div className="text-xl px-2 mt-5 break-words">
                <p>
                    sdfsdfsdfsdfsdfsdfsdfsdddddddddddddddddsdfsdfsdfsdfsdfsdfsdfnonowenfowenfokenmkfnl
                    skdnflk
                </p>
            </div>
            <div className="flex flex-row mt-auto items-center justify-between ">
                <CircularProgress/>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-[#AFC1D6]">New!</p>
                    <p className="font-semibold"> 12 Sep. 2024</p>
                </div>
                <button className=" outline-none hover:text-[#AFC1D6]">
                    <HiOutlinePencilAlt size={30}/>
                </button>
            </div>
        </div>
    )
}