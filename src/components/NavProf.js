import React, { Component } from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'

const NavProf = ({user}) => {

    return (
        <>
        {user.username}   <img className="rounded" style={{ height: 40}} src={user.avatar}></img>
        </>
    )
}

export default NavProf;