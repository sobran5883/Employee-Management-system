import { NavLink } from 'react-router-dom';
import bg1 from '../assets/home/bg1.png'
import bg2 from '../assets/home/bg2.png'
const Home=()=>{
    return(
        <div className='w-full h-screen bg-[#e5e1e1] flex flex-col items-center'>
            <div className='w-full relative'>
                <img className='absolute right-0 top-0' src={bg1} alt="" />
            </div>
            <div className="flex items-center flex-col text-center pt-12 md:pt-28 pb-20 px-6 md:px-12 relative z-10">
                <h1 className="text-gradient bg-gradient-to-r from-[#4e52c1] to-[#a664ec] text-transparent bg-clip-text py-2 font-bold text-4xl md:px-24">
                   Customer Management System
                </h1>
                <NavLink to="/investment/opportunities/opportunity1"><button  className="bg-[#4E52C1] text-white px-8 py-2 my-12 rounded-3xl text-lg font-semibold">Get Started</button></NavLink>
            </div>
            <div className='w-full relative'>
                <img className='absolute left-0 bottom-0' src={bg2} alt="" />
            </div>
        </div>
    )
}

export default Home;
