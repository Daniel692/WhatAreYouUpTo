import { IonButton, IonImg, IonInput, IonItem, IonLabel, IonTextarea } from "@ionic/react"
import { useEffect, useState } from "react"

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
    

    const submitForm = (event) => {
        event.preventDefault()
        const formData = {title: title, uid: userName, body: body, image: image}
        handleSubmit(formData)
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
                <IonInput placeholder="Type your title here" onIonChange={event => setTitle(event.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">User Name:</IonLabel>
                <IonInput placeholder="User name" onIonChange={event => setUserName(event.target.value)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Description:</IonLabel>
                <IonTextarea placeholder="Type your description here" onIonChange={event => setBody(event.target.value)}></IonTextarea>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Image URL</IonLabel>
                <IonInput placeholder="Choose the URL for your image" onIonChange={event => setImage(event.target.value)}></IonInput>
            </IonItem>
                {error}
                <IonImg style={{height: "200px"}} className="ion-padding" src={image === "" ? imgPlaceholder : image} ></IonImg>
                <IonButton type="submit" expand="block">Create</IonButton>
                

        </form>
    )
}

export default FormCard