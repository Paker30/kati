import React, { Suspense } from 'react';
import { Link, Switch, Route } from 'wouter';
import Header from 'components/Header';
import Detail from 'pages/Detail';
import SearchResults from 'pages/SearchResults';
import { BooksContextProvider } from 'context/books';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <section className='App-content'>
          <BooksContextProvider>
            <Header />
            <Link to="/">
              <h1>KATI</h1>
            </Link>
            <Switch>
              <Route component={HomePage} path="/" />
              <Route component={Detail} path="/book/:id" />
              <Route component={SearchResults} path="/search/:keyword/:category" />
            </Switch>
          </BooksContextProvider>
        </section>
      </Suspense>
    </div>
  );
}

export default App;
