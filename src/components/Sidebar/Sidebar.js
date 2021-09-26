import React from 'react'
import axios from 'axios'
import 'boxicons'
import './Sidebar.css'



const Sidebar = () => {
    return (
        <div className='sidebar-wrapper'>
            <div className="sidebar">
                <div className="channel-name-container">
                    <span className='channel-name'>Avion School</span>
                    {/* Add onClick fn here */}
                    <box-icon name='edit'></box-icon>
                </div>
                <ul className="nav-link">
                    <li>
                        <box-icon name='message-square-detail' flip='horizontal'></box-icon>
                        <span className="links">Threads</span>
                    </li>
                    <li>
                        <box-icon name='conversation' ></box-icon>
                        <span className="links">All DMs</span>
                    </li>
                    <li>
                        
                    </li>
                    <li>

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
