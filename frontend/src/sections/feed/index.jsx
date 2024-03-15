import React, { useState, useEffect } from 'react';

import FeedTile from 'src/components/FeedTile'; // Add this import
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import { useRouter } from 'src/routes/hooks';

import { FetchAllPosts } from 'src/api/user.get';

const DraggablePost = ({ post }) => {
  const router = useRouter();
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'feed',
      item: { post },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <FeedTile
      drag={dragRef}
      title={post.title}
      description={post.description}
      media={post.media}
      views={post.views}
      onClick={() => {
        router.push(`/feedDetails/${post._id}`);
      }}
    />
  );
};
DraggablePost.propTypes = {
  post: PropTypes.object.isRequired, // Change PropTypes.any to PropTypes.object
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const resp = await FetchAllPosts();
      if (resp.status === 200) {
        setAllPosts(resp.data?.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="feed">
      {allPosts.map((post, index) => (
        <DraggablePost key={index} post={post} />
      ))}
    </div>
  );
};

export default Feed;

// import React, { useState, useEffect } from 'react'; // Import useDrop
// import PropTypes from 'prop-types';
// import { useDrag, useDrop } from 'react-dnd';

// import { useRouter } from 'src/routes/hooks';

// import { FetchAllPosts } from 'src/api/user.get';

// import FeedTile from 'src/components/FeedTile';

// const DraggablePost = ({ post, index, movePost }) => {
//   const router = useRouter();
//   const [{ isDragging }, dragRef] = useDrag(
//     () => ({
//       type: 'feed',
//       item: { index },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//     }),
//     [index]
//   );

//   const [, dropRef] = useDrop({
//     accept: 'feed',
//     hover(item, monitor) {
//       if (!dragRef.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       movePost(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   dragRef(dropRef);

//   return (
//     <FeedTile
//       title={post.title}
//       description={post.description}
//       media={post.media}
//       views={post.views}
//       isDragging={isDragging}
//       onClick={() => {
//         router.push(`/feedDetails/${post.id}`);
//       }}
//     />
//   );
// };

// DraggablePost.propTypes = {
//   post: PropTypes.object.isRequired,
//   index: PropTypes.number.isRequired,
//   movePost: PropTypes.func.isRequired,
// };

// const Feed = () => {
//   const [allPosts, setAllPosts] = useState([]);

//   const fetchAllPosts = async () => {
//     try {
//       const resp = await FetchAllPosts();
//       if (resp.status === 200) {
//         setAllPosts(resp.data?.posts);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllPosts();
//   }, []);

//   const movePost = (dragIndex, hoverIndex) => {
//     const newPosts = [...allPosts];
//     const draggedPost = newPosts[dragIndex];

//     newPosts.splice(dragIndex, 1);
//     newPosts.splice(hoverIndex, 0, draggedPost);

//     setAllPosts(newPosts);
//   };

//   return (
//     <div className="feed">
//       {allPosts.map((post, index) => (
//         <DraggablePost key={index} post={post} index={index} movePost={movePost} />
//       ))}
//     </div>
//   );
// };

// export default Feed;
