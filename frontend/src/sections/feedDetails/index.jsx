import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { FetchPostDetails } from 'src/api/user.get';
import { UpdatePostViews } from 'src/api/user.post';

const FeedDetails = () => {
  const { id } = useParams();
  // const isFocused = useIsFocused();
  const [postDetails, setpostDetails] = useState([]);

  const fetchPostDetails = async () => {
    try {
      const resp = await FetchPostDetails(id);
      if (resp.status === 200) {
        setpostDetails(resp.data?.post);
        updateViewCount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateViewCount = async () => {
    try {
      const resp = await UpdatePostViews(id);
      if (resp.status === 200) {
        console.log('View count updated');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostDetails();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Post Details</h1>
      <p>ID: {id}</p>
      <p>Title: {postDetails.title}</p>
      <p>Description: {postDetails.description}</p>
      <p>Views: {postDetails.views}</p>
      <img src={postDetails?.media} alt="post" />
    </div>
  );
};

export default FeedDetails;
