import React, { Component } from "react";
let default_avatar = require(`../assets/default_avatar.png`) 
//Modeled off: https://www.remotestack.io/react-bootstrap-login-register-ui-templates/

export default class SignUp extends Component {
    state = {
        username: '', 
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password, 
                    bio: 'This is my bio!',
                    avatar: 'http://cdn.onlinewebfonts.com/svg/img_258083.png'
                }
            })
        }
        fetch('http://localhost:3000/api/v1/login', reqObj)
        .then(r => r.json())
        .then(data => {
            debugger
                localStorage.setItem("token", data.jwt)
                this.props.setUser(data.user)
                this.props.changeView('home')
            }) 
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)} >
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name='username' placeholder="Username" onChange={e => this.handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name='password' placeholder="Enter password" onChange={e => this.handleChange(e)} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <a href="#"name='login' onClick={(e) => this.props.changeView(e.target.name)}>Log In</a>
                </p>
            </form>
        );
    }
}