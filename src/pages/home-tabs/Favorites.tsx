import {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonThumbnail,
    IonTitle,
    IonToolbar
  } from '@ionic/react';
  import './Favorites.css'; // Assuming you will use an external CSS file
  
  const Favorites: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen color="light">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>TOP FAVORITES TEAMS IN NBA</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem className="favorite-item">
                  <IonThumbnail slot="start">
                    <img alt="Lakers" src="https://i.pinimg.com/736x/4a/0d/af/4a0daf5cbe91aaed185f81e09642fb17.jpg" />
                  </IonThumbnail>
                  <IonLabel>LAKERS</IonLabel>
                </IonItem>
  
                <IonItem className="favorite-item">
                  <IonThumbnail slot="start">
                    <img alt="Warriors" src="https://i.pinimg.com/originals/53/1b/f3/531bf3c54422daf61bfa0b9725ef0410.jpg" />
                  </IonThumbnail>
                  <IonLabel>GOLDEN STATE WARRIORS</IonLabel>
                </IonItem>
  
                <IonItem className="favorite-item" lines="none">
                  <IonThumbnail slot="start">
                    <img alt="Bucks" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCS-4OB0YmOweAk5D_qg7vB1y-3J2yplm3A&s" />
                  </IonThumbnail>
                  <IonLabel>MILWAUKEE BUCKS</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Favorites;
  