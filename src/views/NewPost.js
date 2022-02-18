import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPost(props) {
    let navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let content = e.target.content.value;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + props.token);
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
            "title": title,
            "content": content
        })

        await fetch('https://kekambas-blog.herokuapp.com/blog/post', {
            method: "POST",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                props.flashMessage('Posted!', 'secondary')
                navigate('/')
            })
    }

    return (
        <>
            <h1 className='text-center my-5'>Create Blog Post</h1>
            <form className='mt-5 w-50 mx-auto' onSubmit={handleForm}>
                <fieldset className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' placeholder='Title' className='form-control'/>
                </fieldset>

                <fieldset className='form-group'>
                    <label htmlFor='content'>Post</label>
                    <input type='text' name='content' placeholder='Write your blog' className='form-control'/>
                </fieldset>
                <input type='submit' value='Submit' className='mb-5'/>
            </form>
        </>
    );
}