import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonInput, 
  IonLabel, 
  IonPage, 
  IonText, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonGrid, 
  IonRow, 
  IonCol,
  useIonRouter 
} from '@ionic/react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  
  const doLogin = () => {
      // You can add login validation here
      navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Login</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
              <IonGrid>
                  <IonRow className="ion-justify-content-center">
                      <IonCol size="12" sizeMd="8" sizeLg="6">
                          <IonItem>
                              <IonLabel position="stacked">Username</IonLabel>
                              <IonInput type="text" placeholder="Enter your username" clearInput required />
                          </IonItem>
                          <IonItem>
                              <IonLabel position="stacked">Password</IonLabel>
                              <IonInput type="password" placeholder="Enter your password" clearInput required />
                          </IonItem>
                          <IonButton expand="full" onClick={doLogin}>
                              Login
                          </IonButton>
                          <IonText color="danger">
                              <p className="ion-padding-top">Invalid username or password</p>
                          </IonText>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
  );
};
