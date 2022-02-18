import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PostCards extends Component {
  render() {
    return (
          <div className="card">
              <div className="card-header">
              { this.props.post.title }
          </div>
            <div className="card-body">
                <h5 className="card-title">{ this.props.post.author.username }</h5>
                <p className="card-text">{ this.props.post.content }</p>
                <Link to={`/blog/posts/${this.props.post.id}`} className="btn btn-primary">View</Link>
            </div>
          </div>
    );
  }
}