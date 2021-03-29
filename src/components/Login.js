import React, { Component } from "react";
//Modeled off: https://www.remotestack.io/react-bootstrap-login-register-ui-templates/

export default class Login extends Component {
    // default_avatar = require(`../default_avatar.png`) 
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
                    password: this.state.password
                }
            })
        }
        fetch('http://localhost:3000/api/v1/login', reqObj)
        .then(r => r.json())
        .then(data => {
                localStorage.setItem("token", data.jwt)
                this.props.setUser(data.user)
                this.props.changeView('home')
            }) 
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <h3>Log In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" name='username' className="form-control" placeholder="Enter username" onChange={e => this.handleChange(e)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name='password' className="form-control" placeholder="Enter password" onChange={e => this.handleChange(e)} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Log In</button>
                <p className="forgot-password text-right">
                    Not a member? <a href="#" name='signup' onClick={(e) => this.props.changeView(e.target.name)}>Sign Up</a>
                </p>
            </form>
        );
    }
}
