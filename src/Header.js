
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import News from './News';
const Header = () => {
  

  return (
    <div className='header'> 
       <h1><Link className='header-link' to="/" >Latest News</Link></h1>
        <div className='links'>
        <Link to="/signup">Signup</Link>
       <Link to="/login">Login</Link>
      
        </div>
     
    </div>
  );
};

export default Header;
