import React, { useState } from 'react'
import axios from 'axios';
import { Document } from 'react-pdf/dist/entry.webpack';
import document from './Syllabus_Sample.pdf';

const ClassSyllabus = (props) => {

  const [page, setPage] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setPage({ numPages });
  }

  return (
    <div className="home-box">
      <h1 className="title">Syllabus</h1>
      <div>
        <Document
          file="https://s3-us-west-1.amazonaws.com/group-project-whiteboard/Sample-Syllabus.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          loading={"please wait!"}
          noData={"No PDF Found"}
        />
      </div>
    </div>
  )
}

export default ClassSyllabus;