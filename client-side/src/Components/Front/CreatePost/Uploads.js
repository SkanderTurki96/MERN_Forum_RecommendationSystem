import * as React from 'react';
import './Uploads.css';
import Alert from '@mui/material/Alert';


function Uploads (props) {
    const [IsValid , setIsValid] = React.useState(false);
    const [IsClicked , setClicked] = React.useState(false);
    const [LinkImage , setLinkImage] = React.useState("");
    const [LinkAudio , setLinkAudio] = React.useState("");
    const [LinkVideo , setLinkVideo] = React.useState("");
    const [progress, setProgress] = React.useState(0);
    const [ImageState, setImageState] = React.useState("");
    const [ImageName , setImageName] = React.useState("");
    const [VideoState, setVideoState] = React.useState("");
    const [VideoName , setVideoName] = React.useState("");
    const [AudioState, setAudioState] = React.useState("");
    const [AudioName , setAudioName] = React.useState("");

    const ImageInputRef = React.useRef(null);
    const handleFormClick = () => {
        ImageInputRef.current.click();
      };
    const VideoInputRef = React.useRef(null);
    const handleFormClick1 = () => {
        VideoInputRef.current.click();
      };
    const handleImageUpload = (e) => {
        e.preventDefault();
        setImageState("uploading")
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'Blog_Internship'); 
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/turkiskander/image/upload', true);
        xhr.upload.onprogress = (event) => {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setImageName(data.original_filename)
            setLinkImage(data.url);
            setImageState("uploaded");
            } else {
            console.error('Error uploading video:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Network error occurred while uploading');
        };

        xhr.send(formData);

    }
    const handleVideoUpload = (e) => {
        e.preventDefault();
        setVideoState("uploading")
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'Blog_Internship'); 
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/turkiskander/video/upload', true);
        xhr.upload.onprogress = (event) => {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setVideoName(data.original_filename)
            setLinkVideo(data.url);
            setVideoState("uploaded");
            } else {
            console.error('Error uploading video:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Network error occurred while uploading');
        };

        xhr.send(formData);

    }
    const handleAudioUpload = (e) => {
        e.preventDefault();
        setAudioState("uploading")
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'Blog_Internship'); 
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/turkiskander/video/upload', true);
        xhr.upload.onprogress = (event) => {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
        };
        xhr.onload = () => {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setAudioName(data.original_filename)
            setLinkAudio(data.url);
            setAudioState("uploaded");
            } else {
            console.error('Error uploading Audio:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Network error occurred while uploading');
        };

        xhr.send(formData);

    }
    React.useEffect (() => {
        if(props.data.Type === "Article")
        {
            if(LinkImage !== "")
            setIsValid(true)
            else 
            setIsValid(false)
        }
        else if (props.data.Type === "Video")
        {
            if(LinkImage !== "" && LinkVideo !== "")
            setIsValid(true)
            else 
            setIsValid(false)
        }
        else 
        {
            if(LinkImage !== "" && LinkAudio !=="")
            setIsValid(true)
            else 
            setIsValid(false)
        }
    }, [LinkImage , LinkAudio, LinkVideo])
    const callhandlestep  = (e) => {
        console.log(IsValid)
        if (IsValid)
        { 
            props.sendDataToParent({
                LinkImage: LinkImage, 
                LinkAudio: LinkAudio,
                LinkVideo: LinkVideo
            });
            props.handlestep()
        }
            
        else
        setClicked(true)
    }
    const handlestepdown = () => {
        props.handlestepdown()
    }
    

    return(
        <>
            {
                props.data.Type === "Article" ? 
                <div className='UploadContainer'>
                    <header>Image Uploader</header>
                    <form onClick={handleFormClick}>
                        <input 
                            type="file"
                            onChange={handleImageUpload} 
                            className='file-input' 
                            ref={ImageInputRef} 
                            hidden
                        />
                        <ion-icon name="cloud-upload"></ion-icon>
                        <p>Browse File to Upload</p>
                    </form>
                    {ImageState === "uploading" ?
                    <section className='progress-area'>
                        <li className='row-input'>
                            <ion-icon name="document"></ion-icon>
                            <div className='content'>
                                <div className='detail'>
                                    <span className='name'>Uploading</span>
                                    <span className='percent'>{progress}%</span>
                                </div>
                                <div className='progress-bar'>
                                    <div 
                                        className='progress' 
                                        style={{
                                            width: `${progress}%`,
                                          }}
                                        ></div>
                                </div>
                            </div>
                        </li>
                    </section>:
                    ImageState === "uploaded" ?    
                    <section className='uploaded-area'>
                        <li className='row-input'>
                            <div className='content'>
                                <ion-icon name="document"></ion-icon>
                                <div className='detail'>
                                    <span className='name'>{ImageName} .Uploaded</span>
                                </div>
                            </div>
                            <ion-icon name="checkmark-done"></ion-icon>
                        </li>
                    </section> : 
                    null}
                    <div className='ButtonWrapper'>
                        <button onClick={handlestepdown}  className='Details-Goback-button'>Go Back</button>
                        <button onClick={callhandlestep} className='Details-submit-button' >Next</button>  
                    </div>
                    {IsValid == false && IsClicked ?<Alert variant="filled" severity="error">
                        You need to upload media necessary.
                    </Alert> : null}
                </div>:
                props.data.Type === "Video" ?
                <div style={{width : '100%'}}>
                    <div className='VideoInputContainer'>
                        <div className='UploadContainer'>
                        <header>Image Uploader</header>
                        <form onClick={handleFormClick}>
                            <input 
                                type="file"
                                onChange={handleImageUpload} 
                                className='file-input' 
                                ref={ImageInputRef} 
                                hidden
                            />
                            <ion-icon name="cloud-upload"></ion-icon>
                            <p>Browse File to Upload</p>
                        </form>
                        {ImageState === "uploading" ?
                        <section className='progress-area'>
                            <li className='row-input'>
                                <ion-icon name="document"></ion-icon>
                                <div className='content'>
                                    <div className='detail'>
                                        <span className='name'>Uploading</span>
                                        <span className='percent'>{progress}%</span>
                                    </div>
                                    <div className='progress-bar'>
                                        <div 
                                            className='progress' 
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                            ></div>
                                    </div>
                                </div>
                            </li>
                        </section>:
                        ImageState === "uploaded" ?    
                        <section className='uploaded-area'>
                            <li className='row-input'>
                                <div className='content'>
                                    <ion-icon name="document"></ion-icon>
                                    <div className='detail'>
                                        <span className='name'>{ImageName} .Uploaded</span>
                                    </div>
                                </div>
                                <ion-icon name="checkmark-done"></ion-icon>
                            </li>
                        </section> : 
                        null}
                    </div>
                    <div className='UploadContainer'>
                        <header>Video Uploader</header>
                        <form onClick={handleFormClick1}>
                            <input 
                                type="file"
                                onChange={handleVideoUpload} 
                                className='file-input' 
                                ref={VideoInputRef} 
                                hidden
                            />
                            <ion-icon name="cloud-upload"></ion-icon>
                            <p>Browse File to Upload</p>
                        </form>
                        {VideoState === "uploading" ?
                        <section className='progress-area'>
                            <li className='row-input'>
                                <ion-icon name="document"></ion-icon>
                                <div className='content'>
                                    <div className='detail'>
                                        <span className='name'>Uploading</span>
                                        <span className='percent'>{progress}%</span>
                                    </div>
                                    <div className='progress-bar'>
                                        <div 
                                            className='progress' 
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                            ></div>
                                    </div>
                                </div>
                            </li>
                        </section>:
                        VideoState === "uploaded" ?    
                        <section className='uploaded-area'>
                            <li className='row-input'>
                                <div className='content'>
                                    <ion-icon name="document"></ion-icon>
                                    <div className='detail'>
                                        <span className='name'>{VideoName} .Uploaded</span>
                                    </div>
                                </div>
                                <ion-icon name="checkmark-done"></ion-icon>
                            </li>
                        </section> : 
                        null}
                    </div>
                </div>
                <div className='ButtonWrapper'>
                        <button onClick={handlestepdown}  className='Details-Goback-button'>Go Back</button>
                        <button onClick={callhandlestep} className='Details-submit-button' >Next</button>  
                </div>
                    {IsValid === false && IsClicked ?<Alert variant="filled" severity="error">
                        You need to upload media necessary.
                    </Alert> : null}
                </div>:
                props.data.Type === "Podcast" ?
                <div style={{width : '100%'}}>
                    <div className='PodcastInputContainer'>
                        <div className='UploadContainer'>
                        <header>Image Uploader</header>
                        <form onClick={handleFormClick}>
                            <input 
                                type="file"
                                onChange={handleImageUpload} 
                                className='file-input' 
                                ref={ImageInputRef} 
                                hidden
                            />
                            <ion-icon name="cloud-upload"></ion-icon>
                            <p>Browse File to Upload</p>
                        </form>
                        {ImageState === "uploading" ?
                        <section className='progress-area'>
                            <li className='row-input'>
                                <ion-icon name="document"></ion-icon>
                                <div className='content'>
                                    <div className='detail'>
                                        <span className='name'>Uploading</span>
                                        <span className='percent'>{progress}%</span>
                                    </div>
                                    <div className='progress-bar'>
                                        <div 
                                            className='progress' 
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                            ></div>
                                    </div>
                                </div>
                            </li>
                        </section>:
                        ImageState === "uploaded" ?    
                        <section className='uploaded-area'>
                            <li className='row-input'>
                                <div className='content'>
                                    <ion-icon name="document"></ion-icon>
                                    <div className='detail'>
                                        <span className='name'>{ImageName} .Uploaded</span>
                                    </div>
                                </div>
                                <ion-icon name="checkmark-done"></ion-icon>
                            </li>
                        </section> : 
                        null}
                    </div>
                    <div className='UploadContainer'>
                        <header>Audio Uploader</header>
                        <form onClick={handleFormClick1}>
                            <input 
                                type="file"
                                onChange={handleAudioUpload} 
                                className='file-input' 
                                ref={VideoInputRef} 
                                hidden
                            />
                            <ion-icon name="cloud-upload"></ion-icon>
                            <p>Browse File to Upload</p>
                        </form>
                        {AudioState === "uploading" ?
                        <section className='progress-area'>
                            <li className='row-input'>
                                <ion-icon name="document"></ion-icon>
                                <div className='content'>
                                    <div className='detail'>
                                        <span className='name'>Uploading</span>
                                        <span className='percent'>{progress}%</span>
                                    </div>
                                    <div className='progress-bar'>
                                        <div 
                                            className='progress' 
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                            ></div>
                                    </div>
                                </div>
                            </li>
                        </section>:
                        AudioState === "uploaded" ?    
                        <section className='uploaded-area'>
                            <li className='row-input'>
                                <div className='content'>
                                    <ion-icon name="document"></ion-icon>
                                    <div className='detail'>
                                        <span className='name'>{AudioName} .Uploaded</span>
                                    </div>
                                </div>
                                <ion-icon name="checkmark-done"></ion-icon>
                            </li>
                        </section> : 
                        null}
                    </div>
                </div>
                <div className='ButtonWrapper'>
                        <button onClick={handlestepdown}  className='Details-Goback-button'>Go Back</button>
                        <button onClick={callhandlestep} className='Details-submit-button' >Next</button>  
                </div>
                    {IsValid === false && IsClicked ?<Alert variant="filled" severity="error">
                        You need to upload media necessary.
                    </Alert> : null}
                </div>:
                null

            }
            
        </>
    );
}
export default Uploads;