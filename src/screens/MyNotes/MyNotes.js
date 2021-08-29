import React, { useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

function MyNotes({ search }) {
  const dispatch = useDispatch();
  const notesList = useSelector((state) => state.notesList);
  const { loading, notes, error } = notesList;
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((s) => s.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((s) => s.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((s) => s.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.pushState("/");
    }
  }, [
    dispatch,
    successCreate,
    successUpdate,
    successDelete,
    history,
    userInfo,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <div>
      <MainScreen title={`Welcome Back ${userInfo?.name}..`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 10 }} size="lg">
            Create New Note
          </Button>
        </Link>
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading || (loadingDelete && <Loading />)}

        {notes
          ?.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
          .map((note) => {
            return (
              <Accordion key={note._id}>
                <Card style={{ marginBottom: 10 }}>
                  <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        color: "black",
                        fontSize: 18,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Accordion.Toggle
                        as={Card.Text}
                        variant="link"
                        eventKey="0"
                      >
                        {note.title}
                      </Accordion.Toggle>
                    </span>
                    <div>
                      <Button size="sm">
                        <Link to={`/note/${note._id}`}>Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="mx-2"
                        onClick={() => handleDelete(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <Button
                          variant="success"
                          disabled
                          size="sm"
                          style={{ backgroundColor: "green" }}
                        >
                          Category - {note.category}
                        </Button>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created On -{" "}
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            );
          })}
      </MainScreen>
    </div>
  );
}

export default MyNotes;
