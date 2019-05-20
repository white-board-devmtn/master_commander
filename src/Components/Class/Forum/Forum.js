import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './Forum.scss';
import AddPost from './addPost/AddPost'
import Button from '@material-ui/core/Button';

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
          <div key={post.id} className="post">
            <img src={post.img} alt="person"/>
            <div className="info">
              <div className="title">
                <h3>{post.firstname} {post.lastname}:</h3>
                <p>Date: {moment(post.date).format('M-D-YYYY h:mm:ss')}</p>
              </div>
              <div className="details">
                <p>{post.post}</p>
              </div>
            </div>
          </div>
        )
      })
    }
  }


  return (
    <div className="class-forum-container">
      <AddPost
        adding={adding}
        toggleAdd={toggleAdd}
        id={props.id}
        classid={classID}
        updateForum={updateForum}
      />
      <div className="header">
        <Button onClick={() => toggleAdd(() => !adding)}>Add Post</Button>
      </div>
      <div className="class-posts">
        {showForum()}
      </div>
    </div>
  )
}

export default withRouter(Forum);