import React, { Suspense } from 'react';
import { Link, Switch, Route } from 'wouter';
import { HeadProvider, Meta } from 'react-head';
import Header from 'components/Header';
import Detail from 'pages/Detail';
import SearchResults from 'pages/SearchResults';
import Accounts from 'pages/Accounts';
import { BooksContextProvider } from 'context/books';
import { CredentialsContextProvider } from 'context/credentials';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Home'));

function App() {
  return (
    <HeadProvider>
      <div className="App">
      <Meta name="google-signin-client_id" content="700033872626-3luf86l08cdbcr5a1r3ktbf3i2tfrm9l.apps.googleusercontent.com" />
        <Suspense fallback={null}>
          <section className='App-content'>
            <BooksContextProvider>
              <CredentialsContextProvider>
                <Header>
                  <Link to="/">
                    <h1>KATI</h1>
                  </Link>
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
    </HeadProvider>
  );
}

export default App;
