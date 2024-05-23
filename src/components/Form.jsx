import handleErrors from "./HandleErrors";
import './Form.css'

const Form = (props) => {

    const handleChange = (e) => {
        props.setUser({...props.user, [e.target.name] : e.target.value});
    };

    const handleCheckbox = (e) => {
        props.setUser({...props.user, [e.target.name] : e.target.checked});
    };

    // //OR both functions in one:)

    // const handleAllChange = (e) => {
    //     const {name, value, type, checked} = e.target
    //     props.setUser(()=>{
    //         return {
    //             ...props.user, [name] : type === "checkbox"? checked : value}
    // });
    // };


    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = handleErrors(props.user.password, props.user.phone, props.user.email)
        props.setUserErrors(()=>errors)

        if (Object.keys(errors).length === 0){
            fetch("http://url.com/endpoint", {
                method: "POST",
                body: JSON.stringify({ user: props.user }),
                })
            props.setUser([])
        } else {
            return props.userErrors 
        }
    };
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Submit Form</h1>

                <label htmlFor="username">
                    Enter your username:
                    <input 
                        id = "username"
                        type="text" 
                        name="username" 
                        value = {props.user.username}//the value of the input is coming from our username variable
                        onChange={handleChange}
                    />
                </label><br/>
                
                <label htmlFor="password">
                    Enter your password:
                    <input 
                        id="password" 
                        type="password" 
                        name="password"
                        value = {props.user.password}
                        onChange = {handleChange}
                        />
                </label>
                {props.userErrors.pwd_errors && props.userErrors.pwd_errors.length > 0 && (
                    <div>
                        {props.userErrors.pwd_errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}<br/>
                
                <label htmlFor="tel">
                    Enter your phone number
                    <input
                        id= "tel"
                        type = "tel"
                        name = "phone"
                        pattern="(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}"  //"[0-9]{3}-[0-9]{2}-[0-9]{3}""
                        value = {props.user.phone}
                        onChange = {handleChange}
                    />
                </label>
                <div>
                    {props.userErrors.phone_errors && props.userErrors.phone_errors.length > 0 && (
                        <p>{props.userErrors.phone_errors}</p>
                    )}
                </div><br/>

                <label htmlFor="email">
                    Enter your email
                    <input
                        id = "email"
                        type = "email"
                        name = "email"
                        value = {props.user.email}
                        onChange = {handleChange}
                    />
                </label>
                {props.userErrors.email_errors && props.userErrors.email_errors.length > 0 && (
                    <div>
                        {props.userErrors.email_errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}<br/>

                <label htmlFor="textarea">
                    Write your comments
                    <textarea
                        id = 'textarea'
                        name = "textarea"
                        value = {props.user.textarea}
                        onChange = {handleChange}
                    />
                </label><br/>

                <label htmlFor = "checkbox">
                    Checkbox
                    <input
                        type="checkbox"
                        id = "checkbox"
                        name = "checkbox"
                        checked = {props.user.checkbox}
                        onChange = {handleCheckbox}
                    />
                </label><br/>

                <fieldset>
                    <legend>Current employment status</legend>
                    <label htmlFor="unemployed">
                        Unemployed
                    <input 
                        type="radio"
                        id="unemployed"
                        name = "radiobtn"
                        value = "unemployed"
                        checked = {props.user.radiobtn === "unemployed"}
                        onChange={handleChange}
                    />
                    </label>

                    <label htmlFor="part-time">
                        Part-time
                    <input 
                        type="radio"
                        id="part-time"
                        name = "radiobtn"
                        value = "part-time"
                        checked = {props.user.radiobtn === "part-time"}
                        onChange={handleChange}
                    />
                    </label>

                    <label htmlFor="full-time">
                        Full-time
                    <input 
                        type="radio"
                        id="full-time"
                        name = "radiobtn"
                        value = "full-time"
                        checked = {props.user.radiobtn === "full-time"}
                        onChange={handleChange}
                    />
                    </label>
                </fieldset>

                <label htmlFor="favColor">
                    What is your favorite color?
                <select 
                    id="favColor"
                    name = "favColor"
                    value = {props.user.favColor}
                    onChange = {handleChange}
                >
                    <option value="red">---Choose---</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="indigo">Indigo</option>
                    <option value="violet">Violet</option>
                </select>
                </label>

                <input type="submit" value = "Create an account"/>
                {/* <button>Submit</button> since the btn is inside a from it sets the type='submit' by default */}
            </form>    
        </>       
    )
}


export default Form