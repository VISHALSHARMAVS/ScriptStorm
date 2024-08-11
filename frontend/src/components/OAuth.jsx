import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/feature/userSlice";

export default function OAuth() {
    const dispatch = useDispatch()
    const auth = getAuth(app);
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            // Sign in with Google
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const { user } = resultFromGoogle;
            const { email, displayName, photoURL } = user;

            // Send user data to the server
            const res = await axios.post('http://localhost:3000/api/v1/auth/google', {
                email,
                name: displayName,
                googlePhotoUrl: photoURL
            });

            if (res.status >= 200 && res.status < 300) {
                dispatch(signInSuccess(res.data))
                navigate('/');
            } else {
                console.error('Failed to authenticate:', res.statusText);
            }
           
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    return (
        <button 
            onClick={handleGoogleClick} 
            className="flex items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-orange-500 hover:to-pink-500"
        >
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
        </button>
    );
}
