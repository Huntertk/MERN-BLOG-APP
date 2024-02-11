import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]:e.target.value.trim()
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      setErrorMessage(null)
      if(!formData.username || !formData.email || !formData.password){
        setErrorMessage("Please Fill all feilds")
        setIsLoading(false)
        return
      }
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 
          'application/json' 
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setIsLoading(false)
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      if(res.ok){
        navigate("/sign-in")
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(data.message)
    }

  }

  return (
    <div className='min-h-screen mt-20 '>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left div */}
        <div className="flex-1">
        <Link 
        to={"/"} 
        className='sm:text-xl font-bold dark:text-white text-4xl'
        >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>TAUFIK's</span>
        Blog
      </Link>
      <p className='text-sm mt-5'>This is Demo Project</p>
        </div>
        {/* right div */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username'/>
              <TextInput 
              type="text" 
              placeholder='Username'
              id='username'
              onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Email'/>
              <TextInput 
              type="email" 
              placeholder='Email'
              id='email'
              onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput 
              type="password" 
              placeholder='Password'
              id='password'
              onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone={'purpleToPink'}
            type='submit'
            disabled={isLoading}
            >
              {isLoading ? (
                <>
                <Spinner size={'sm'} color={'primary'}/>
                <p className='pl-3'>Loading....</p>
              </>
              ) : "Sign Up"}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account ? </span>
            <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color={'failure'}>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignUp