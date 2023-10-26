import { Amplify, API } from 'aws-amplify';
import { getUsers, listUsers } from './graphql/queries'
import { createUsers } from './graphql/mutations';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

import { useEffect, useState } from 'react';

import Chat from './components/Chat'
import Menu from './components/Menu'
import UsersList from './components/UsersList'
import './App.css';

Amplify.configure(awsExports);

function App({ signOut, user }) {

  let [stateUsers, setStateUsers] = useState([])
  let [stateUser, setStateUser] = useState(null);

  useEffect(() => {

    let getUser = async () => {
      const oneUsers = await API.graphql({
        query: getUsers,
        variables: { id: user.username }
      });

      setStateUser(oneUsers.data.getUsers);

      if (!oneUsers.data.getUsers) {
        await API.graphql({
          query: createUsers,
          variables: {
            input: {
              "id": user.username,
              "firstName": user.attributes.name,
              "lastName": user.attributes.family_name,
              "email": user.attributes.email
            }
          }
        });
      }

      let users = await API.graphql({
        query: listUsers
      });

      setStateUsers(users.data.listUsers.items);
    }

    getUser();


  }, [user]);

  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='row bg-body-secondary'>

          <div className="col-md-2 p-3 text-bg-dark">
            <Menu user={user} signOut={signOut} />
          </div>

          <div className='col-md-6'>
            <Chat stateUser={stateUser} />
          </div>

          <div className='col' style={{ overflowY: 'scroll', height: '100vh' }} >
            <UsersList users={stateUsers} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
