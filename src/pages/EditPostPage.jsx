import { IonButton, useIonAlert, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory} from 'react-router-dom';
import { useParams } from "react-router";

import CardForm from '../components/CardForm'

export default function EditPostPage() {
    const history = useHistory()
    const { id } = useParams();
    const [post, setPost] = useState({})
    const [presentDeleteDialog] = useIonAlert();

    useEffect(() => {
        async function getPost() {
            const res = await fetch(process.env.REACT_APP_DB_URL + `/posts/${id}.json`)
            const post = await res.json()
            setPost(post)
            console.log(post)
        }
        getPost()
      }, [])


    async function updatePost(post, postToUpdate) {
        const dbUrl = process.env.REACT_APP_DB_URL + `/posts/${id}.json`
        await fetch(dbUrl, {
            method: "PUT",
            body: JSON.stringify({ ...post, ...postToUpdate })
        }).then(response => console.log(response))
        history.push("/")
    }

    async function deletePost() {
        const dbUrl = process.env.REACT_APP_DB_URL + `/posts/${id}.json`;
        const response = await fetch(dbUrl, {
            method: "DELETE"
        });
        console.log(response);
        history.push("/")
    }

    function confirmDelete() {
        presentDeleteDialog({
            title: 'Confirm delete',
            message: 'Do you want to delete this Post?',
            buttons: [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    handler: deletePost
                }
            ]
        })
      }


    return (
        <IonContent>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="secondary">

                </IonButtons>
                <IonTitle>Edit Post</IonTitle>
            </IonToolbar>
        </IonHeader>
        <CardForm post={post} handleSubmit={updatePost} />
        <IonButton type="submit" expand="block" color="danger" onClick={confirmDelete}>Delete</IonButton>
    </IonContent>
    )
}
