import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as mobileNet from "@tensorflow-models/mobilenet";
import Rating from '@mui/material/Rating'
import { GiHotDog } from 'react-icons/gi'
import Webcam from "react-webcam";
import {Button, TextField, Paper, Stack} from '@mui/material'
import { Link, useHistory } from "react-router-dom";
import '@tensorflow/tfjs-backend-webgl'
import "../AddHotDog/AddHotDog.css"

const AddHotDog = () => {
    //tensorflowjs model
    const [model, setModel] = useState(null);
    const [image, setImage] = useState('');
    const [imageSrc, setImageSrc] = useState('')
    const [isHotdog, setIsHotdog] = useState(false)
    const [predictions, setPredictions] = useState([]);
    const [rating, setRating] = useState(0)
    const [description, setDescription] = useState('')
    const [probability, setProbability] = useState(0)
    const webcamRef = React.useRef(null);
    const canvasRef = useRef(null);

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (evt) => {
      evt.preventDefault()
        // uploadImage(imageSrc)
        dispatch({
            type: "ADD_HOT_DOG_PHOTO",
            payload: toSend
        })
        history.push('/user')
    }

    const hotdogNothotdog = (isHotdog) => {
        if (isHotdog){
            return (
                <h3 className='tag' key='1'>Great Hotdog</h3>
            )
        } else {
            return (
                <h3 className='tag' key='2'>Thats not a hotdog</h3>
            )
        }
    }

    const toSend = {
        user_id: user.id,
        rating: Number(rating),
        description: description,
        photo: imageSrc,
        probability :probability

    }
    
    //converts image to canvas so it can be analyzed 
    const onImageChange = async ({ target }) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        drawImageOnCanvas(target, canvas, ctx);
    
        const predictions = await model.classify(canvas, 1);
        if(predictions[0].className === "hotdog, hot dog, red hot"){
            setIsHotdog(true)
            setProbability(predictions[0].probability)
        }
        
        setPredictions(predictions);
      };
    //adds canvas
    const drawImageOnCanvas = (image, canvas, ctx) => {
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;
        canvas.width = image.width;
        canvas.height = image.height;
    
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const isLandscape = naturalWidth > naturalHeight;
        ctx.drawImage(
          image,
          isLandscape ? (naturalWidth - naturalHeight) / 2 : 0,
          isLandscape ? 0 : (naturalHeight - naturalWidth) / 2,
          isLandscape ? naturalHeight : naturalWidth,
          isLandscape ? naturalHeight : naturalWidth,
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
      };      
      //turns base64 image into blob for easier use
    const dataURItoBlob = (dataURI) =>{
        let byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        let blob = new Blob([ab], {type: mimeString});
        return blob;
      }

    const videoConstraints = {
        width: 400,
        height: 400,
        facingMode: "user"
      };

    const renderInput = () => (
        !image &&
            <>
                <Webcam
                        audio={false}
                        height={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={400}
                        videoConstraints={videoConstraints}
                        className='classified-image'
                        />
                <h3>Verify Your Dog!</h3>
                <Button sx={{ m: 1, width: '20ch' }} onClick={capture} variant="contained">Capture photo</Button>
            </>
            
      );
    
    const renderPreview = () => (
        image &&
        <div className="classified-image">
        <canvas ref={canvasRef} >
          <img alt="preview"  src={image} onLoad={onImageChange}/>
        </canvas>
        <Button sx={{ m: 1, width: '32ch' }} onClick={clear} variant="contained">Retake</Button>
        </div>
        
      );

    const clear = () => {
        setImage('')
    }



    const capture = React.useCallback(
        () => {
          const imageSrc = webcamRef.current.getScreenshot();
          const imageBlob = dataURItoBlob(imageSrc);
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageSrc)
          setImage(imageUrl)
        },
        [webcamRef]
      );
        //loads tensor flow model on page load
      useEffect(() => {
        const loadModel = async () => {
          const model = await mobileNet.load();
          setModel(model);
        };
        loadModel();
      }, []);
    
    return (
        <div className="hotdog-verify-image">
        <img src="https://fontmeme.com/permalink/220710/393c4b908525791220526a7b54b77d0b.png" alt="hot-dog-font" border="0"/>
        {renderInput()}
        {renderPreview()}
        {!!predictions.length && 
            <div className="tags-container">
                {hotdogNothotdog(isHotdog)}
            </div>
        }
        <form onSubmit={handleSubmit}>
        <Stack spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center">
        <Rating 
            size='large'
            icon={<GiHotDog />}
            emptyIcon={<GiHotDog />}
            sx={{
                fontSize: "4rem"
            }}
            required
            onChange={(evt)=>{setRating(evt.target.value)}}
        />
        <TextField
          id="Description"
          label="Description"
          placeholder="Description"
          sx={{ m: 1, width: '35ch' }}
          rows={4}
          multiline
          required
          onChange={(evt)=>{setDescription(evt.target.value)}}
        />
        {isHotdog ?
        <div>
            <Button sx={{ m: 1, width: '20ch' }} variant="contained" type="submit">Add HotDog!</Button>
        </div>
        :
        <div>
            <Button sx={{ m: 1, width: '20ch', 
              bgcolor: "#e83c2a",
              '&:hover': {
                backgroundColor: "#f58478" }}} component={Link} to='/user' variant="contained" type="submit">Cancel</Button>
        </div>
        }
        </Stack>
        </form>
        </div>
    )
}

export default AddHotDog