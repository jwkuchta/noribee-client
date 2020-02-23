import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { addUserToDB } from './functions'

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  addUserToDB(user)
//   debugger

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      {console.log(user)}
    </Fragment>
  );
};

export default Profile;