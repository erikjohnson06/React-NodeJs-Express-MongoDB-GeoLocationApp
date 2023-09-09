import React, { useEffect, useRef, useState } from 'react';

import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {

    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const imageSelectionRef = useRef();

    useEffect(() => {

        if (!file){
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(file);

    }, [file]);

    const selectedHandler = event => {

        let img;
        let imgIsValid = isValid;

        if (event.target.files || event.target.files.length === 1){
            img = event.target.files[0];
            setFile(img);
            setIsValid(true);
            imgIsValid = true;
        }
        else {
            setIsValid(false);
            imgIsValid = false;
        }

        props.onInput(props.id, img, imgIsValid);
    };

    const selectImageHandler = () => {
        imageSelectionRef.current.click();
    };

    return (
            <div className="form-control">
                <input
                    id={props.id}
                    ref={imageSelectionRef}
                    style={{display: 'none'}}
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={selectedHandler}
                />

                <div className={`image-upload ${props.center && 'center'}`}>
                    <div className="image-upload__preview">
                        {previewUrl && <img src={previewUrl} alt="Preview" />}

                    </div>
                    <Button type="button" onClick={selectImageHandler}>{props.buttonText}</Button>
                </div>
            </div>
            );
};

export default ImageUpload;