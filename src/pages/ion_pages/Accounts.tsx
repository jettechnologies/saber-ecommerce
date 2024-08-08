import { IonPage, IonContent, IonItem, IonLabel, IonList, IonIcon } from '@ionic/react';
import { chevronForwardOutline, createOutline, cubeOutline, heartOutline, lockClosedOutline, personOutline } from 'ionicons/icons';

const Accounts = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding bg-gray">
        <div className="mt-36">
            <IonList lines='none'>
                <IonItem href = "/user/profile" className='py-1'>
                    <IonIcon icon = {personOutline} className='mr-2'/>
                    <IonLabel>My Account</IonLabel>
                    <IonIcon icon = {chevronForwardOutline} slot = "end" className='mr-2'/>
                </IonItem>
                <IonItem href = "/user/orders" className='py-1'>
                    <IonIcon icon = {cubeOutline} className='mr-2'/>
                    <IonLabel>Orders</IonLabel>
                    <IonIcon icon = {chevronForwardOutline} slot = "end" className='mr-2'/>
                </IonItem>
                <IonItem href = "/user/wishlist" className='py-1'>
                    <IonIcon icon = {heartOutline} className='mr-2'/>
                    <IonLabel>Favorites</IonLabel>
                    <IonIcon icon = {chevronForwardOutline} slot = "end" className='mr-2'/>
                </IonItem>
                <IonItem href = "/user/edit-account" className='py-1'>
                    <IonIcon icon = {createOutline} className='mr-2'/>
                    <IonLabel>Edit Profile</IonLabel>
                    <IonIcon icon = {chevronForwardOutline} slot = "end" className='mr-2'/>
                </IonItem>
                <IonItem href = "/user/reset-password" className='py-1'>
                    <IonIcon icon = {lockClosedOutline} className='mr-2'/>
                    <IonLabel>Change Password</IonLabel>
                    <IonIcon icon = {chevronForwardOutline} slot = "end" className='mr-2'/>
                </IonItem>
            </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Accounts;
