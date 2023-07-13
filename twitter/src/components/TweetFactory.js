import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../fbase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = '';
    // 이미지 첨부하는 경우에만 attachmentUrl 업데이트
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, 'data_url');
      // console.log(await response.ref.getDownloadURL());
      attachmentUrl = await getDownloadURL(response.ref);
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, 'tweets'), tweetObj);
    setTweet('');
    setAttachment('');

    // try {
    //   const docRef = await addDoc(collection(dbService, 'tweets'), {
    //     text: tweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    //   console.log('Document written with ID: ', docRef.id);
    // } catch (e) {
    //   console.error('Error adding document: ', e);
    // }
    // setTweet('');
  };

  const onChange = (e) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const fileInput = useRef();
  const onClearAttachment = () => {
    fileInput.current.value = '';
    setAttachment('');
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={tweet}
          onChange={onChange}
          type="text"
          maxLength={120}
          placeholder="What's on your mind?"
        />
        {/* <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} /> */}
        <input className="factoryInput__arrow" type="submit" value="Tweet" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{ opacity: 0 }} />
      {attachment && (
        <div className="factoryForm__attachment">
          <img src={attachment} style={{ backgroundImage: attachment }} />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
