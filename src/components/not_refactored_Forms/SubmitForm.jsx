import { useState } from "react";

const Forms = () => {
    const [username, setUsername] = useState(""); // Initial state is an empty string ''
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [userErrors, setUserErrors] = useState({})

    const handleNameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePwdChange =(e) => {
        setPassword(e.target.value)
    }

    const handlePhoneChange =(e) => {
        setPhone(e.target.value)
    }

    const handleEmailChange =(e) => {
        setEmail(e.target.value)
    }

    const handleErrors = () => {
        let errors = {}

        //check password
        let password_errors = []
        if (!password){
            password_errors.push("Password is required")
        } 
        else {
            if (password.length < 8){
            password_errors.push("Password should be more than 8chars")
            } 
            if (password === password.toLowerCase()){
                password_errors.push("Password should contain at least one capital letter")
            }
            if (password === password.toUpperCase()){
                password_errors.push("Password should contain at least one lowercase letter")
            }
        }

        if (password_errors.length > 0) {
            errors['pwd_errors'] = password_errors;
        }

        //check phone
        if (!phone || (isNaN(phone) && isNaN(parseFloat(phone)))){
            errors['phone_errors'] = 'Please add a valid number'
        }

        //check email
        let email_errors = [];
        if (!email) {
            email_errors.push('Email is required!');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            email_errors.push('Invalid email address!');
        }
        if (email_errors .length > 0) {
            errors['email_errors'] = email_errors ;
        }


        return errors
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = handleErrors()
        setUserErrors(()=>errors)

        if (Object.keys(errors).length === 0){
            console.log(errors);
        fetch("http://url.com/endpoint", {
            method: "POST",
            body: JSON.stringify({ username: username }),
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
                        value = {username}//the value of the input is coming from our username variable
                        onChange={handleNameChange}
                    />
                </label><br></br>
                <label>
                    Enter your password:
                    <input 
                        type="password" 
                        name="password"
                        value = {password}
                        onChange = {handlePwdChange}
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
                        value = {phone}
                        onChange = {handlePhoneChange}
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
                        value = {email}
                        onChange = {handleEmailChange}
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