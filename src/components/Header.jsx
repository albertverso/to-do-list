import Sidebar from './../components/Sidebar';
import icon from '../assets/to-do-list.svg'

export default function Header() {
    return (
        <header className=" items-center flex flex-row px-8 md:px-32">
                <Sidebar />
                <div className="flex flex-col border-b-2 border-[#ab92bf] w-full ">
                    <div className="flex flex-row items-center py-8">
                        <p className="text-4xl font-bold ml-16 md:ml-0 text-[#655a7c]">To-Do List</p>
                        <img src={icon} alt="" width={40} className='ml-auto' />
                    </div>
                </div>
        </header>
    )
}