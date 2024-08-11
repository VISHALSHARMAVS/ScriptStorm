import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            return setError('Please fill out all fields.');
        }

        setLoading(true);
        setError(null);

        try {
            
            const res = await axios.post('http://localhost:3000/api/v1/auth/signup', {
                username,
                email,
                password
            });

            

            // Handle successful signup
            if (res.data.message === 'User registered successfully') {
                // Redirect or show success message
                setLoading(false)
                navigate('/');
            }
        } catch (err) {
            // Extract error message based on the response structure
            const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
            setError(errorMessage);
            setLoading(false);
        } 
    };

    return (
        <div className="max-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                    <Link
                        to="/"
                        className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white"
                    >
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                            ScriptStorm
                        </span>
                    </Link>
                    <p className="text-sm mt-5">
                        This is a demo project. You can sign up with your email and password.
                    </p>
                </div>
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 rounded w-full max-w-sm mx-auto">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">Your Username:</label>
                            <input
                                onChange={(e) => setUsername(e.target.value.trim())}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="username"
                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Your Email:</label>
                            <input
                                onChange={(e) => setEmail(e.target.value.trim())}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email"
                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Your Password:</label>
                            <input
                                onChange={(e) => setPassword(e.target.value.trim())}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="password"
                                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="flex gap-2 text-sm mx-6 mt-4">
                        <span>Have an account?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                    </div>
                    {error && (
                        <div className="mt-5 p-4 bg-red-500 text-white rounded-md">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;
