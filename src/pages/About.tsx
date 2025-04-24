import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Full Name</h2>
              <p>Juan Dela Cruz</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Age</h2>
              <p>25</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Address</h2>
              <p>Cebu City, Philippines</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Email</h2>
              <p>juan@example.com</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Phone</h2>
              <p>0912-345-6789</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default About;
