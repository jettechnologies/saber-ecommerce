import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonIcon,
  IonButton,
  IonBadge,
  IonItem,
  IonSearchbar,
  IonTitle,
  IonButtons
} from '@ionic/react';
import { searchOutline, bagOutline, closeOutline, arrowBackOutline } from 'ionicons/icons';
import { useCartContext } from '@/context/cartContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { useUserProfile } from '@/context/userProfileContext'; 

type Props = {
  user?: { name: string; profile_pic: string | null } | null;
};

interface FormValues {
  search: string;
}

const Header: React.FC<Props> = ({ user }) => {
  const { cartItems, deletingCart } = useCartContext();
  const [isSearch, setIsSearch] = useState(false);
  const { isLogin } = useAuth();
  const { logout } = useUserProfile();


  const { handleSubmit, formState: { errors, isValid }, setValue } = useForm<FormValues>();
  const location = useLocation();
  const paths: string[] = location.pathname.split('/').filter(Boolean);
  const currentPath = paths.at(-1);
  const navigate = useNavigate();


  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isValid) {
      navigate(`/store?search=${encodeURIComponent(data.search)}`);
    } else {
      const errorMessage = errors.search?.message || 'Invalid input';
      alert(errorMessage);
      console.log(errorMessage);
    }
    setIsSearch(false);
  };

  const handleSearchChange = (e: CustomEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setValue('search', value, { shouldValidate: true });
  };

  // function for login out of the app
  const handleLogout = () =>{    
    logout();
    deletingCart();
  }

  return (
    <IonHeader className="border-b pb-1">
      {currentPath ? (
        <IonToolbar className="px-4">
          <IonButtons slot="start">
            <IonButton onClick={() => navigate(-1)}>
              <IonIcon icon={arrowBackOutline} className="text-2xl text-black" />
            </IonButton>
          </IonButtons>
          <IonTitle className="text-md font-bold capitalize">{currentPath}</IonTitle>
          <IonItem lines="none" className="item-no-padding relative w-fit" slot="end">
            <IonButton href="/cart" fill="clear" size="small" className="button-no-padding text-black">
              <IonIcon icon={bagOutline} className="text-2xl text-black" />
            </IonButton>
            {cartItems.length > 0 && (
              <IonBadge color="dark" className="flex items-center justify-center text-sm text-center w-5 h-5 rounded-full absolute top-2 right-2 z-30">
                <p>{cartItems.length}</p>
              </IonBadge>
            )}
          </IonItem>
        </IonToolbar>
      ) : (
        <IonToolbar>
          <div className="flex justify-between px-4 py-2">
            <div className="flex items-center">
              {user?.profile_pic ? (
                <img
                  src={user?.profile_pic}
                  alt="Profile image"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : user?.name ? (
                <p className="text-size-600 uppercase text-white bg-black text-center flex items-center justify-center w-10 h-10 rounded-full border">
                  {user?.name.split(' ')[0].substring(0, 1)}
                </p>
              ) : null}
              <span className="ml-4 text-xl font-medium capitalize">Hi, {user?.name ? user?.name : 'Guest'}</span>
            </div>
            <div className="flex items-center space-x-4">
              <IonButton onClick={() => setIsSearch(!isSearch)} fill="clear" size="small" className="button-no-padding">
                {isSearch ? <IonIcon icon={closeOutline} className="text-2xl text-black" /> : <IonIcon icon={searchOutline} className="text-2xl text-black" />}
              </IonButton>
              <IonItem lines="none" className="item-no-padding relative w-fit">
                <IonButton href="/cart" fill="clear" size="small" className="button-no-padding text-black">
                  <IonIcon icon={bagOutline} className="text-2xl text-black" />
                </IonButton>
                {cartItems.length > 0 && (
                  <IonBadge color="dark" className="flex items-center justify-center text-sm text-center w-5 h-5 rounded-full absolute top-2 right-2 z-30">
                    <p>{cartItems.length}</p>
                  </IonBadge>
                )}
              </IonItem>
            </div>
          </div>
        </IonToolbar>
      )}
      {isSearch && (
        <IonToolbar>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <IonSearchbar
              showCancelButton="never"
              showClearButton="focus"
              color="light"
              inputmode="search"
              animated
              placeholder="Search products"
              onIonInput={handleSearchChange}
            ></IonSearchbar>
          </form>
        </IonToolbar>
      )}
      {currentPath === 'account' && (
        <IonToolbar className="px-4">
          {!isLogin ? (
            <>
              <IonTitle>Welcome, Guest</IonTitle>
              <IonButtons slot="end">
                <IonButton
                  href="/auth/login"
                  className="bg-[#141718] text-white px-4 py-1 rounded-md border-none"
                >
                  Login
                </IonButton>
              </IonButtons>
            </>
          ) : (
            <>
              <div className="flex items-center">
                {user?.profile_pic ? (
                  <img
                    src={user.profile_pic}
                    alt="Profile image"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : user?.name ? (
                  <p className="text-size-600 uppercase text-white bg-black text-center flex items-center justify-center w-10 h-10 rounded-full border">
                    {user.name.split(' ')[0].substring(0, 1)}
                  </p>
                ) : null}
                <span className="ml-4 text-xl font-medium capitalize">Hi, {user?.name ? user.name : 'Guest'}</span>
              </div>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => handleLogout()}
                  className="bg-[#141718] text-white px-4 py-1 rounded-md border-none"
                >
                  Logout
                  {/* <IonIcon icon={exitOutline} className="ml-2 outline-white border border-white" /> */}
                </IonButton>
              </IonButtons>
            </>
          )}
        </IonToolbar>
      )}
    </IonHeader>
  );
};

export default Header;