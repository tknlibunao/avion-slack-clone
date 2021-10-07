import React, { useState } from 'react'
import styled from 'styled-components'

const AddMember = ({ open, onClose, onAddMember}) => {
    if (!open) return null

    return (
        <Container>
            <Modal>
                <Header>
                    <h3>Add Member</h3>
                    <CloseIcon onClick={onClose}> 
                        <box-icon name='x'  color='#686868'></box-icon>
                    </CloseIcon>
                </Header>
                <InputForm>
                    <input type="text" placeholder='Enter member ID' name="" id="" />
                </InputForm>
                <AddButton>
                    <button onClick={onAddMember}><b>Add</b></button>
                </AddButton>
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
    z-index: 25;
`

const Modal = styled.div`
    position:fixed;
    background: white;
    width: 100%;
    max-width: 400px;
    height: 200px;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    padding: 25px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #1D1C1D;
    padding-left: 3px;
    padding-right: 3px;
`
const CloseIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 35px;
    height: 35px;
    
    :hover {
        background: #F6F6F6;
    }
`
const InputForm = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    padding-left: 3px;
    height: 60px;
    width: 100%;
    
    input[type=text] {
        height: 40px;
        width: 100%;
        max-width: 340px;
        padding: 10px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #BBBABB;
    }
    input[type=text]:hover {
        border: 1px solid #A8A7A8;
    }
    input[type=text]:focus {
        border: 1px solid #1264A3;
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`
const AddButton = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding-right: 6px;

    button {
        width: 80px;
        height: 40px;
        outline: none;
        border: none;
        color: #FFFFFF;
        border-radius: 5px;
        background: #007A5A;
        padding-left: 10px;
        padding-right: 10px;

        :active {
            transform: scale(0.99);
        }
    }
`