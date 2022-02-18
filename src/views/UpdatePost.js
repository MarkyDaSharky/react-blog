import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdatePost (props) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { postId } = useParams();
    let navigate = useNavigate();
    let cancel = false;

    useEffect(() => {
            fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${postId}`)
                .then(res => res.json())
                .then(data => {
                    if (cancel) return;
                    setTitle(data.title);
                    setContent(data.content);
                })
                .catch(error => props.flashMessage(error, 'danger'));                   
        return () => { cancel = true }
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let content = e.target.content.value;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token}`);
        myHeaders.append("Content-Type", "application/json");

        let data = JSON.stringify({
            "title": title,
            "content": content
        })

        fetch(`https://kekambas-blog.herokuapp.com//blog/posts/${postId}`, {
            method: "PUT",
            headers: myHeaders,
            body: data
        }).then(res => res.json())
            .then(data => {
                props.flashMessage('Post updated!', 'success');
                navigate(`/blog/posts/${postId}`);
            })
    }

    return(
        <>
            <h1 className='text-center mt-5'>Update Post</h1>
            <form onSubmit={handleForm} className='mt-5 w-50 mx-auto'>
                <fieldset>
                    <label htmlFor='title' className='form-group'>Title</label>
                    <input type='text' name='title' defaultValue={ title } className='form-control' />
                </fieldset>

                <fieldset>
                    <label htmlFor='content' className='form-group'>Post</label>
                    <input type='text' name='content' defaultValue={ content } className='form-control mb-3' />
                </fieldset>
                <input type='submit' value='Update' />
            </form>
        </>
    );
}