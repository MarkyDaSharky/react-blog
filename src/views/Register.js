import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    let navigate = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;


        if (password !== confirmPass) {
            props.flashMessage('Passwords do not match, please try again.', 'danger');
            navigate('/register');
        }

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')

        let data = JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        })

        fetch('https://kekambas-blog.herokuapp.com/auth/users', {
            method: 'POST',
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                console.log(data);
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
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' placeholder='Email' className='form-control'></input>
          </fieldset>

          <fieldset className='form-group mt-1'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' placeholder='Password' className='form-control'></input>
          </fieldset>
          
          <fieldset className='form-group mt-1'>
                <label htmlFor='confirmPass'>Confirm Password</label>
                <input type='password' name='confirmPass' placeholder='Confirm Password' className='form-control'></input>
          </fieldset>
          <input type='submit' value='Register' className='mt-2'/>
      </form>
    );
}