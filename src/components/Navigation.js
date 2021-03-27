import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import NavProf from './NavProf'

const Navigation = (props) => {
    // console.log(props.user.username?.())
    // debugger
    let isUser = () => {
        if (props.user === undefined){
            return false
        }
        else {
            return Object.keys(props.user).includes('username')  
        }
    }
    // Object.keys(props.user).includes('username') ? isUser = true : isUser = false
    // debugger


    return (
        <Navbar>
            <Navbar.Brand href="#home" name="home" 
                onClick={(e) => {props.changeView(e.target.name)}}>
                    My Notebook
            </Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="#login" name={ isUser() ? "logout" : "login"} 
                        onClick={(e) => props.changeView(e.target.name)} >
                        { isUser() ? <NavProf user={props.user} />  : "Login"}
                    </a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar> 

    )

}
export default Navigation
