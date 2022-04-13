import React from 'react';
import { Link, Switch, Route } from 'wouter';
import Header from 'components/Header';
import Detail from 'pages/Detail';
import { BooksContextProvider } from 'context/books';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <section>
        <BooksContextProvider>
          <Header />
          <Link to="/">
            <h1>KATI</h1>
          </Link>
          <Switch>
            <Route component={HomePage} path="/" />
            <Route component={Detail} path="/book/:id" />
          </Switch>
        </BooksContextProvider>
      </section>
    </div>
  );
}

export default App;
