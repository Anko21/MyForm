import { useState } from "react";
import handleErrors from "./HandleErrors";

const Forms = () => {
    const [user,setUser]=useState(
        {
            username:"",
            password:"",
            phone:"",
            email:"",
        })
    const [userErrors, setUserErrors] = useState({})

    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = handleErrors(user.password, user.phone, user.email,)
        setUserErrors(()=>errors)

        if (Object.keys(errors).length === 0){
            console.log(errors);
        fetch("http://url.com/endpoint", {
            method: "POST",
            body: JSON.stringify({ user: user }),
            })
        } else {
            return userErrors 
        }
    };
    
    // function containsOnlyDigits(str) {
    //     return !isNaN(str) && !isNaN(parseFloat(str));
    // }

    return (
        <>
            <h1>Submit Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your username:
                    <input 
                        type="username" 
                        name="username" 
                        value = {user.username}//the value of the input is coming from our username variable
                        onChange={handleChange}
                    />
                </label><br></br>
                <label>
                    Enter your password:
                    <input 
                        type="password" 
                        name="password"
                        value = {user.password}
                        onChange = {handleChange}
                        />
                </label>
                {userErrors.pwd_errors && userErrors.pwd_errors.length > 0 && (
                    <div>
                        {userErrors.pwd_errors.map((error, index) => (
                            <p key={index} style={{ color: 'red' }}>{error}</p>
                        ))}
                    </div>
                )}
                <br></br>
                <label>
                    Enter your phone number
                    <input
                        type = "tel"
                        name = "phone"
                        pattern="(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}"  //"[0-9]{3}-[0-9]{2}-[0-9]{3}""
                        value = {user.phone}
                        onChange = {handleChange}
                    />
                </label>
                <div>
                    {userErrors.phone_errors && userErrors.phone_errors.length > 0 && (
                        <p style={{ color: 'red' }}>{userErrors.phone_errors}</p>
                    )}
                </div>
                <label>
                    Enter your email
                    <input
                        type = "email"
                        name = "email"
                        value = {user.email}
                        onChange = {handleChange}
                    />
                </label>
                {userErrors.email_errors && userErrors.email_errors.length > 0 && (
                    <div>
                        {userErrors.email_errors.map((error, index) => (
                            <p key={index} style={{ color: 'red' }}>{error}</p>
                        ))}
                    </div>
                )}
                <br></br>
                <input type="submit" />
            </form>    
        </>       
    )
}

export default Forms