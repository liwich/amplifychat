import { Amplify, API } from 'aws-amplify';
import { getUsers, listPosts} from './graphql/queries'
import { createUsers } from './graphql/mutations';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

import { useEffect, useState } from 'react';

Amplify.configure(awsExports);

function App({ signOut, user }) {

  let [statePosts, setStatePosts] = useState([])

  useEffect(() => {

    let getUser = async () => {
      const oneUsers = await API.graphql({
        query: getUsers,
        variables: { id: user.username }
      });

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

      let posts = await API.graphql({
        query: listPosts
      });

      setStatePosts(posts.data.listPosts.items);


    }

    getUser();

  }, [user]);

  return (
    <div className="App">
      <h1>Hola!!{user.attributes.name}</h1>

      {
        statePosts.map(x=>{
          return (<h2>{x.message}</h2>)
        })
      }
    </div>
  );
}

export default withAuthenticator(App);
