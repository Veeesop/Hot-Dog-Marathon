import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Loading from '../Loading/Loading';
import '../RegisterPage/RegisterPage.css'


function RegisterPage() {
  const history = useHistory();

  return (
    <div className='registration-container'>
      <img src="https://fontmeme.com/permalink/220714/b8b39ed9b7d039ac7f95a3727894e309.png" alt="hot-dog-font" border="0"/>
      
      <RegisterForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
