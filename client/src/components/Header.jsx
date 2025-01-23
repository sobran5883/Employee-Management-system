import { Link } from "react-router-dom";
const Header=()=>{
    return(
        <header className="h-20 bg-[#cce7f119] backdrop-blur-md sticky top-0 z-50 flex items-center justify-center">
            <div className="w-10/12 mx-auto flex justify-between">
                <div className="">
                    <Link to='/'>
                        <h1 className="text-[#4E52C1] font-bold text-2xl md:text-4xl">C<span className="text-red-600">M</span><span className="text-[#4E52C1]">S</span></h1>
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <ul className="flex items-center justify-center">
                        <Link to='/login'>
                            <li className='text-black font-semibold border px-4 py-1 border-black rounded-md'>Login</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;