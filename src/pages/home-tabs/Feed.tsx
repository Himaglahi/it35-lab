import { 
  IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonSearchbar, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react';
import FeedContainer from '../../components/FeedContainer';

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonToolbar color="primary">
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Feed</IonTitle>
          </IonToolbar>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
    <FeedContainer />
      </IonContent>
    </IonPage>
  );
};

export default Feed;