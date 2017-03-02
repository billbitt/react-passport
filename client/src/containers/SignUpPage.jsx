import React, { PropTypes } from 'react';
import SignUpForm from "../components/SignUpForm.jsx";

class SignUpPage extends React.Component {
    // class constructor
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: "",
                name: "",
                password: ""
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    // Change the user object.
    /*
        This will change the component state by taking the name attribute of an input element as a key. A value for this key will be taken from a user’s input.
    */
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    // Process the form.
    /*
        When a user submits the form, all we do at this moment is output current state values to the browser console.
    */
    processForm(event) {
        // Prevent default action.  in this case, action is the form submission event.
        event.preventDefault();

        // Create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&email=${email}&password=${password}`;
        //console.log("name:", name, "email:", email, "password", password);
        //console.log("formData:", formData);

        // Create an ajax request, which will change the component state depending on the HTTP response code status received.
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/auth/signup");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            // success case.
            if (xhr.status === 200) { 
                // change the component-container state.
                this.setState({
                    errors: {}
                });
                // console log the result 
                console.log("The form is valid");
            // falure case.
            } else {
                // ??
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                // change the component-container state.
                this.setState({
                    errors
                });
            }
        });
        // ?? 
        xhr.send(formData);
    }

    // Render the component.
    /*
        In this method, we render the presentational component SignUpForm with the passed event handlers and state values as props.
    */
    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }
}

export default SignUpPage;

