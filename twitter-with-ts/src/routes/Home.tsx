import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserInfo } from '../components/App';
import { ref } from 'firebase/storage';
import { dbService, storageService } from '../fbase';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid';

export interface TweetInputs {
  tweet: string;
  creatorId: UserInfo;
  imageUrl?: string;
}

export interface ITweetData extends TweetInputs {
  createdAt: number;
}

export interface ITweetObj extends ITweetData {
  id: string;
}

function Home({ uid }: Partial<UserInfo>) {
  // const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<ITweetObj[]>([]);

  useEffect(() => {
    // get tweets
    onSnapshot(query(collection(dbService, 'tweets'), orderBy('createdAt', 'desc')), (snapshot) => {
      const tweetArray: ITweetObj[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as ITweetData),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TweetInputs>({
    mode: 'onChange',
  });
  const onSubmit = async () => {
    console.log('uid: ', uid);
    const { tweet } = getValues();
    try {
      // const storageRef = ref(storageService, `${uid}/${uuidv4()}`)
      const tweetRef = await addDoc(collection(dbService, 'tweets'), {
        tweet,
        creatorId: uid,
        createdAt: Date.now(),
      });
      console.log('Document writtem with Id: ', tweetRef.id);
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('tweet', { required: true })}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        {errors.tweet?.message && <div>{errors.tweet.message}</div>}
        <button disabled={isValid ? false : true}>Tweet</button>
      </form>
      <div>
        {tweets.map(({ tweet }) => (
          <div>{tweet}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
