import { IonItem, IonLabel, IonInput, useIonAlert, IonTextarea, IonImg, IonButton, IonIcon } from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";
import { camera, locationOutline } from "ionicons/icons";

function FormCard( {post, handleSubmit} ) {
    const [title, setTitle] = useState("")
    const [userName, setUserName] = useState("")
    const [body, setBody] = useState("")
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("")
    const imgPlaceholder = "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    
    const [presentLocationDialog] = useIonAlert();
    const [error, setError] = useState("") 

    async function getCurrentPosition() {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log("Current position:", coordinates);
        getLocation(coordinates.coords.latitude, coordinates.coords.longitude);
    }

    async function getLocation(latitude, longitude) {
        const key = process.env.REACT_APP_MY_API_KEY
        const res = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=${key}&output=json&query=${latitude},${longitude}`
        );
        const result = await res.json();
        console.log(result);
        const loc = result.data[0];
        console.log(loc);
        setLocation(loc.locality);
    }

    useEffect(() => {
        if(post) {
            setTitle(post.title)
            setUserName(post.uid)
            setBody(post.body)
            setLocation(post.location)
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
        const formData = {title: title, uid: userName, body: body, location: location, image: image}
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
    
    function confirmLocation() {
        presentLocationDialog({
            title: 'Confirm location',
            message: 'Do you want to use Geolocation?',
            buttons: [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    handler: getCurrentPosition
                }
            ]
        })
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
                <IonLabel>Location:</IonLabel>
                <IonInput value={location} placeholder="Choose your location" onIonChange={event => setLocation(event.target.value)}></IonInput>
                <IonButton onClick={confirmLocation}>
                <ion-icon slot="icon-only" icon={locationOutline}></ion-icon>
                </IonButton>
            </IonItem>
            <IonItem>
                <IonLabel>Image:</IonLabel>
                <IonInput value={image} placeholder="Choose image URL" onIonChange={event => setImage(event.target.value)}></IonInput>
                <IonButton onClick={takePicture}>
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