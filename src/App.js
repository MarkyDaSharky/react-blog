import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './views/Register';
import Login from './views/Login';
import Posts from './views/Posts';
import SinglePost from './views/SinglePost';
import NewPost from './views/NewPost';
import Alert from './components/Alert'
import UpdatePost from './views/UpdatePost';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null,
      message: null,
      category: null
    }
  }

  login = (token) => {
    this.setState({
      loggedIn: token
    })
  }

  logout = () => {
    this.setState({
      loggedIn: null
    })
    console.log('You are now logged out.')
  }

  flashMessage = (message, category='primary') => {
    this.setState({
      message, category
    })
  }

  render() {
    return (
      <>
        <Navbar loggedIn={this.state.loggedIn} logout={this.logout} />
        <div className='container'>
          { this.state.message ? (
            <Alert message={this.state.message} category={this.state.category} flashMessage={this.flashMessage} />
          ) : null }
          
          <Routes>
            <Route path='/' element={<Posts />}/>
            <Route path='register' element={<Register />} flashMessage={this.flashMessage}/>
            <Route path='login' element={<Login logIn={this.login} flashMessage={this.flashMessage}/>} />
            <Route path='/blog/posts/:postId' element={<SinglePost token={this.state.loggedIn} flashMessage={this.flashMessage}/>} />
            <Route path='/newpost' element={<NewPost token={this.state.loggedIn} flashMessage={this.flashMessage}/>} />
            <Route path='/blog/posts/:postId/edit' element={<UpdatePost token={this.state.loggedIn} flashMessage={this.flashMessage}/>} />
          </Routes>
        </div>
      </>
    );
  }
}