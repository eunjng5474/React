import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../fbase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import Tweet from '../components/Tweet';
import TweetFactory from '../components/TweetFactory';

export default ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, 'tweets'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArr);
    });
  }, []);

  // const getTweets = async () => {
  //   const q = query(collection(dbService, "tweets"))
  //   const querySnapshot = await getDocs(q)
  //   querySnapshot.forEach((doc) => {
  //     const tweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     }
  //     setTweets(prev => [tweetObj, ...prev])
  //   })
  // }

  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
