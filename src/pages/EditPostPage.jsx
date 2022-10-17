import { IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from "@ionic/react";

import FormCard from '../components/CardForm'

export default function EditPostPage(post, dismiss) {

    async function updatePost(postToUpdate) {
        const dbUrl = `https://nimble-monument-344608-default-rtdb.europe-west1.firebasedatabase.app/posts/${post.id}.json`
        await fetch(dbUrl, {
            method: "PUT",
            body: JSON.stringify({ ...post, ...postToUpdate })
        })
        console.log(JSON.stringify({ ...post, ...postToUpdate }))
        dismiss()
    }

    return (
        <IonContent>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="secondary">
                    <IonButton onClick={() => dismiss()}>Cancel</IonButton>
                </IonButtons>
                <IonTitle>Edit Post</IonTitle>
            </IonToolbar>
        </IonHeader>
        <FormCard post={post} handleSubmit={updatePost} />
    </IonContent>
    )
}