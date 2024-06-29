import { Button } from 'flowbite-react';
import {AiOutlineGoogle} from 'react-icons/ai';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async (e) => {
        const provider = new GoogleAuthProvider();
        //this code allow user to always select account
        provider.setCustomParameters({prompt:"select_account"})

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider) 
            console.log(resultFromGoogle);
            const response = await fetch('/api/auth/google', {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL
                }),
            })
            const data  = await response.json();
            if(response.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Button type='button' outline gradientDuoTone={'pinkToOrange'} onClick={handleGoogleClick}>
        <AiOutlineGoogle className='w-6 h-6 mr-2' />

        Continue with Google
    </Button>
  )
}

export default OAuth