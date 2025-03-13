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

export const Login: React.FC = () => {
  const navigation = useIonRouter();
  
  const doLogin = () => {
      // You can add login validation here
      navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  const goToRegister = () => {
      navigation.push('/it35-lab/register', 'forward');
  };

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Login</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding' fullscreen>
              <IonGrid>
                  <IonRow className="ion-justify-content-center ion-align-items-center" style={{ minHeight: '100vh' }}>
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
                          <IonButton expand="full" fill="outline" onClick={goToRegister}>
                              Register
                          </IonButton>
                          <IonText color="danger" className="ion-text-center">
                              <p className="ion-padding-top"></p>
                          </IonText>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
  );
};

export const Register: React.FC = () => {
  const navigation = useIonRouter();

  const doRegister = () => {
      // Registration logic here
      navigation.push('/it35-lab', 'back', 'replace'); // Redirects to Login page after registration
  };

  return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Register</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding' fullscreen>
              <IonGrid>
                  <IonRow className="ion-justify-content-center ion-align-items-center" style={{ minHeight: '100vh' }}>
                      <IonCol size="12" sizeMd="8" sizeLg="6">
                          <IonItem>
                              <IonLabel position="stacked">Full Name</IonLabel>
                              <IonInput type="text" placeholder="Enter your full name" clearInput required />
                          </IonItem>
                          <IonItem>
                              <IonLabel position="stacked">Email</IonLabel>
                              <IonInput type="email" placeholder="Enter your email" clearInput required />
                          </IonItem>
                          <IonItem>
                              <IonLabel position="stacked">Username</IonLabel>
                              <IonInput type="text" placeholder="Choose a username" clearInput required />
                          </IonItem>
                          <IonItem>
                              <IonLabel position="stacked">Password</IonLabel>
                              <IonInput type="password" placeholder="Create a password" clearInput required />
                          </IonItem>
                          <IonItem>
                              <IonLabel position="stacked">Confirm Password</IonLabel>
                              <IonInput type="password" placeholder="Confirm your password" clearInput required />
                          </IonItem>
                          <IonButton expand="full" onClick={doRegister}>
                              Register
                          </IonButton>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
  );
};
