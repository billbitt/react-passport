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
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        console.log('email:', this.state.user.email);
        console.log('password:', this.state.user.password);
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