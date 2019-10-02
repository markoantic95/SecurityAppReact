import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { login } from '../components/util/APIUtils';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withAlert } from 'react-alert';


// const useStyles = makeStyles(theme => ({
//     button: {
//       margin: theme.spacing(1),
//     },
//     input: {
//       display: 'none',
//     },
//   }));
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                usernameOrEmail: "",
                password: "",
            }

        };
        this.handleChange = this.handleChange.bind(this);
    }

    // handleChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleLogin() {
        if(this.state.formData.usernameOrEmail==='' || this.state.formData.password===''){
            return;
        }
        const values = { usernameOrEmail: this.state.formData.usernameOrEmail, password: this.state.formData.password }
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
            .then(response => {
                localStorage.setItem('accessToken', response.accessToken);
                this.props.history.push({
                    pathname: '/home'
                })
            }).catch(error => {
                if (error.status === 401) {
                    console.log("Your username or password is incorrect. Please try again!");
                    this.props.alert.error(<div style={{ color: 'white' }}>Your Username or Password is incorrect. Please try again!</div>);
                } else {
                    console.log("Sorry! Something went wrong. Please try again!");
                    this.props.alert.error(<div style={{ color: 'white' }}>Sorry! Something went wrong. Please try again!</div>);
                }
            });

    }

    goToRegister() {
        this.props.history.push({
            pathname: '/register',
        })
    }

    render() {
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleLogin}
            >
                <Paper style={{ textAlign: 'center', width: '40%', marginLeft: '30%', marginTop: '2%' }} >
                    <h2>Login</h2>
                    <br />
                    {/* <AccountCircle/> */}

                    <TextValidator
                        name="usernameOrEmail"
                        label="Username/Email"
                        value={this.state.formData.usernameOrEmail}
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['Enter your username or email']}
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
                {/* </Grid> */}
                <Grid container
                    direction="column" justify="center" alignItems="center"
                >
                    <br />
                    <Button variant="contained" type="submit" color="primary" onClick={(event) => this.handleLogin(event)}>
                        Login
                        </Button>
                    <br />

                    <Link label="Register" primary={true} onClick={(event) => this.goToRegister(event)} >
                        {"Not registered yet? Register now!"}
                    </Link>
                </Grid>
            </ValidatorForm>
        );

    }
}

// export default(Login);
export default withAlert()(Login);
