import { Button } from 'flowbite-react';
import {AiOutlineGoogle} from 'react-icons/ai';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';

const OAuth = () => {
    const auth = getAuth(app);

    const handleGoogleClick = async (e) => {
        const provider = new GoogleAuthProvider();
        //this code allow user to always select account
        provider.setCustomParameters({prompt:"select_account"})

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider) 
            console.log(resultFromGoogle);
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