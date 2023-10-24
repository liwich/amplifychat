import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);



function App({ signOut, user }) {
  

  return (
    <div className="App">
      <h1>Hola!!{user.attributes.name}</h1>
    </div>
  );
}

export default withAuthenticator(App);
