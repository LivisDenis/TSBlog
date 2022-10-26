import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddPost from "./pages/AddPost";

function App() {
  return (
      <>
          <Header />
          <Container maxWidth="lg">
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/posts/:id' element={<PostPage />}/>
                <Route path='/posts/create' element={<AddPost />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/registration' element={<Registration />}/>
              </Routes>
          </Container>
      </>
  );
}

export default App;
