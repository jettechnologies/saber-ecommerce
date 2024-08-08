import React from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonThumbnail, 
  IonImg, 
  IonCardTitle
} from '@ionic/react';

type CategoryCardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, imageUrl }) => {
  return (
    <IonCard className='border border-gray'>
      <IonCardContent className="flex items-center">
        <div className="w-1/2 text-black">
          <IonCardTitle className="text-sm font-bold text-black first-letter:uppercase">{title}</IonCardTitle>
          <p className='text-sm'>{`${description.substring(0, 50)} ...`}</p>
        </div>
        <IonThumbnail className="w-1/2 h-full">
          <IonImg src={imageUrl} />
        </IonThumbnail>
      </IonCardContent>
    </IonCard>
  );
};

export default CategoryCard;