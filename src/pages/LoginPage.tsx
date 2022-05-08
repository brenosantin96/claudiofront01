import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import logo from './logo.svg'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import '../index.css'
import { api } from '../api';
import { Main } from './MainPage';
import { Button } from 'react-bootstrap';


function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const handleLoginButton = async (e: FormEvent) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const juca = await api.signIn(email, password)
      console.log(juca);
      if (juca.isAdmin === true || juca.isAdmin === '1') {
        let path = `/main`;
        navigate(path);
        return;
      }
      if (juca.isAdmin === false || juca.isAdmin === '0') {
        alert("Sin permiso de acceso");
        return;
      }
    }
    if (email === "" && password === "") {
      alert("Rellene todos los campos!");
      return;
    }
    else {
      alert("Nombre de usuario y / o contraseña incorrectos.");
      return;
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
      <div className="loginContainer container">
        <div>
          <h1 className="titleH1">Login</h1>
        </div>
        <div>
          <form className="loginForm row">
            <input className='col-12' id='emailInput' placeholder='Introduce tu correo electronico' onChange={emailInputValue} type="text" />
            <input className='col-12' id='passInput' placeholder='Introduce tu contraseña' onChange={passwordInputValue} type="password" />
            <Button className="buttonLogin col-12 " variant="primary" type='submit' onClick={handleLoginButton}>Acceso</Button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default LoginPage
