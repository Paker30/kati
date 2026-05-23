import React, { Suspense, useRef, useEffect } from "react";
import { Link, Switch, Route } from "wouter";
import { Header } from "./components/Header";
import Detail from "./pages/Detail";
import SearchResults from "./pages/SearchResults";
import Accounts from "./pages/Accounts";
import { KatiContextProvider } from "./context/kati";
import "./App.css";
import packageInfo from "../package.json";
import {Elm} from"./Main.elm";

const HomePage = React.lazy(() => import("./pages/Home"));

const App = () => {
  //Use refs to track both the DOM node and the Elm app instance
  const elmNodeRef=useRef(null);
  const elmAppRef=useRef(null);

  useEffect(()=>{
    //Only initialize Elm if it hasn't been initialized yet
    if(elmNodeRef.current&&!elmAppRef.current){
      elmAppRef.current=Elm.Main.init({
        node:elmNodeRef.current,
      });
    }
  },[]);

  return (
    <div className="App">
      <Suspense fallback={null}>
        <section className="App-content">
          <KatiContextProvider>
            <div ref={elmNodeRef}></div>
            <Header>
              <div>
                <Link to="/">
                  <h1>KATI</h1>
                </Link>
                <span>{packageInfo.version}</span>
              </div>
            </Header>
            <main>
              <Switch>
                <Route component={HomePage} path="/" />
                <Route component={Detail} path="/book/:id" />
                <Route
                  component={SearchResults}
                  path="/search/:keyword/:category"
                />
                <Route component={Accounts} path="/login" />
              </Switch>
            </main>
          </KatiContextProvider>
        </section>
      </Suspense>
    </div>
  );
}

export default App;
