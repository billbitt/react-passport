import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {

    // Class constructor.
    constructor(props) {
        super(props);

        // Set the initial component state.
        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        // pass the "this" context, so we will have access to class members from our event handler methods (processForm, changeUser).
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    // Process the form.
    processForm(event) {
        // Prevent default action. in this case, action is the form submission event.
        event.preventDefault();

        // Create a string for an http body message.
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // Create an AJAX request 
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/auth/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            // Success case.
            if (xhr.status === 200) {
                // change the componenet-container state
                this.setState({
                    errors: {}
                });
                // console log the result 
                console.log("The form is valid");
            // Failure case.
            } else {
                // ?? 
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                // change the componenet-container state
                this.setState({
                    errors
                })
            }
        });
        // ??
        xhr.send(formData);
    }

    // Change the user object.
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
        user
        });
    }

    // Render the component.
    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }

}

export default LoginPage;