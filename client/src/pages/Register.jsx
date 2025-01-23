import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to register");

            console.log("User registered successfully:", data);
            navigate("/login"); // Navigate to login page upon successful registration
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='border p-3 rounded-lg'
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='border p-3 rounded-lg'
                />
                <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className='border p-3 rounded-lg'
                >
                    <option value="">Select Role</option>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className='border p-3 rounded-lg'
                />
                <button
                    type="submit"
                    disabled={loading}
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={"/login"}>
                    <span className='text-blue-700'>Login</span>
                </Link>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
