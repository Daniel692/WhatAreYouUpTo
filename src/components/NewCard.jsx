
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import "./NewCard.css"

const NewCard = (props) => {

  return (
        <IonCard>
          <IonCardHeader>
            <IonImg className='post-img' src={props.image}/>
            <IonCardTitle>{props.title}</IonCardTitle>
            <IonCardSubtitle>From: {props.uid}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {props.body}
          </IonCardContent>
        </IonCard>
  );
};

export default NewCard