import { HiOutlinePlusSm } from 'react-icons/hi';
import Notes from '../components/Notes';

export default function Home() {
    return (
        <div>
            <section className='px-8 md:px-32 gap-5 mt-10 justify-items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mb-20'>
                <Notes />
                <Notes />
                <Notes />
                <Notes />
                <button className='w-full min-h-96 outline-none bg-[#AFC1D6] flex items-center justify-center rounded-xl hover:shadow-2xl hover:scale-105 transition-transform duration-600'>
                    <HiOutlinePlusSm size={40} />
                </button>
            </section>
        </div>
    )
}