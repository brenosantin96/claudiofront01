import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import logo from './logo.svg'
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css'
import { api } from '../api';
import { Link } from 'react-router-dom'
import { Main } from './Main';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButton = async (e: FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const juca = await api.signIn(email, password)
      if(juca.status){
        
      }
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
      <Routes>
        <Route path='/main' element={<Main />} />
      </Routes>

      <div className={styles.loginContainer}>
        <div>
          <h1 className={styles.titleH1}>Login</h1>
        </div>
        <div>
          <form className={styles.loginForm}>
            <input id='emailInput' placeholder='Informe seu email' onChange={emailInputValue} type="text" />
            <input id='passInput' placeholder='Informe sua senha' onChange={passwordInputValue} type="password" />
              <button type='submit' className={styles.buttonLogin} onClick={handleLoginButton}>Entrar</button>
           
          </form>
        </div>
      </div>

    </div>
  )
}

export default App
