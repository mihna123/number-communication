import { Card, CardContent, Button, CardActions, CardHeader, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import "./LoginModalPage.css";
import UserService from "../../services/user.service";
import { url } from "../../data/url";

const LoginModalPage = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameHelper, setUsernameHelper] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('');

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

    const login = () => {
        let usrValid = usernameValid(username);
        let passValid = passwordValid(password);

        if (!usrValid) {
            setUsernameError(true);
        }
        if (!passValid) {
            setPasswordError(true);
        }
        if (!usrValid || !passValid) return;

        setUsernameError(false);
        setPasswordError(false);

        fetch(
            `${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(res => {
            if (res.status === 200) {
                closeModal();
                alert('Login Successful!');
            }
            return res.json();

        }).then(data => {
            UserService.userLogin(data.token);
        }).catch(err => console.error(err));
    }
    return (
        <Card className="main-container" variant="outlined">
            <CardHeader
                title="Welcome back!"
                subheader="Log in and start addin' those numbers!"
                action={
                    <IconButton onClick={closeModal}>
                        <Close />
                    </IconButton>
                } />
            <CardContent className="content-container">
                <TextField
                    className="input-field"
                    variant="outlined"
                    label="Enter your user name"
                    margin="normal"
                    error={usernameError}
                    helperText={usernameHelper}
                    onChange={e => {
                        setUsername(e.target.value);
                    }} />
                <TextField
                    className="input-field"
                    variant="outlined"
                    type="password"
                    label="Enter your password"
                    margin="normal"
                    error={passwordError}
                    helperText={passwordHelper}
                    onChange={e => {
                        setPassword(e.target.value);
                    }} />
                <CardActions disableSpacing>
                    <Button id="login-btn" variant="contained" onClick={login}>Log in</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}


export default LoginModalPage;
