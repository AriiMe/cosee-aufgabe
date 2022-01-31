import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Post from '../components/Post';
import axios from 'axios';


function HomePage() {
    const [posts, setPosts] = useState([])

    useEffect(() =>{

       async function fetchPosts(){
            const {data} = await axios.get('/api/posts/');
            setPosts(data);
        };

        fetchPosts();

      
    }, []);
    return (
        <div>
            <h1>Latest Posts</h1>
            <Row>
                {posts.map(post => (
                    <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                    <Post post={post} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage
