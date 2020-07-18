import React from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-easy-crop';
import './Modal.css'

const ModalOverlay = props => {
    const { onClose, onCropComplete, onZoomChange, onCropChange, cropper, show } = props.props;
    const content = (
        <div className="Modal">
            <div className="Modal_content">
                <div className="Modal_sub">
                    <Cropper
                        image={cropper.imageUrl}
                        zoom={cropper.zoom}
                        crop={cropper.crop}
                        aspect={cropper.aspect}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropComplete} />
                </div>
                <div className="Buttons_div">
                    <button className="img_submit_btn" onClick={show}>Submit</button>
                    <button onClick={onClose}>close</button>
                </div>
            </div>
        </div>
    )
    return ReactDOM.createPortal(content, document.getElementById('modal'));
}

const Modal = (props) => {
    return (
            <ModalOverlay props={props} />
    );
}

export default Modal;