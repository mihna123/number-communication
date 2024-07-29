import { Card, CardContent, Button, CardActions, CardHeader, IconButton, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { currentUser } from "../../data/user";
import { posts } from "../../data/posts";

const AddModalPage = ({ closeModal }) => {
    const [num, setNum] = useState(0);
    const [numError, setNumError] = useState(false);
    const [numHelper, setNumHelper] = useState("");
    const user = currentUser.use();

    const handleNumChange = (e) => {
        if (isNaN(Number.parseFloat(e.target.value))) {
            setNumError(true);
            setNumHelper("The value must be a number!");
            return;
        }
        setNumError(false);
        setNumHelper("");
        setNum(e.target.value);
    }
    const postNew = () => {
        fetch('http://localhost:8080/posts/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: {
                    number: num,
                    userId: user._id,
                },
                token: user.token
            })
        }).then(res => {
            if (res.status === 200) {
                closeModal();
                alert('Successfuly posted!');
            }

            return res.json();
        }).then(data => {
            console.log(data);
            posts.set(data);
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <Card className="main-container" variant="outlined">
            <CardHeader
                title="Add a new number"
                subheader="It can be any number!"
                action={
                    <IconButton onClick={closeModal}>
                        <Close />
                    </IconButton>
                } />
            <CardContent>
                <section className="reply-controlls">
                    <TextField
                        className="input-number"
                        type="number"
                        error={numError}
                        helperText={numHelper}
                        onChange={handleNumChange} />
                </section>
                <CardActions disableSpacing>
                    <Button id="login-btn" variant="contained" onClick={postNew}>Post</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default AddModalPage;
