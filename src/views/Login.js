import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    let navigate = useNavigate();
    const handleForm = (e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic " + btoa(`${username}:${password}`));

        fetch('https://kekambas-blog.herokuapp.com/auth/token', {
            method: 'POST',
            headers: myHeaders
        }).then(res => res.json())
            .then(data => {
                props.logIn(data['token']);
                props.flashMessage('You are now logged in', 'success');
                navigate('/');
            })
    }
    return (
        <form onSubmit={handleForm}>
            <fieldset className='form-group mt-5'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' placeholder='Username' className='form-control'></input>
            </fieldset>

            <fieldset className='form-group mt-1'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Password' className='form-control'></input>
            </fieldset>
            
            <input type='submit' value='Login' className='mt-2'/>
        </form>
  );
}