import { Card, CardContent, Button, CardActions, CardHeader, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Close } from "@mui/icons-material";
import "./SignupModalPage.css";


const SignupModalPage = ({ closeModal }) => {
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
                    label="Enter your user name" />
                <TextField 
                    className="input-field" 
                    variant="outlined" 
                    margin="normal"
                    type="password" 
                    label="Enter your password" />
                <TextField 
                    className="input-field" 
                    variant="outlined" 
                    margin="normal"
                    type="password" 
                    label="Repeat your password" />
                <CardActions disableSpacing>
                    <Button id="signup-btn" variant="contained">Sign Up</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}


export default SignupModalPage;
