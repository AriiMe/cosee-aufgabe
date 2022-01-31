import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Post from '../components/Post'

import posts from '../posts.js'

function HomePage() {
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
