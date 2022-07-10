import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import '../RegisterPage/RegisterPage.css'


function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <img src="https://fontmeme.com/permalink/220709/fcd6d7f7880d1a6fbb631c061ae68e5c.png" alt="hot-dog-font" border="0"/>
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
