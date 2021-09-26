import React from 'react'
import './Header.css'
import Menu from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import History from '@material-ui/icons/History'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Search from '@material-ui/icons/Search'
import User from './User'


const Header = () => {
    return (
        <div className='header-container'>
            <div className="header">
                <div className="header-menu"><Menu/></div>
                <div className="header-history">
                    <div className="history-buttons">
                        <ArrowBack/>
                        <ArrowForward/>
                        <History/>
                    </div>
                    <div className="header-search">
                        <span>Search Avion School</span>
                        <Search/>
                    </div>
                    <HelpOutline/>
                </div>
                <User/>
            </div>
        </div>
    )
}

export default Header
