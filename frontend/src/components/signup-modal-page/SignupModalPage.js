import { Card, CardContent, Button, CardActions, CardHeader, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import UserService from '../../services/user.service';
import "./SignupModalPage.css";


const SignupModalPage = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rpasswordError, setRpasswordError] = useState(false);
    const [usernameHelper, setUsernameHelper] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');
    const [rpasswordHelper, setRpasswordHelper] = useState('');

    const usernameValid = (usernameText) => {
        if (usernameText.length < 5) {
            setUsernameHelper('Username should be at least 5 characters long!');
            return false;
        }
        // No spaces in username
        if (usernameText.includes(" ")) {
            setUsernameHelper('Username can not include space!');
            return false;
        }
        setUsernameHelper('');
        return true;
    }

    const passwordValid = (passText) => {
        if (passText.length < 8) {
            setPasswordHelper('Password should be at least 8 characters long!');
            return false;
        }

        setPasswordHelper('');
        return true;
    }

    const rpasswordValid = (rpassText) => {
        if (rpassText !== password) {
            setRpasswordHelper('Passwords do not match!');
            return false
        }
        setRpasswordHelper('');
        return true;
    }

    const signup = () => {
        let usrValid = usernameValid(username);
        let passValid = passwordValid(password);
        let rpassValid = rpasswordValid(rpassword);

        if (!usrValid) {
            setUsernameError(true);
        }
        if (!passValid) {
            setPasswordError(true);
        }
        if (!rpassValid) {
            setRpasswordError(true);
        }
        if (!usrValid || !passValid || !rpassValid) return;

        setUsernameError(false);
        setPasswordError(false);
        setRpasswordError(false);

        fetch(
            'http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, repeatedPassword: rpassword })
        }).then(res => {
            if (res.status === 200) {
                closeModal();
                alert('Signup Successful!');
            }
            return res.json();

        }).then(data => {
            UserService.userLogin(data.token);
        }).catch(err => console.error(err));
    }

    return (
        <Card className="main-container" variant="outlined">
            <CardHeader
                title="Sign up now!"
                subheader="Be able to add you'r own number!"
                action={
                    <IconButton onClick={closeModal}>
                        <Close />
                    </IconButton>
                } />
            <CardContent className="content-container">
                <TextField
                    className="input-field"
                    variant="outlined"
                    margin="normal"
                    error={usernameError}
                    helperText={usernameHelper}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                    label="Enter your user name" />
                <TextField
                    className="input-field"
                    variant="outlined"
                    margin="normal"
                    error={passwordError}
                    helperText={passwordHelper}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    label="Enter your password" />
                <TextField
                    className="input-field"
                    variant="outlined"
                    margin="normal"
                    error={rpasswordError}
                    helperText={rpasswordHelper}
                    onChange={e => {
                        setRpassword(e.target.value);
                    }}
                    type="password"
                    label="Repeat your password" />
                <CardActions disableSpacing>
                    <Button id="signup-btn" variant="contained" onClick={signup}>Sign Up</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}


export default SignupModalPage;
