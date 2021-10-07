import React, { useState } from 'react'
import styled from 'styled-components'

const AddMember = ({ handleClose, show, children}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <Container className={showHideClassName}>
            <Modal>
                {children}
                <button type='submit' onClick={handleClose}>Add Member</button>
            </Modal>
        </Container>
    )
}

export default AddMember

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);

    .display-block {
        display: block;
    }
    
    .display-none {
        display: none;
    }
`

const Modal = styled.div`
    position:fixed;
    background: white;
    width: 80%;
    height: auto;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
`

