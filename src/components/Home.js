import { useNavigate } from 'react-router-dom'
import Notes from './Notes';
import React, { useEffect } from 'react'

const Home = (props) => {

    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login")
        }
    }, [])

    return (
        <>
            <div>
                <Notes showAlert={props.showAlert} />
            </div>
        </>
    )
}

export default Home
