import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: ""
            //     helperText: '',
            //     error: false
        };
    }

    
    render() {
        return (
            <div>
                <Paper style={{ textAlign: 'center', width: '40%', marginLeft: '30%', marginTop: '2%' }} >
                    <br />
                    <TextField
                        name="name"
                        required
                        label="Name"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <TextField
                        name="username"
                        required
                        label="Username"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
                    <br />
                    <br />
                    <TextField
                        name="email"
                        required
                        type="email"
                        label="Email"
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
                <Grid container
                    direction="column" justify="center" alignItems="center"
                >
                    <br />
                    <Button variant="contained" color="primary" onClick={(event) => this.handleRegister(event)}>
                        Register
                    </Button>
                </Grid>
            </div>)
    }
}

export default Register;