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
        event.preventDefault();
        console.log("name:", this.state.user.name);
        console.log("email:", this.state.user.email);
        console.log("password:", this.state.user.password);
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

