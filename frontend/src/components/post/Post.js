import { Paper, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { currentUser } from "../../data/user";
import { getRepliesToPost } from "../../data/posts";
import ReplyModal from "../reply-modal-page/ReplyModal";
import "./Post.css";

const Post = ({ postData, padLeft }) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [username, setUsername] = useState('someone');
    const user = currentUser.use();
    const replies = getRepliesToPost(postData._id);
    useEffect(() => {
        if (!postData.userId) return;
        fetch(`http://localhost:8080/users/${postData.userId}`, {
        })
            .then(res => res.json())
            .then(data => {
                setUsername(data.username);
            })
    }, [postData]);

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

                <h2>{postData.operation ?? ""} {postData.number}</h2>
                <section className="post-controlls">
                    <Button onClick={replyClick}>Reply</Button>
                    <p>number of replies: {postData.responses.length ?? 0}</p>
                </section>
            </Paper>

            {
                replies.map((rep, i) => {
                    return <Post padLeft={(padLeft ?? 0) + 5} postData={rep} key={i} />
                })}
        </div>
    )
}

export default Post;
