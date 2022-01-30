import './MainPage.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import ChatArea from '../ChatArea/ChatArea'
// import { Link } from 'react-router-dom'


import React from 'react'

const MainPage = () => {


    return (
        <div>
            <div className="header-wrapper">
                <Header/>
            </div>
            <div className="sidebar-wrapper">
                <Sidebar/>
            </div>
            <div className="chatarea-wrapper">
                <ChatArea/>
            </div>
        </div>
    )
}

export default MainPage
