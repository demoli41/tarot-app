export interface TarotCard {
  id: number;
  imageSrc: string; 
  title: string;
  tarotReflection: string;
  wisdomOfBirthSupport: string;
  isReversed?: boolean; 
}