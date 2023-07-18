import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { authService } from '../fbase';

type AuthInputs = {
  email: string;
  password: string;
};

enum AuthErrorType {
  'UER_EXIST' = 'auth/email-already-in-use',
  'USER_NOT_FOUND' = 'auth/user-not-found',
  'WRONG_PASSWORD' = 'auth/wrong-password',
  'TOO_MANY_REQUESTS' = 'auth/too-many-requests',
  'EXIST_DIFFERENT_CREDENTIAL' = 'auth/account-exists-with-different-credential',
}

type AuthErrors = {
  message: string;
  code: string;
};

function Auth() {
  const [newAccount, setNewAccount] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const toggleAccount = () => setNewAccount((prev) => !prev);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputs>({ mode: 'onChange' });
  // const onChange = (e: React.FormEvent<HTMLInputElement>) => {};
  // const onSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  const onEmailLogin = async () => {
    const { email, password } = getValues();
    if (newAccount) {
      // create account
      try {
        const user = await createUserWithEmailAndPassword(authService, email, password);
        setAuthError(null);
        console.log('created and login', user);
      } catch (err) {
        switch ((err as AuthErrors).code) {
          case AuthErrorType.UER_EXIST:
            setAuthError('Account already in use');
            setNewAccount(false);
            break;
          case AuthErrorType.TOO_MANY_REQUESTS:
            setAuthError('Too many requests were made. Please use it later');
            break;
          default:
            console.log('Unexpected create account', err);
        }
      }
    } else {
      // sign in account
      try {
        const user = await signInWithEmailAndPassword(authService, email, password);
        setAuthError(null);
        console.log('login', user);
      } catch (err) {
        switch ((err as AuthErrors).code) {
          case AuthErrorType.USER_NOT_FOUND:
            setAuthError('Please create an account first');
            setNewAccount(true);
            break;
          case AuthErrorType.WRONG_PASSWORD:
            setAuthError('Wrong Password');
            break;
          case AuthErrorType.TOO_MANY_REQUESTS:
            setAuthError('Too many requests were made. Please use it later');
            break;
          default:
            console.log('Unexpected create account', err);
        }
      }
    }
  };

  const onSocialLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    let provider, result, credential;
    try {
      switch (event.currentTarget.name) {
        case 'google':
          provider = new GoogleAuthProvider();
          result = await signInWithPopup(authService, provider);
          credential = GoogleAuthProvider.credentialFromResult(result);
          break;
        case 'github':
          provider = new GithubAuthProvider();
          result = await signInWithPopup(authService, provider);
          credential = GithubAuthProvider.credentialFromResult(result);
          break;
      }
      console.log(event.currentTarget.name, credential);
    } catch (err) {
      switch ((err as AuthErrors).code) {
        case AuthErrorType.EXIST_DIFFERENT_CREDENTIAL:
          setAuthError('This email is being used by another account. Please log in using another method');
          break;
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onEmailLogin)}>
        <input {...register('email', { required: 'Email is required' })} type="text" placeholder="Email" />
        {errors.email?.message && <div>{errors.email.message}</div>}
        <input {...register('password', { required: 'Password is required' })} type="password" placeholder="Password" />
        {errors.password?.message && <div>{errors.password.message}</div>}
        <button>{newAccount ? 'Create Account' : 'Sign in'}</button>
        {authError && <span>{authError}</span>}
      </form>
      <span onClick={toggleAccount} style={{ color: '#3F51B5' }}>
        {newAccount ? 'Do you want to Log In?' : 'Do you want to Create Account?'}
      </span>
      <div>
        <button name="google" onClick={onSocialLogin}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialLogin}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
