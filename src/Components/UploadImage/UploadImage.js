import React, {useState} from 'react';
import Dropzone from 'react-dropzone'; // Used for uploading image into react
import { v4 as randomString } from 'uuid'; // used to create random string for S3 url
import axios from 'axios';

function UploadImage() {

  const [image, setImage] = useState('');
  
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
      setImage(() => {
        return url
      })
      const header = {
        headers: {
          'Content-Type': obj.fileType
        }
      };
      console.log(file);
      putInAWS({signedRequest, header, file});
    }).catch(err => console.log('error at generateLink', err));
  };
  
  // This function will upload the image to amazon using the url given to use in generateAWSLink, with the file and header
  function putInAWS(obj) {
    const { header, signedRequest, file } = obj;
    console.log(file)
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
              <button>Image</button>
            </div>
          </section>
        )
      }
    </Dropzone>
  )
}

export default UploadImage;