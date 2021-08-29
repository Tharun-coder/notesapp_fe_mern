import axios from "axios";
import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../constants/notesConstants";

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState(); //redux function to get all the state of application

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "https://notesapp-be-mern.herokuapp.com/api/notes",
      config
    );

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction =
  (title, category, content) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "https://notesapp-be-mern.herokuapp.com/api/notes/create",
        { title, category, content },
        config
      );

      dispatch({ type: NOTES_CREATE_SUCCESS, payload: data });
    } catch (err) {
      const message = err.response?.data?.message
        ? err.response.data.message
        : err.message;
      dispatch({ type: NOTES_CREATE_FAIL, payload: message });
    }
  };

export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTES_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `https://notesapp-be-mern.herokuapp.com/api/notes/${id}`,
        { title, content, category },
        config
      );

      dispatch({ type: NOTES_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      const message = err.response?.data?.message
        ? err.response.data.message
        : err.message;
      dispatch({ type: NOTES_UPDATE_FAIL, payload: message });
    }
  };

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOTES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `https://notesapp-be-mern.herokuapp.com/api/notes/${id}`,
      config
    );

    dispatch({ type: NOTES_DELETE_SUCCESS, payload: data });
  } catch (err) {
    const message = err.response?.data?.message
      ? err.response.data.message
      : err.message;
    dispatch({ type: NOTES_DELETE_FAIL, payload: message });
  }
};
