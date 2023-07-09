import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy }
 from "firebase/firestore";
import Tweet from "../components/Tweet";

export default ({userObj}) => {
  const [tweet, setTweet] = useState("")
  const [tweets, setTweets] = useState([])

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
  useEffect(()=> {
    const q = query(
      collection(dbService, "tweets"),
      orderBy("createdAt", "desc")
    )
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setTweets(tweetArr)
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      })
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    setTweet("")
  }
  const onChange = (e) => {
    setTweet(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} 
          type="text" maxLength={120} 
          placeholder="What's on your mind?"/>
        <input type="submit" value="Tweet"/>
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} 
            isOwner={tweet.creatorId === userObj.uid}/>
        ))}
      </div>
    </div>
  )
}