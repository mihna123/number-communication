import { Paper, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { currentUser } from "../../data/user";
import ReplyModal from "../reply-modal-page/ReplyModal";
import "./Post.css";

const Post = ({ postData }) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [username, setUsername] = useState('someone');
    useEffect(() => {
        if (!postData.userId) return;
        fetch(`http://localhost:8080/users/${postData.userId}`, {
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setUsername(data.username);
            })
    }, []);
    const user = currentUser.use();
    const replyClick = () => {
        if (!user.loggedIn) {
            alert('You must be logged in to reply to posts!');
            return;
        }
        setReplyOpen(true);
    }
    const closeReply = () => {
        setReplyOpen(false);
    }
    return (
        <Paper className="post-container" variant="elevation" elevation={1}>
            <Modal open={replyOpen}>
                <ReplyModal closeModal={closeReply} parentId={postData._id} />
            </Modal>
            <p><b>{username}</b> posted a new starting number:</p>
            <h2>{postData.number}</h2>
            <section className="post-controlls">
                <Button onClick={replyClick}>Reply</Button>
                <p>number of replies: {postData.responses.length ?? 0}</p>
            </section>
        </Paper>
    )
}

export default Post;
