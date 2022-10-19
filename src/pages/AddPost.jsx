import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useHistory } from "react-router"
import CardForm from "../components/CardForm"

const AddPost = () => {
    const history = useHistory()

    async function handleSubmit(newPost) {

        const dbUrl = process.env.REACT_APP_DB_URL + '/posts.json'
        await fetch(dbUrl, {
            method: "POST",
            body: JSON.stringify(newPost)
        })
        history.push("/home")
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add New Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Add New Post</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <CardForm handleSubmit={handleSubmit}/>
            </IonContent>

        </IonPage>
    )
}


export default AddPost