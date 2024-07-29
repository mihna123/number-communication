import { Paper, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { currentUser } from "../../data/user";
import { getRepliesToPost } from "../../data/posts";
import { url } from "../../data/url";
import ReplyModal from "../reply-modal-page/ReplyModal";
import "./Post.css";

const Post = ({ postData, padLeft, accumulated }) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [username, setUsername] = useState('someone');
    const user = currentUser.use();
    const replies = getRepliesToPost(postData._id);
    useEffect(() => {
        if (!postData.userId) return;
        fetch(`${url}/users/${postData.userId}`, {
        })
            .then(res => res.json())
            .then(data => {
                setUsername(data.username);
            })
    }, [postData]);

    const getNextValue = () => {
        switch (postData.operation) {
            case "+":
                return postData.number + accumulated;
            case "-":
                return accumulated - postData.number;
            case "*":
                return postData.number * accumulated;
            case "/":
                return accumulated / postData.number;
            default:
                return postData.number;
        }
    }

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
        <div>
            <Paper sx={padLeft ? { marginLeft: padLeft } : {}} className="post-container" variant="elevation" elevation={1}>
                <Modal open={replyOpen}>
                    <ReplyModal closeModal={closeReply} parentId={postData._id} />
                </Modal>

                {!postData.parent
                    ? <p><b>{username}</b> posted a new starting number:</p>
                    : <p><b>{username}</b> replied: </p>
                }

                <h2>{postData.operation ?? ""} {postData.number} {accumulated ? ` = ${getNextValue()}` : ""}</h2>
                <section className="post-controlls">
                    <Button onClick={replyClick}>Reply</Button>
                    <p>number of replies: {postData.responses.length ?? 0}</p>
                </section>
            </Paper>

            {
                replies.map((rep, i) => {
                    return <Post padLeft={(padLeft ?? 0) + 5} accumulated={getNextValue()} postData={rep} key={i} />
                })}
        </div>
    )
}

export default Post;
