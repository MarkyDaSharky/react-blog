import React, { Component } from 'react';
import PostCards from '../components/PostCards';

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    
    componentDidMount() {
        fetch("https://kekambas-blog.herokuapp.com/blog/posts")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                posts: data
            })
        })
        .catch(error => console.log('error', error));
    }

    render() {
    return (
        <div className='mt-5'>
            <h1 className='text-center mb-5'>Blog Posts</h1>
            {this.state.posts.map((p,k) => <PostCards post={p} key={k}/> )}
        </div>
    );
  }
}