import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent,IonFabButton, IonFab, IonIcon, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react';
import { add } from "ionicons/icons";
import SingleCard from '../components/SingleCard';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([])

  const history = useHistory();

  // fetch posts from database 
  async function fetchPosts() {
    const dbUrl = process.env.REACT_APP_DB_URL + "/posts.json"
    const response = await fetch(dbUrl)
    const posts = await response.json()
    // change the posts from object to array
    const postsArray = Object.keys(posts).map(key => ({id: key, ...posts[key]}))
    setPosts(postsArray.reverse())
  }

  async function refreshPosts(e) {
    await fetchPosts();
    setTimeout(() => {
      e.detail.complete()
    }, 1000)
  }

  useIonViewWillEnter(() => {
    fetchPosts()
  })
  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WhatAreYouUpTo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshPosts}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList className='container'>
          {
            posts.map(post => <SingleCard className="grid-container" title={post.title} location={post.location} image={post.image} uid={post.uid} body={post.body} key={post.id} id={post.id}/>
            )
          }
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="open-modal">
          <IonIcon onClick={() => history.push("/add")} icon={add}/> 
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
