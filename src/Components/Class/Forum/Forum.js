import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './Forum.css';
import AddPost from './addPost/AddPost'

const Forum = (props) => {

  const classID = props.match.params.id;
  const [forum, updateForum] = useState('');
  const [adding, toggleAdd] = useState(false);

  useEffect(() => {
    return () => {
      return forum
    };
  }, [forum])

  useEffect(() => {
    axios.get(`/api/class/getForum?classid=${classID}`).then(res => {
      updateForum(res.data);
    }).catch(() => console.log('could not get at this time'));
  }, []);

  function showForum() {
    if (forum) {
      return forum.map(post => {
        return (
          <div key={post.id} className="forum-post">
          <h3>{post.firstname} {post.lastname}</h3>
          <p>{moment(post.date).format('M-D-YYYY')}</p>
          <p>{post.post}</p>
          </div>
        )
      })
    }
  }


  return(
    <div className="class-forum-container">
    <AddPost
      adding={adding}
      toggleAdd={toggleAdd}
      id={props.id}
      classid={classID}
      updateForum={updateForum}
    />
      <h1>Forum</h1>
      <button className='add-event-button' onClick={() => toggleAdd(() => !adding)}>Add Post</button>
      <div className="class-posts-container">
        {showForum()}
      </div>
    </div>
  )
}

export default withRouter(Forum);