import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeedList from "../components/feed/FeedList";
import NewFeedItemButton from "../components/feed/NewFeedItemButton";
import FeedNewPostPopUp from "../components/feed/FeedNewPostPopUp";
import UserService from "../services/UserService";

function FeedContainer({ auth, posts }) {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    for (const user of users) {
      if (user.email == auth.currentUser.email) {
      }
    }
  };

  const handleNewPostRequest = (e) => {
    e.stopPropagation();
    console.log("Hello")
    setModal(true);
  };

  const handleReset = () => {
    console.log("hello");
    setModal(false);
  };

  // const hello = (e) => {
  //   e.stopPropagation();
  //   console.log("hello")
  // };

  return (
    <div className="feed-container" onClick={handleReset}>
      <div className="feed-container-header">
        {modal ? <FeedNewPostPopUp /> : null}
        <h1>Welcome to ClanHub.</h1>
        <NewFeedItemButton handleNewPostRequest={handleNewPostRequest} />
        <br></br>
        <Link to="/profile">Click to view your profile.</Link>
      </div>
      <button onClick={handleClick}>CLick me</button>
      <button>CLick me</button>
      <FeedList posts={posts} />
    </div>
  );
}

export default FeedContainer;
