import "./styles/css/style.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import UserService from "./services/UserService";

// Container & Component Imports
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/navbar/Menu";
import FeedContainer from "./containers/FeedContainer";
import ProfileContainer from "./containers/ProfileContainer";
import LoginContainer from "./containers/LoginContainer";
import Signup from "./components/forms/SignUpForm";
import HomeContainer from "./containers/HomeContainer";
import SignUpContainer from "./containers/SignUpContainer";
import PrivateRoute from "./auth/PrivateRoute";
import LayoutContainer from "./containers/LayoutContainer";

// Authentication Imports
import { auth } from "./auth/firebase-config";
import { AuthContextProvider, useAuthState } from "./auth/AuthContext";
// import { onAuthStateChanged } from "firebase/auth";
import NewProfileContainer from "./containers/NewProfileContainer";
import { onAuthStateChanged } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import PostService from "./services/PostService";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState({});
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // H2 Connections
  useEffect(() => {
    UserService.getUsers().then((users) => setUsers(users.data));
  }, []);

  useEffect(() => {
    PostService.getPosts().then((posts) => setPosts(posts.data));
  }, []);

  useEffect(() => {
    setLoggedIn(getLoggedIn);
  }, [user]);

  const getLoggedIn = () => {
    if (users && user) {
      const sel = users.filter((user) => {
        // console.log(user.email);
        return user.email === auth.currentUser.email;
      });
      return sel[0];
    }
  };

  const createUser = (newUser) => {
    UserService.newUser(newUser).then((savedUser) =>
      setUsers([...users, savedUser].then(setLoggedIn(newUser)))
    );
  };

  const createPost = (newPost) => {
    PostService.newPost(newPost).then((savedPost) =>
      setPosts([...posts, savedPost])
    );
  };

  const updatePost = (updatedPost) => {
    PostService.editPost(updatedPost);

    const updatedPostIndex = posts.findIndex(
      (post) => post.id === updatedPost._id
    );
    const updatedPosts = [...posts];
    updatedPosts[updatedPostIndex] = updatedPost;
    setPosts(updatedPosts);
  };

  const deletePost = async (id) => {
    await PostService.removePost(id)
  };
  

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const trytosayhello = () => {
    console.log(loggedIn);
  };

  const checkUserCredentials= ()=>{
    console.log("checking state")
    if (!loggedIn) {
      navigate("/new-profile");
    } else {
      navigate("/profile");
    }
  }

  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginContainer
                user={user}
                loggedIn={loggedIn}
                getUserObject={onAuthStateChanged}
              />
            }
          />
          <Route
            path="/"
            element={<LoginContainer user={user} loggedIn={loggedIn} />}
          />
          <Route path="/signup" element={<SignUpContainer />} />

          <Route
            element={
              <LayoutContainer
                checkUserCredentials={checkUserCredentials}
                loggedIn={loggedIn}
              />
            }
          >
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomeContainer />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            element={
              <LayoutContainer checkUserCredentials={checkUserCredentials} />
            }
          >
            <Route
              path="/feed"
              element={
                <PrivateRoute>
                  <FeedContainer
                    user={user}
                    loggedIn={loggedIn}
                    posts={posts}
                    createPost={createPost}
                    deletePost={deletePost}
                    updatePost={updatePost}
                  />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            element={
              <LayoutContainer checkUserCredentials={checkUserCredentials} />
            }
          >
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileContainer
                    loggedIn={loggedIn}
                    user={user}
                    posts={posts}
                  />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            element={
              <LayoutContainer checkUserCredentials={checkUserCredentials} />
            }
          >
            <Route
              path="/new-profile"
              element={
                <PrivateRoute>
                  <NewProfileContainer
                    user={user}
                    users={users}
                    createUser={createUser}
                  />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
