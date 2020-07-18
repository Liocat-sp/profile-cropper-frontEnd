import React, { useState, useEffect, useCallback, useRef } from 'react';
import crop from './Crop/crop';
import './imageCropper.css';
import Modal from '../components/Modal/Modal';
import Loader from '../components/Loader/Loader';


const ImageCropper = (props) => {
    const [image, setImage] = useState();
    const piker = useRef();
    const [imageUrl, setimageUrl] = useState(null);
    const [onShow, setOnshow] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [pixel, setPixel] = useState();
    const [croppedImage, setCroppedImage] = useState(null);
    const [cropper, setCropper] = useState({
        imageUrl: "",
        crop: { x: 0, y: 0 },
        zomm: 1,
        aspect: 4 / 4
    });

    const onCropChange = crop => {
        setCropper(prev => { return ({ ...prev, crop: crop }) });
    }
    const onCropComplete = (cropArea, cropedAreaPixels) => {
        setPixel(cropedAreaPixels);
    }
    const onZoomChange = zoom => {
        setCropper(prev => { return ({ ...prev, zoom: zoom }) });
    }

    useEffect(() => {
        if (!image) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setCropper(prev => { return { ...prev, imageUrl: fileReader.result } });
            setOnshow(true);
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    function onChangeHandler(event) {
        console.log(event.target.files);
        if (event.target.files && event.target.files.length === 1) {
            setImage(event.target.files[0]);
        }
    }
    function onPickHandler() {
        piker.current.click();
    }

    const show = useCallback(async () => {
        try {
            setisLoading(true);
            const croppedImage = await crop(cropper.imageUrl, pixel);
            setimageUrl(croppedImage);
            onModalClose();
            setisLoading(false);
            const formData = new FormData();
            formData.append('image', croppedImage);
            const response = await fetch('http://localhost:5000/image', { method: "POST", body: formData });
            const get = await response.json();
            setCroppedImage('http://localhost:5000/uploads/' + get.url);
            console.log(get);
        }
        catch (e) {
            console.log(e);
        }
    }, [pixel, cropper.imageUrl]);

    const onModalClose = () => {
        setOnshow(false);
    }

    return (
        <React.Fragment>
            {isLoading && <Loader asOverLay />}
            <div className="Cropper">
                <div className="profile_pic">
                    {croppedImage && <img src={imageUrl ? imageUrl : croppedImage} alt="croped" />}

                    {/* This is in case backend is not available */}
                    
                    {!croppedImage && imageUrl && <img src={imageUrl} alt="croped" />} 
                </div>
                <div className="img_container">
                    <input
                        className="img_Input"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        ref={piker} style={{ display: "none" }}
                        onChange={onChangeHandler} />
                    <button
                        onClick={onPickHandler}
                        className="img_picker">Pick Image
                </button>
                </div>
                {onShow && <Modal
                    cropper={cropper}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                    show={show}
                    onShow={onShow}
                    isLoading={isLoading}
                    onClose={onModalClose} />}
            </div>
        </React.Fragment>
    );
}

export default ImageCropper; 