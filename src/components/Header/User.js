import React from 'react'
import userDefaultImage from '../../assets/userDefaultImage.png'
const User = () => {
    return (
        <div className='user-container'>
            <div className="user-image-container">
                <img src={userDefaultImage} alt='User' className='user-image' />
            </div>
        </div>
    )
}

export default User
