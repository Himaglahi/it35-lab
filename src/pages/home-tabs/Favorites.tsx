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

const Favorites: React.FC = () => {
  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot="start">
                      <IonMenuButton />
                  </IonButtons>
                  <IonTitle>Favorites</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
              <IonCard>
                  <IonCardHeader>
                      <IonCardTitle>TOP FAVORITES TEAMS IN NBA</IonCardTitle>
                      
                  </IonCardHeader>
                  <IonCardContent>
                      <IonList>
                          <IonItem>
                              <IonThumbnail slot="start">
                                  <img alt="Item 1" src="https://i.pinimg.com/736x/4a/0d/af/4a0daf5cbe91aaed185f81e09642fb17.jpg" /> 
                              </IonThumbnail>
                              <IonLabel>LAKERS</IonLabel>
                          </IonItem>

                          <IonItem>
                              <IonThumbnail slot="start">
                                  <img alt="Item 2" src="https://i.pinimg.com/originals/53/1b/f3/531bf3c54422daf61bfa0b9725ef0410.jpg" /> 
                              </IonThumbnail>
                              <IonLabel>GOLDEN STATES WARRIORS</IonLabel>
                          </IonItem>

                          <IonItem lines="none">
                              <IonThumbnail slot="start">
                                  <img alt="Item 4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCS-4OB0YmOweAk5D_qg7vB1y-3J2yplm3A&s" /> 
                              </IonThumbnail>
                              <IonLabel>MILWAKE BUCKS</IonLabel>
                          </IonItem>
                      </IonList>
                  </IonCardContent>
              </IonCard>
              <div
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                  }}
              >
                  Favorites
              </div>
          </IonContent>
      </IonPage>
  );
};

export default Favorites;