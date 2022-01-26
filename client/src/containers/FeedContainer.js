import React from 'react';
import { Link } from "react-router-dom";
import FeedList from '../components/feed/FeedList';

function FeedContainer() {

  return (
    <>
      <div className="feed-container-header">
        <h1>Welcome to ClanHub.</h1>
        <Link to="/profile">Click to view your profile.</Link>
      </div>
      <FeedList/>
    </>
  );
}

export default FeedContainer;