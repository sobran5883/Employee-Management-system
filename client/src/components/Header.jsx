import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // Make sure this is correct

const Header = () => {
    const { user, loading } = useAuth() || {};  // Safe destructuring with a fallback to an empty object

    if (loading) {
        return <div>Loading...</div>;  // Add a loading state to handle when the data is being fetched
    }

    return (
        <header className="h-20 bg-[#cce7f119] backdrop-blur-md sticky top-0 z-10 flex items-center justify-center">
            <div className="w-10/12 mx-auto flex justify-between">
                <div className="">
                    <Link to="/">
                        <h1 className="text-[#4E52C1] font-bold text-2xl md:text-4xl">
                            C<span className="text-red-600">M</span>
                            <span className="text-[#4E52C1]">S</span>
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <ul className="flex items-center justify-center">
                        {user ? (
                            <li className="text-black font-semibold">Hello, {user.name}</li>
                        ) : (
                            <Link to="/login">
                                <li className="text-black font-semibold border px-4 py-1 border-black rounded-md">Login</li>
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
