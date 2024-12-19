export interface RegularUser {
  correlationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  bucketKeyName?: string;
  address?: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  username?: string;
  roles: string[];
  token?: string;
}

export interface FoodItem {
  taxRate: number;
  tag: string;
  englishName: string;
  englishDescription: string;
  correlationId: string;
  price: string;
  itemOptions?: FoodItemOption[];
  abbreviation: string;
  bucketKeyName: string;
  nonEnglishName: string;
  nonEnglishDescription: string;
}

export interface FoodItemOption {
  correlationId: string;
  name: string;
  description: string;
  renderSequence: number;
  itemOptionElements?: ItemOptionElement[];
  isRequired: boolean;
}

export interface ItemOptionElement {
  correlationId: string;
  name: string;
  description: string;
  renderSequence: number;
  price: string;
}
