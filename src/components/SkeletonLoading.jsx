import { useLocation } from "react-router-dom";

export default function SkeletonLoading() {
    const location = useLocation();
   
    return(
        <div  className='px-8 md:px-32 gap-5 mt-10 justify-items-center grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mb-20'> {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="py-2 w-full">
                <div className="animate-pulse bg-gray-300 h-64 rounded-md" />
            </div>
        ))}</div>
    )
}