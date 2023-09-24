import { ChangeEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [userInputs, setUserInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userInputs;

  const saveUserInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const auth = useAuth();
  if (!auth) return <div>Something is wrong</div>;

  const { signin, signup, logout } = auth;

  const signinWithForm = () => {
    signin(email, password)
  }

  const signupWithForm = () => {
    signup(email, password)
  }


  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>
          email
          <input value={email} name='email' onChange={saveUserInputs} />
        </label>
      </div>
      <div>
        <label>
          password
          <input value={password} name='password' onChange={saveUserInputs} />
        </label>
      </div>
      <div>
        <button onClick={signinWithForm}>로그인</button>
        <button onClick={signupWithForm}>회원가입</button>
        <button onClick={logout}>로그아웃</button>
      </div>
    </form>
  )
}

export default Auth;