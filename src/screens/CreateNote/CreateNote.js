import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesAction";
import { useHistory } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const noteCreate = useSelector((s) => s.noteCreate);
  const { loading, error } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));

    resetHandler();
    history.push("/mynotes");
  };
  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header>Create a New Note</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                rows={4}
                placeholder="Enter the content"
                onChange={(e) => setContent(e.target.value)}
              />
              <Form.Text className="text-muted">
                Markdowns can be used
              </Form.Text>
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="category"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" variant="danger" onClick={resetHandler}>
              Reset Fields
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Created On - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;
