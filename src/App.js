import React, { Suspense } from 'react';
import { Link, Switch, Route } from 'wouter';
import Header from 'components/Header';
import Detail from 'pages/Detail';
import { BooksContextProvider } from 'context/books';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <section>
          <Header />
          <Link to="/">
            <h1>KATI</h1>
          </Link>
          <BooksContextProvider>
            <Switch>
              <Route component={HomePage} path="/" />
              <Route component={Detail} path="/book/:id" />
            </Switch>
          </BooksContextProvider>
        </section>
      </Suspense>
    </div>
  );
}

export default App;
