import { IonItem, IonLabel, IonInput, IonTextarea, IonImg, IonButton, IonIcon } from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

function FormCard( {post, handleSubmit} ) {
    const [title, setTitle] = useState("")
    const [userName, setUserName] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const imgPlaceholder = "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    
    const [error, setError] = useState("") 

    useEffect(() => {
        if(post) {
            setTitle(post.title)
            setUserName(post.uid)
            setBody(post.body)
            setImage(post.image)
        }
    }, [post])

    async function takePicture() {
        const imageOptions = {
            quality: 80,
            width: 500,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        };
        const image = await Camera.getPhoto(imageOptions);
        const imageUrl = image.dataUrl;
        setImage(imageUrl);
    }
    

    const submitForm = (event) => {
        event.preventDefault()
        const formData = {title: title, uid: userName, body: body, image: image}
        // handleSubmit(formData)
        if (formData.title === "" || formData.uid === "" || formData.body === "" || formData.image === "") {
            setError(
                <IonItem>
                <p style={{color: "red"}}>All fields must be filled</p>
                </IonItem>
            )
        } else {
            handleSubmit(formData)
        }
        
    }

    return (
        <form onSubmit={submitForm}>
            <IonItem>
                <IonLabel position="stacked">Title:</IonLabel>
                <IonInput value={title} placeholder="Type your title here" onIonChange={event => setTitle(event.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">User Name:</IonLabel>
                <IonInput value={userName} placeholder="User name" onIonChange={event => setUserName(event.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Description:</IonLabel>
                <IonTextarea value={body} placeholder="Type your description here" onIonChange={event => setBody(event.target.value)}></IonTextarea>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Image URL</IonLabel>
                <IonInput value={image} placeholder="Choose the URL for your image" onIonChange={event => setImage(event.target.value)}></IonInput>
            </IonItem>
            <IonItem onClick={takePicture} lines="none">
                <IonLabel>Choose Image</IonLabel>
                <IonButton>
                    <IonIcon slot="icon-only" icon={camera} />
                </IonButton>
            </IonItem>
                {error}
                <IonImg style={{height: "200px"}} className="ion-padding" src={image === "" ? imgPlaceholder : image} ></IonImg>
                <IonButton type="submit" expand="block">Save</IonButton>
                
                

        </form>
    )
}

export default FormCard