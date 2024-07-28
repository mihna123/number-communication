import './NumberPosts.css';
import Post from '../post/Post';
import { useEffect, useState } from 'react';

const NumberPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPosts(data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="posts-container">
            {posts.map((p, i) => <Post postData={p} key={i} />)}
        </div>
    )
}

export default NumberPosts;
