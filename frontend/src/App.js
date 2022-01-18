import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomePage} exact/>
          <Route path="/post/:id" component={PostPage}/>
        </Container>
      </main>
    </Router>
  );
}

export default App;
