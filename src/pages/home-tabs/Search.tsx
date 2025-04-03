import { 
  IonButtons,
    IonContent, 
    IonHeader, 
    IonMenuButton, 
    IonPage, 
    IonSearchbar, 
    IonTitle, 
    IonToolbar,
    IonRadio,
    IonRadioGroup,

} from '@ionic/react';
const Search: React.FC = () => {
  return (
    <IonRadioGroup value="strawberries">
      <IonRadio value="FRIST NAME">MJ </IonRadio>
      <br />
      <IonRadio value="LAST NAME">Obsid</IonRadio>
      <br />
      <IonRadio value="USERNAME">Magsalos</IonRadio>
      <br />
      <IonRadio value="AGE">20</IonRadio>
    </IonRadioGroup>
  );
};
export default Search;