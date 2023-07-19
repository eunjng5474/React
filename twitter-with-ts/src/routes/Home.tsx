import { useState } from 'react';

function Home() {
  const [tweet, setTweet] = useState('');

  return (
    <div>
      <form>
        <input type="text" placeholder="what's on your mind?" maxLength={120} />
        <input type="submit" value="Tweet" />
      </form>
    </div>
  );
}

export default Home;
