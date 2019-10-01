import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { login } from '../components/util/APIUtils';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
            usernameOrEmail: "",
            password: ""
            //     helperText: '',
            //     error: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLogin() {
        const values = { usernameOrEmail: this.state.usernameOrEmail, password: this.state.password }
        const loginRequest = Object.assign({}, values);
        console.log("LOGIN " + JSON.stringify(loginRequest));
        login(loginRequest)
            .then(response => {
                localStorage.setItem('accessToken', response.accessToken);
                this.props.history.push({
                    pathname: '/home'
                })
            }).catch(error => {
                if (error.status === 401) {
                    console.log("Your username or password is incorrect. Please try again!");
                    // notification.error({
                    //     message: 'Polling App',
                    //     description: 'Your Username or Password is incorrect. Please try again!'
                    // });
                } else {
                    console.log("Sorry! Something went wrong. Please try again!");
                    // notification.error({
                    //     message: 'Polling App',
                    //     description: error.message || 'Sorry! Something went wrong. Please try again!'
                    // });
                }
            });

    }

    handleRegister() {
        this.props.history.push({
            pathname: '/register',
        })
    }

    render() {
        return (
            <div>
                {/* <Grid container
                    direction="column" justify="center"> */}
                <Paper style={{ textAlign: 'center', width: '40%', marginLeft: '30%', marginTop: '2%' }} >
                    <br />
                    <h2>Login</h2>
                    <br/>
                    {/* <AccountCircle/> */}
                    <TextField
                        name="usernameOrEmail"
                        required
                        label="Username/Email"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
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
                    <Button variant="contained" color="primary" onClick={(event) => this.handleLogin(event)}>
                        Login
                </Button>
                    <br />

                    <Link label="Register" primary={true} onClick={(event) => this.handleRegister(event)} >
                        {"Not registered yet? Register now!"}
                    </Link>
                </Grid>
            </div>
        )

    }
}

export default Login;
