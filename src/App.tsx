import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { api } from './api';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButton = async (e: FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const juca = await api.signIn(email, password)
      console.log(juca);
    } else {
      alert("Preencha todos os campos!")
    }
  }


  const emailInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const passwordInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }


  return (
    <div>
      <div className='loginContainer'>
        <div>
          <h1 className='text-5xl'>Login</h1>
        </div>
        <div>
          <form className='loginForm'>
            <input id='emailInput' placeholder='Informe seu email' onChange={emailInputValue} className='placeholder-gray-500 placeholder-opacity-50' type="text" />
            <input id='passInput' placeholder='Informe sua senha' onChange={passwordInputValue} className='placeholder-gray-500 placeholder-opacity-50' type="password" />
            <button type='submit' className='buttonLogin' onClick={handleLoginButton}>Entrar</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default App
