import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fbase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

export default ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  const getMyTweets = async () => {
    const q = query(
      collection(dbService, 'tweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };
  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newDisplayName}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" style={{ marginTop: 10 }} />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
