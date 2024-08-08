import React from 'react';
import { NavLink } from 'react-router-dom';
import { home, storefront, compass, person } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
// import { useLocation } from 'react-router-dom';

const CustomTabs: React.FC = () => {

  return (
    <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full flex justify-around py-3 px-4">
      <NavLink to="/" className="cursor-pointer p-2 flex flex-col items-center text-black hover:text-blue focus:text-blue focus:outline-none">
        <IonIcon icon={home} className="text-xl" />
        <span className="text-xs">Home</span>
      </NavLink>
      <NavLink to="/categories" className="cursor-pointer p-2 flex flex-col items-center text-black hover:text-blue focus:text-blue focus:outline-none">
        <IonIcon icon={storefront} className="text-xl" />
        <span className="text-xs">Categories</span>
      </NavLink>
      <NavLink to="/order/track" className="cursor-pointer p-2 flex flex-col items-center text-black hover:text-blue focus:text-blue focus:outline-none">
        <IonIcon icon={compass} className="text-xl" />
        <span className="text-xs">Track</span>
      </NavLink>
      <NavLink to="/account" className="cursor-pointer p-2 flex flex-col items-center text-black hover:text-blue focus:text-blue focus:outline-none">
        <IonIcon icon={person} className="text-xl" />
        <span className="text-xs">Account</span>
      </NavLink>
      {/* <NavLink to="/settings" className="cursor-pointer p-2 flex flex-col items-center text-black hover:text-blue focus:text-blue focus:outline-none">
        <IonIcon icon={settings} className="text-xl" />
        <span className="text-xs">Settings</span>
      </NavLink> */}
    </div>
  );
};

export default CustomTabs;
