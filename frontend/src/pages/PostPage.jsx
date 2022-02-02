import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import Rating from "../components/Rating";
import { listPostDetails } from "../actions/postActions";

function PostPage({ match, history }) {
  const [save, setSave] = useState(false)
  const dispatch = useDispatch();
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  useEffect(() => {
    dispatch(listPostDetails(match.params.id));
  }, [dispatch, match]);

  const savedHandler = () =>{
    setSave(true);
    history.push(`/saved/${match.params.id}`)
  }
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Return Back
      </Link>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          <Col md={9}>
            <Image src={post.imgurl} alt={post.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <h3>{post.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>Description: {post.description}</ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                <Rating
                  value={post.rating}
                  text={`${post.numReviews} ratings`}
                  color={"#f8e825"}
                />
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
            <ListGroup>
            <ListGroup.Item>
                <Button
                onClick={savedHandler}
                className="btn-block"
                disabled={save}
                type="button"
                style={{width: '100%'}}
                >
                  Save
                  </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default PostPage;
