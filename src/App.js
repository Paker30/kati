import React, { Suspense } from 'react';
import { Link, Switch, Route } from 'wouter';
import Header from 'components/Header';
import Detail from 'pages/Detail';
import SearchResults from 'pages/SearchResults';
import Accounts from 'pages/Accounts';
import { BooksContextProvider } from 'context/books';
import { CredentialsContextProvider } from 'context/credentials';
import './App.css';
import packageInfo from '../package.json';

const HomePage = React.lazy(() => import('./pages/Home'));

function App() {
  return (
      <div className="App">
        <Suspense fallback={null}>
          <section className='App-content'>
            <BooksContextProvider>
              <CredentialsContextProvider>
                <Header>
                  <Link to="/">
                    <h1>KATI</h1>
                  </Link>
                    <small>{packageInfo.version}</small>
                </Header>
                <Switch>
                  <Route component={HomePage} path="/" />
                  <Route component={Detail} path="/book/:id" />
                  <Route component={SearchResults} path="/search/:keyword/:category" />
                  <Route component={Accounts} path="/login" />
                </Switch>
              </CredentialsContextProvider>
            </BooksContextProvider>
          </section>
        </Suspense>
      </div>
  );
}

export default App;
