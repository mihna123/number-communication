import './NumberPosts.css';
import Post from '../post/Post';
import { posts } from '../../data/posts';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Modal from "@mui/material/Modal";
import AddModalPage from '../add-modal-page/AddModalPage';
import { currentUser } from '../../data/user';
import { url } from '../../data/url';

const NumberPosts = () => {
    const [addNewVisible, setAddNewVisible] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const user = currentUser.use();
    const allPosts = posts.use();

    const closeAddNew = () => {
        setAddNewVisible(false)
    }

    const openAddNew = () => {
        if (!user.loggedIn) {
            alert('You must be logged in to add new numbers!');
            return;
        }
        setAddNewVisible(true);
    }

    useEffect(() => {
        fetch(`${url}/posts`)
            .then(response => response.json())
            .then(data => {
                posts.set([...data]);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const filtered = allPosts.filter(p => p && !p.parent).toReversed();
        console.log(filtered);
        setFilteredPosts(filtered);
    }, [allPosts]);

    return (
        <div className="posts-container">
            <Modal open={addNewVisible}>
                <AddModalPage closeModal={closeAddNew} />
            </Modal>
            <Button onClick={openAddNew}>Add a new number</Button>
            {
                filteredPosts.length > 0
                    ? filteredPosts
                        .map((p, i) => {
                            return <Post postData={p} key={i} />
                        })
                    : <h3>No posts yet!</h3>
            }
        </div>
    )
}

export default NumberPosts;
