import React from 'react';
import Dropzone from 'react-dropzone'; // Used for uploading image into react
import { v4 as randomString } from 'uuid'; // used to create random string for S3 url
import axios from 'axios';
import Button from '@material-ui/core/Button';

export default function UploadFile(props) {

  const {setFile} = props; // setFile gets passed down from parent component to set the file
  
  // On drop takes the file uploaded through react-dropzone formats the file and link to be ready for AWS upload
  async function onDrop(files) {
    let changeFile = files[0]
    const replaceName = `${changeFile.name.replace(/\s/g, '-')}`;
    const fileName = `${randomString()}-${replaceName}`;
    const fileType = changeFile.type;
    generateAWSLink({ fileName, fileType, file: files[0] });
  };

  // This function takes the fileName, FileType, and file from onDrop, and will send that info to the backend to create our URL to upload the image to. 
  function generateAWSLink(obj) {
    axios.put('/aws/getLink', obj).then(res => {
      const { signedRequest, url } = res.data;
      const { file } = obj
      setFile(() => {
        return url
      })
      const header = {
        headers: {
          'Content-Type': obj.fileType
        }
      };
      putInAWS({signedRequest, header, file});
    }).catch(err => console.log('error at generateLink', err));
  };
  
  // This function will upload the image to amazon using the url given to use in generateAWSLink, with the file and header
  function putInAWS(obj) {
    const { header, signedRequest, file } = obj;
    axios.put(signedRequest, file, header).then(() => {
    }).catch(err => console.log('error at addToAws', err))
  };

  return (
    <Dropzone onDropAccepted={onDrop} multiple={false}> 
    {/* DROPZONE ALLOWS US TO DROP A FILE INTO REACT, ondrop accepted will call the onDrop function */}
      {
        ({ getRootProps, getInputProps }) => (
          <section className="aws-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button color='secondary'>Upload File</Button>
            </div>
          </section>
        )
      }
    </Dropzone>
  )
}