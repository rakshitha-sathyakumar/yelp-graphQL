import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import backendURI from './backendServer';
const client = new ApolloClient({
  uri: `${backendURI}/graphql`
});

//App Component
class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            {/* App Component Has a Child Component called Main*/}
            <Main/>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;