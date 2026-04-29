import { Product } from './types';

export const BRANDS = ['Mezco', 'Mafex', 'Bandai', 'Storm Collectibles', 'Otros'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Superman (Recovering Suit)',
    brand: 'Mezco',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608889175123-8ee36220fa40?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531259683607-1756291b4482?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Highly articulated Mezco One:12 Collective Superman in the iconic recovery suit.',
    category: 'DC Comics'
  },
  {
    id: '2',
    name: 'Spider-Man Blue Ver.',
    brand: 'Mafex',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=400&auto=format&fit=crop'
    ],
    description: 'The definitive Spider-Man figure with incredible range of motion and multiple accessories.',
    category: 'Marvel'
  },
  {
    id: '3',
    name: 'Goku Super Saiyan 4',
    brand: 'Bandai',
    price: 65.50,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585366119957-e556f081498b?q=80&w=800&auto=format&fit=crop'
    ],
    description: 'Premium S.H. Figuarts articulation for the ultimate Dragon Ball GT display.',
    category: 'Dragon Ball'
  },
  {
    id: '4',
    name: 'Darkseid Deluxe Edition',
    brand: 'Storm Collectibles',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1608889175123-8ee26220fa40?q=80&w=800&auto=format&fit=crop',
    description: 'Massive Darkseid figure with light-up features and swap-out heads.',
    category: 'DC Comics'
  },
  {
    id: '5',
    name: 'Batman (1989 Ver.)',
    brand: 'Mezco',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1531259683607-1756291b4482?q=80&w=800&auto=format&fit=crop',
    description: 'One:12 Collective Batman featuring the iconic 1989 cinematic suit.',
    category: 'DC Comics'
  },
  {
    id: '6',
    name: 'Iron Man Mark 85',
    brand: 'Bandai',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
    description: 'Avengers: Endgame Iron Man with die-cast parts and nanotech accessories.',
    category: 'Marvel'
  },
  {
    id: '7',
    name: 'Spider-Man (Peter B. Parker)',
    brand: 'Mafex',
    price: 94.00,
    image: 'https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=800&auto=format&fit=crop',
    description: 'Into the Spider-Verse version of Peter B. Parker with multiple suits.',
    category: 'Marvel'
  },
  {
    id: '8',
    name: 'Vegeta Super Saiyan',
    brand: 'Bandai',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop',
    description: 'The Prince of all Saiyans in his classic Super Saiyan form.',
    category: 'Dragon Ball'
  },
  {
    id: '9',
    name: 'Ghost Rider with Cycle',
    brand: 'Mezco',
    price: 180.00,
    image: 'https://images.unsplash.com/photo-1620336655055-188d7f6245a4?q=80&w=800&auto=format&fit=crop',
    description: 'Deluxe One:12 set featuring Ghost Rider and his Hell Cycle with light effects.',
    category: 'Marvel'
  },
  {
    id: '10',
    name: 'Wolverine (X-Men)',
    brand: 'Mafex',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=800&auto=format&fit=crop',
    description: 'Tiger stripe Wolverine with multiple heads and battle effects.',
    category: 'Marvel'
  },
  {
    id: '11',
    name: 'Mandalorian (Beskar)',
    brand: 'Mafex',
    price: 99.00,
    image: 'https://images.unsplash.com/photo-1585366119957-e556f081498b?q=80&w=800&auto=format&fit=crop',
    description: 'Din Djarin in full Beskar armor with a tiny Grogu accessory.',
    category: 'Star Wars'
  },
  {
    id: '12',
    name: 'Piccolo (Proud Namekian)',
    brand: 'Bandai',
    price: 68.00,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
    description: 'Highly detailed Piccolo figure with his trademark cloak and multiple poses.',
    category: 'Dragon Ball'
  },
  {
    id: '13',
    name: 'Sub-Zero',
    brand: 'Storm Collectibles',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1620336655055-188d7f6245a4?q=80&w=800&auto=format&fit=crop',
    description: 'Mortal Kombat 11 Sub-Zero with ice effects and brutal fatalities.',
    category: 'Mortal Kombat'
  },
  {
    id: '14',
    name: 'Green Lantern (Hal Jordan)',
    brand: 'Mezco',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'One:12 Collective Hal Jordan with power battery and energy constructs.',
    category: 'DC Comics'
  },
  {
    id: '15',
    name: 'Deadpool (X-Force Ver.)',
    brand: 'Mafex',
    price: 92.00,
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
    description: 'X-Force grey suit Deadpool with katanas, pistols, and multiple expressions.',
    category: 'Marvel'
  },
  {
    id: '16',
    name: 'Base de Exhibición Giratoria',
    brand: 'Otros',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop',
    description: 'Base motorizada con luz LED para resaltar los detalles de tus figuras.',
    category: 'Accesorios'
  },
  {
    id: '17',
    name: 'Set de Efectos de Impacto',
    brand: 'Otros',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'Efectos translúcidos compatibles con cualquier figura de 6-7 pulgadas.',
    category: 'Accesorios'
  },
  {
    id: '18',
    name: 'Capa de Tela con Alambre',
    brand: 'Otros',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1531259683607-1756291b4482?q=80&w=800&auto=format&fit=crop',
    description: 'Capa personalizada para figuras escala 1/12 con alambre interno para posado.',
    category: 'Personalización'
  },
  {
    id: '19',
    name: 'Doctor Fate',
    brand: 'Mezco',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'The agent of Order with golden helmet and real fabric cloak.',
    category: 'DC Comics'
  },
  {
    id: '20',
    name: 'Iron Fist',
    brand: 'Mezco',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
    description: 'Danny Rand in his classic green and yellow suit with dragon tattoo.',
    category: 'Marvel'
  },
  {
    id: '21',
    name: 'Cyclops (Comic Ver.)',
    brand: 'Mafex',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=800&auto=format&fit=crop',
    description: 'Classic 90s Cyclops with optic blast effects and leather jacket.',
    category: 'Marvel'
  },
  {
    id: '22',
    name: 'Homelander',
    brand: 'Mafex',
    price: 105.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'The leader of The Seven with a fabric cape and laser eye effects.',
    category: 'The Boys'
  },
  {
    id: '23',
    name: 'Frieza Fourth Form',
    brand: 'Bandai',
    price: 58.00,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop',
    description: 'S.H. Figuarts Frieza in his ultimate final form from the Namek Saga.',
    category: 'Dragon Ball'
  },
  {
    id: '24',
    name: 'Trunks (Future)',
    brand: 'Bandai',
    price: 72.00,
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800&auto=format&fit=crop',
    description: 'Future Trunks with cold steel sword and alternative Super Saiyan heads.',
    category: 'Dragon Ball'
  },
  {
    id: '25',
    name: 'Kung Lao',
    brand: 'Storm Collectibles',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1620336655055-188d7f6245a4?q=80&w=800&auto=format&fit=crop',
    description: 'The Shaolin monk with his razor-sharp hat and wind effects.',
    category: 'Mortal Kombat'
  },
  {
    id: '26',
    name: 'Solomon Grundy',
    brand: 'Storm Collectibles',
    price: 130.00,
    image: 'https://images.unsplash.com/photo-1608889175123-8ee26220fa40?q=80&w=800&auto=format&fit=crop',
    description: 'Massive Grundy figure with club accessories and swamp textures.',
    category: 'DC Comics'
  },
  {
    id: '27',
    name: 'Vitrina de Lujo',
    brand: 'Otros',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop',
    description: 'Vitrina acrílica con sellado antipolvo y espejo trasero.',
    category: 'Exhibición'
  },
  {
    id: '28',
    name: 'Set de Armas 1/12',
    brand: 'Otros',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'Pack de armas variadas compatibles con figuras de acción.',
    category: 'Accesorios'
  },
  {
    id: '29',
    name: 'Moon Knight (Crescent)',
    brand: 'Mezco',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
    description: 'The fist of Khonshu with glowing eyes and silver armor plates.',
    category: 'Marvel'
  },
  {
    id: '30',
    name: 'Bishop (90s Ver.)',
    brand: 'Mezco',
    price: 100.00,
    image: 'https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=800&auto=format&fit=crop',
    description: 'One:12 Collective Bishop with massive energy cannons and fabric uniform.',
    category: 'Marvel'
  },
  {
    id: '31',
    name: 'Cable (PXP)',
    brand: 'Mezco',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1608889175123-8ee26220fa40?q=80&w=800&auto=format&fit=crop',
    description: 'Techno-organic virus infected Cable with light-up eye and heavy weaponry.',
    category: 'Marvel'
  },
  {
    id: '32',
    name: 'Black Panther (Sovereign)',
    brand: 'Mezco',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800&auto=format&fit=crop',
    description: 'King T\'Challa in his sovereign suit with vibranium effects.',
    category: 'Marvel'
  },
  {
    id: '33',
    name: 'Catwoman (Selina Kyle)',
    brand: 'Mezco',
    price: 80.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'The master thief with whip, backpack, and multiple head sculpts.',
    category: 'DC Comics'
  },
  {
    id: '34',
    name: 'Magneto (Classic)',
    brand: 'Mezco',
    price: 90.00,
    image: 'https://images.unsplash.com/photo-1531259683607-1756291b4482?q=80&w=800&auto=format&fit=crop',
    description: 'Master of Magnetism with magnetic effects and heavy fabric cape.',
    category: 'Marvel'
  },
  {
    id: '35',
    name: 'Gambit',
    brand: 'Mafex',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=800&auto=format&fit=crop',
    description: 'The Ragin\' Cajun with kinetic card effects and bo staff.',
    category: 'Marvel'
  },
  {
    id: '36',
    name: 'Black Costume Spider-Man',
    brand: 'Mafex',
    price: 88.00,
    image: 'https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=800&auto=format&fit=crop',
    description: 'Spider-Man in the iconic Symbiote suit with multiple web effects.',
    category: 'Marvel'
  },
  {
    id: '37',
    name: 'Psylocke (Comic Ver.)',
    brand: 'Mafex',
    price: 92.00,
    image: 'https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=800&auto=format&fit=crop',
    description: 'Betsy Braddock with psychic butterfly effects and katanas.',
    category: 'Marvel'
  },
  {
    id: '38',
    name: 'Superman (Hush Ver.)',
    brand: 'Mafex',
    price: 94.00,
    image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd2d5337?q=80&w=800&auto=format&fit=crop',
    description: 'Hush Superman with poison ivy accessories and superb sculpt.',
    category: 'DC Comics'
  },
  {
    id: '39',
    name: 'The Joker (Hush Ver.)',
    brand: 'Mafex',
    price: 89.00,
    image: 'https://images.unsplash.com/photo-1531259683607-1756291b4482?q=80&w=800&auto=format&fit=crop',
    description: 'The Clown Prince of Crime in his classic purple suit with multiple heads.',
    category: 'DC Comics'
  }
];
