import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'; // Changed to a more professional user icon
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    setShowToast(true);
    setIsLoading(false);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
      <IonContent className="ion-padding" color="light">
        <div className="login-container">
          <div className="login-card">
            <div className="logo-container">
              <IonAvatar className="logo-avatar">
                <IonIcon 
                  icon={personCircleOutline}  // Changed to a more professional user icon
                  className="logo-icon"
                />
              </IonAvatar>
            </div>
            
            <h1 className="login-title">WGAPO KA?</h1>
            <h2 className="login-subtitle">Sign in daw be cong maka continue baka?</h2>
            
            <div className="form-group">
              <IonInput
                className="custom-input"
                label="Email" 
                labelPlacement="floating" 
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={e => setEmail(e.detail.value!)}
                style={{ '--color': '#ff9900' }}  // Added black text color
              />
            </div>
            
            <div className="form-group">
              <IonInput
                className="custom-input"
                fill="outline"
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                style={{ '--color': '#ff9900' }}  // Added black text color
              >
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </div>
            
            <IonButton 
              className="login-button"
              onClick={doLogin} 
              expand="block" 
              shape="round"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </IonButton>
            
            <div className="register-link">
              <IonButton 
                routerLink="/it35-lab/register" 
                fill="clear" 
                size="small"
                className="register-button"
              >
                Don't have an account? <strong>Register</strong>
              </IonButton>
            </div>
          </div>
        </div>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;

const styles = `
  @keyframes floatCard {
    0%, 100% {
      transform: translateY(0);
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2), 0 0 20px 3px rgba(108, 99, 255, 0.6);
    }
    50% {
      transform: translateY(-20px);
      box-shadow: 0 25px 40px rgba(0, 0, 0, 0.3), 0 0 35px 7px rgba(108, 99, 255, 0.8);
    }
  }

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(to bottom right, rgba(226, 156, 6, 0.9), rgb(0, 0, 0)); 
  }

  .login-card {
    width: 90%;
    max-width: 400px;
    background: rgb(245, 237, 237);
    border-radius: 16px;
    padding: 32px;
    animation: floatCard 4s ease-in-out infinite;
    transition: transform 0.2s ease-in-out;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  }

  .logo-avatar {
    width: 100px;
    height: 100px;
    background: rgba(14, 13, 13, 0.99);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(50, 206, 211, 0.1);
  }

  .logo-icon {
    font-size: 80px;
    color: rgb(5, 5, 5);
  }

  .login-title {
    text-align: center;
    color: rgb(3, 3, 3);
    margin-bottom: 8px;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .login-subtitle {
    text-align: center;
    color: rgb(0, 0, 0);
    margin-bottom: 32px;
    font-size: 15px;
    line-height: 1.4;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .custom-input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid rgb(252, 252, 252);
    color: #000000;
    outline: none;
    transition: border-color 0.3s ease;
  }

  .custom-input:focus {
    border-color: rgb(219, 161, 0);
    box-shadow: 0 0 0 2px rgba(207, 161, 10, 0.2);
  }

  .login-button {
    width: 100%;
    background-color: rgb(243, 170, 11);
    color: #ffffff;
    height: 48px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .login-button:hover,
  .login-button:focus {
    background-color: rgb(218, 150, 4);
  }

  .register-link {
    text-align: center;
    margin-top: 24px;
  }

  .register-button {
    background: none;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .register-button:hover {
    color: rgba(201, 132, 4, 0.72);
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .login-card {
      padding: 24px;
    }

    .logo-avatar {
      width: 80px;
      height: 80px;
    }

    .logo-icon {
      font-size: 60px;
    }

    .login-title {
      font-size: 22px;
    }

    .login-subtitle {
      font-size: 13px;
    }
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);