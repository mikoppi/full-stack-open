import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = [
    ...useSelector(({ filter, anecdotes }) => {
      if (filter) {
        return anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter)
        );
      } else {
        return anecdotes
      }
    }),
  ].sort((a, b) => b.votes - a.votes);
  console.log(anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));
    dispatch(
      showNotification(`voted ${anecdotes.find((a) => a.id === id).content}`)
    );
    setTimeout(() => {
      dispatch(showNotification(""));
    }, 5000);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
