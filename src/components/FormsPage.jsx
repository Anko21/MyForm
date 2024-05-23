import { useState } from "react";
import Form from './Form'
import './Form.css'

const FormsPage = () => {
    const [user,setUser]=useState(
        {
            username:"",
            password:"",
            phone:"",
            email:"",
            textarea:"",
            checkbox: false,
            radiobtn: "",
            favColor:""
        })
    const [userErrors, setUserErrors] = useState({})

    const [isFocused, setIsFocused] = useState(false); 

    
    return(
        <div className="container">
            <Form
                user = {user}
                setUser={setUser}
                userErrors = {userErrors}
                setUserErrors = {setUserErrors}
                isFocused = {isFocused}
                setIsFocused = {setIsFocused}
            />
        </div>
    )
}

export default FormsPage