
import { IonCard, IonButton, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';
import { useHistory} from 'react-router-dom';

import "./NewCard.css"


const SingleCard = (props) => {

  const history = useHistory();
  function goToPost() {
    history.push("/post/" + props.id)
    window.location.reload(false);
   }

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
<IonButton shape="round" expand="block" color="secondary" onClick={goToPost}>Edit</IonButton>

        </IonCard>
  );
};

export default SingleCard
