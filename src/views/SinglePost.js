import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function SinglePost (props) {
    const [post, setPost] = useState({})
    const { postId } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
            setPost(data)
        })
    }, [postId])

    const handleDelete = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${props.token}`)

        fetch(`https://kekambas-blog.herokuapp.com/blog/posts/${postId}`, {
            method: "DELETE",
            headers: myHeaders
        }).then(res => res.json())
            .then(data => {
                props.flashMessage('Post deleted!', 'success');
                navigate('/');
            })
    }

    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                <h5 className="card-title fw-bold fs-3">{ post.title }</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{ post.content }</p>
                    {props.token ? (
                        <>
                            <Link to={`/blog/posts/${post.id}/edit`} className="btn btn-primary btn-sm me-2">Update</Link>
                            <button className='btn btn-danger btn-sm' onClick={handleDelete}>Delete</button>
                        </>
                    ): null}
                </div>
            </div>
        </>
    );
}