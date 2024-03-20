import "./Style.css"

import * as React from 'react';
import {logout} from '../../../Redux/actions/user'

import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function SideMenu(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = React.useState('');

    React.useEffect(() => {
        // Set the initial active link based on the current pathname
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        navigate(path);
    };

    return (
        <div className="navigation">
            <ul>
                <li className={activeLink === '/Dashboard/' ? 'active' : ''}>
                    <a href="/Dashboard/" onClick={() => handleLinkClick('/Dashboard/')}>
                        <span className='icon'><ion-icon name="home"></ion-icon> </span>
                        <span className='title'>Dashboard</span>
                    </a>
                </li>
                <li className={activeLink === '/Dashboard/Users' ? 'active' : ''}>
                    <a href="/Dashboard/Users" onClick={() => handleLinkClick('/Dashboard/Users')}>
                        <span className='icon'><ion-icon name="people"></ion-icon></span>
                        <span className='title'>Users</span>
                    </a>
                </li>
                <li className={activeLink === '/Dashboard/PendingPosts' ? 'active' : ''}>
                    <a href="/Dashboard/PendingPosts" onClick={() => handleLinkClick('/Dashboard/PendingPosts')}>
                        <span className='icon'><ion-icon name="checkmark-circle"></ion-icon></span>
                        <span className='title'>Pending Posts</span>
                    </a>
                </li>
                <li className={activeLink === '/Dashboard/DisplayAllPosts' ? 'active' : ''}>
                    <a href="/Dashboard/DisplayAllPosts" onClick={() => handleLinkClick('/Dashboard/DisplayAllPosts')}>
                        <span className='icon'><ion-icon name="list"></ion-icon></span>
                        <span className='title'>Display Posts</span>
                    </a>
                </li>
                <li className={activeLink === '/Dashboard/Theme' ? 'active' : ''}>
                    <a href="/Dashboard/Theme" onClick={() => handleLinkClick('/Dashboard/Theme')}>
                        <span className='icon'><ion-icon name="color-palette"></ion-icon></span>
                        <span className='title'>Theme</span>
                    </a>
                </li>
                <li className={activeLink === '/' ? 'active' : ''}>
                    <a href="/" onClick={() => {
                        handleLinkClick('/');
                        dispatch(logout());
                    }}>
                        <span className='icon'><ion-icon name="log-out"></ion-icon></span>
                        <span className='title'>Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;