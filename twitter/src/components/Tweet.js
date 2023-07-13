import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const TweetTextRef = doc(dbService, 'tweets', `${tweetObj.id}`);
  const urlRef = ref(storageService, tweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm('정말 이 트윗을 삭제하시겠습니까?');
    if (ok) {
      try {
        await deleteDoc(TweetTextRef);
        if (tweetObj.attachmentUrl !== '') {
          await deleteObject(urlRef);
        }
      } catch (e) {
        window.alert('트윗을 삭제하는 데 실패했습니다.');
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(TweetTextRef, {
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your tweet"
                  value={newTweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Tweet" className="formBtn" />
              </form>
              <button onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl} />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
