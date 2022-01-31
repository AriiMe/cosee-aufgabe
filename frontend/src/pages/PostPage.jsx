import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import posts from '../posts'

function PostPage({match}) {
    const post = posts.find((p) => p._id == match.params.id)
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={9}>
                    <Image src={post.imgurl} alt={post.title} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>{post.title}</h3>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            Description: {post.description}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                    <ListGroup.Item>
                            <Rating value={post.rating} text={`${post.numReviews} ratings`} color={'#f8e825'}/>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tags:</Col>
                                    <Col>
                                    <strong>{post.tags}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                </Col>


            </Row>
        </div>
    )
}

export default PostPage
