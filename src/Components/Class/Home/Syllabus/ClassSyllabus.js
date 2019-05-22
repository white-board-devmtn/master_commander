import React, { useState } from 'react'
import axios from 'axios';
import document from './Syllabus_Sample.pdf';

const ClassSyllabus = (props) => {

  const [page, setPage] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setPage({ numPages });
  }

  return (
    <div className="home-box">
      <h1 className="title">Syllabus</h1>
      <div className="syl-container">
        <iframe name="syllubus"src={document} className="syl" width="80em"></iframe>
      </div>
    </div>
  )
}

export default ClassSyllabus;