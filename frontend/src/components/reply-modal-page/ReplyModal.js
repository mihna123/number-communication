import { Card, CardContent, Button, CardActions, CardHeader, IconButton, Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import "./ReplyModal.css";
import { currentUser } from "../../data/user";
import { posts } from "../../data/posts";
import { url } from "../../data/url";

const ReplyModal = ({ closeModal, parentId }) => {
    const [num, setNum] = useState(0);
    const [op, setOp] = useState("+")
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
    const handleSelect = (e) => {
        setOp(e.target.value);
    }

    const reply = () => {
        fetch(`${url}/posts/reply`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reply: {
                    number: num,
                    operation: op,
                    parent: parentId,
                    userId: user._id,
                },
                token: user.token
            })
        }).then(res => {
            if (res.status === 200) {
                closeModal();
                alert('Successfuly replied!');
            }

            return res.json();
        }).then(data => {
            posts.set(data);
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <Card className="main-container" variant="outlined">
            <CardHeader
                title="Reply to someone"
                subheader="Add any number and an operation"
                action={
                    <IconButton onClick={closeModal}>
                        <Close />
                    </IconButton>
                } />
            <CardContent>
                <section className="reply-controlls">
                    <Select
                        value={op}
                        onChange={handleSelect}>
                        <MenuItem value={"+"}>+</MenuItem>
                        <MenuItem value={"-"}>-</MenuItem>
                        <MenuItem value={"*"}>*</MenuItem>
                        <MenuItem value={"/"}>/</MenuItem>
                    </Select>
                    <TextField
                        className="input-number"
                        type="number"
                        error={numError}
                        helperText={numHelper}
                        onChange={handleNumChange} />
                </section>
                <CardActions disableSpacing>
                    <Button id="login-btn" variant="contained" onClick={reply}>Reply</Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default ReplyModal;
