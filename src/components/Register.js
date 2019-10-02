import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { signup } from '../components/util/APIUtils';
import { withAlert } from 'react-alert';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: "",
                username: "",
                email: "",
                password: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleRegister() {
        if (this.state.formData.name === '' || this.state.formData.username === '' ||
            this.state.formData.email === '' || this.state.formData.password === '') {
            return;
        }
        const signupRequest = {
            name: this.state.formData.name,
            username: this.state.formData.username,
            email: this.state.formData.email,
            password: this.state.formData.password
        };
        signup(signupRequest)
            .then(response => {
                this.props.alert.success(<div style={{ color: 'white' }}>Thank you! You're successfully registered. Please Login to continue!</div>);
                this.props.history.push("/");
            }).catch(error => {
                this.props.alert.error(<div style={{ color: 'white' }}>Sorry! Something went wrong. Please try again!</div>);
            });

    }

    goToLogin() {
        this.props.history.push({
            pathname: '/',
        })
    }

    render() {
        return (
            <div>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleRegister}
                >
                    <Paper style={{ textAlign: 'center', width: '40%', marginLeft: '30%', marginTop: '2%' }} >
                        <h2>Register</h2>
                        <br />
                        <TextValidator
                            name="name"
                            label="Name"
                            value={this.state.formData.name}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['Enter your name']}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />
                        <TextValidator
                            name="username"
                            label="Username"
                            value={this.state.formData.username}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['Enter your username']}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />
                        <TextValidator
                            name="email"
                            type="email"
                            label="Email"
                            value={this.state.formData.email}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['Enter your email']}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />
                        <TextValidator
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.formData.password}
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['Enter your password']}
                            onChange={this.handleChange}
                        />
                        <br />
                        <br />
                    </Paper>
                    <Grid container
                        direction="column" justify="center" alignItems="center"
                    >
                        <br />
                        <Button variant="contained" type="submit" color="primary" onClick={(event) => this.handleRegister(event)}>
                            Register
                    </Button>
                        <br />
                        <Link label="Login" primary={true} onClick={(event) => this.goToLogin(event)} >
                            {"Already have an account? Sign in!"}
                        </Link>
                    </Grid>
                </ValidatorForm>
            </div>
        )
    }
}

export default withAlert()(Register);