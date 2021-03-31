import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import NavProf from './NavProf'

const Navigation = (props) => {

    let isUser = () => {
        if (props.user === undefined){
            return false
        }
        else {
            return Object.keys(props.user).includes('username')  
        }
    }


    return (
           
        <Navbar >

            <Navbar.Brand href="#home" name="home" 
                onClick={(e) => {props.changeView(e.target.name)}}>
                    My Notebook
            </Navbar.Brand>
            <Navbar.Toggle />
            {/* <Navbar.Text>
                <a href='#notebook' name="notebook" onClick={(e) => props.changeView(e.target.name)}>Notebook</a>
            </Navbar.Text> */}

            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="#login" name={ isUser() ? "logout" : "login"} 
                        onClick={(e) => props.changeView(e.target.name)} >
                        { isUser() ? 
                        <NavDropdown title={<NavProf user={props.user} />} id='basic-nav-dropdown'>
                                <NavDropdown.Item onClick={() => props.changeView('logout')} >Logout</NavDropdown.Item>
                        </NavDropdown>  
                        : "Login"}
                    </a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>  

    )

}
export default Navigation
