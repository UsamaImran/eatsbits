import { MdDirectionsBike } from 'react-icons/md';
import { MdOutlineDirectionsWalk } from 'react-icons/md';

export const CATEGORIES_DATA = [
  { name: 'Pizza' },
  { name: 'Burger' },
  { name: 'Sushi' },
  { name: 'Pasta' },
  { name: 'Dessert' },
  { name: 'Drinks' },
  { name: 'Salad' },
];

export const SERVICES = [
  {
    title: 'To go',
    label: 'Takeaway',
    value: 'PICK_UP',

    icon: MdOutlineDirectionsWalk,
    timing: '8:30 - 18:00',
  },

  {
    title: 'Delivery',
    label: 'Delivery',
    value: 'DELIVERY',

    icon: MdDirectionsBike,
    timing: '8:30 - 18:00',
  },
];
