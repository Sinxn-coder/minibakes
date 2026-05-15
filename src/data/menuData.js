import loveCake from '../assets/lovecake1.png';

import cupcake1 from '../assets/cupcake1.png';
import cupcake2 from '../assets/cupcake2.png';
import cupcake3 from '../assets/cupcake3.png';
import cupcake6 from '../assets/cupcake6.png';

import brownies from '../assets/brownies_box.png';
import cakepops from '../assets/cakepops.png';
import pops_1 from '../assets/cake pops/pops (1).png';
import pops_2 from '../assets/cake pops/pops (2).png';
import pops_3 from '../assets/cake pops/pops (3).png';
import heart1 from '../assets/heartbrake/1.png';
import sicles1 from '../assets/cake sicles/cakesicles (1).png';
import sicles2 from '../assets/cake sicles/cakesicles (2).png';
import sicles3 from '../assets/cake sicles/cakesicles (3).png';
import sicles4 from '../assets/cake sicles/cakesicles (4).png';
import sicles5 from '../assets/cake sicles/cakesicles (5).png';
import mini1 from '../assets/minicakes/1.png';
import mini2 from '../assets/minicakes/2.png';
import cakesicles5 from '../assets/cakesicles5.png';
import breakableHeart from '../assets/breakable_heart.png';

// Heart Cake Gallery
import heart_1 from '../assets/cakes/heart/heart (1).png';
import heart_2 from '../assets/cakes/heart/heart (2).png';
import heart_3 from '../assets/cakes/heart/heart (3).png';
import heart_4 from '../assets/cakes/heart/heart (4).png';
import heart_5 from '../assets/cakes/heart/heart (5).png';
import heart_6 from '../assets/cakes/heart/heart (6).png';

const heartImages = [heart_1, heart_2, heart_3, heart_4, heart_5, heart_6];

// Round Cake Gallery
import round_1 from '../assets/cakes/round/round (1).png';
import round_2 from '../assets/cakes/round/round (2).png';
import round_3 from '../assets/cakes/round/round (3).png';
import round_4 from '../assets/cakes/round/round (4).png';
import round_5 from '../assets/cakes/round/round (5).png';
import round_6 from '../assets/cakes/round/round (6).png';
import round_7 from '../assets/cakes/round/round (7).png';
import round_8 from '../assets/cakes/round/round (8).png';
import round_9 from '../assets/cakes/round/round (9).png';
import round_10 from '../assets/cakes/round/round (10).png';
import round_11 from '../assets/cakes/round/round (11).png';
import round_12 from '../assets/cakes/round/round (12).png';

const roundImages = [
  round_1, round_2, round_3, round_4, round_5, round_6,
  round_7, round_8, round_9, round_10, round_11, round_12
];

// Cupcake Gallery
import cupcake_1 from '../assets/cupcakes/cupcake (1).png';
import cupcake_2 from '../assets/cupcakes/cupcake (2).png';
import cupcake_3 from '../assets/cupcakes/cupcake (3).png';
import cupcake_4 from '../assets/cupcakes/cupcake (4).png';
import cupcake_5 from '../assets/cupcakes/cupcake (5).png';
import cupcake_6 from '../assets/cupcakes/cupcake (6).png';
import cupcake_7 from '../assets/cupcakes/cupcake (7).png';

const cupcakeImages = [
  cupcake_1, cupcake_2, cupcake_3, cupcake_4, cupcake_5, cupcake_6, cupcake_7
];

export const menuData = [
  {
    category: "Cakes",
    items: [
      { id: 'c1', name: '6 inch, 2 Layer (Round)', price: '€45', img: round_3, images: roundImages, description: 'Serves ~10. Classic round cake. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c2', name: '6 inch, 2 Layer (Heart)', price: '€50', img: heart_1, images: heartImages, description: 'Serves ~10. Elegant heart-shaped design. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c3', name: '8 inch, 2 Layer (Round)', price: '€65', img: round_2, images: roundImages, description: 'Serves ~20 - 25. Perfect for celebrations. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c4', name: '8 inch, 2 Layer (Heart)', price: '€72', img: heart_2, images: heartImages, description: 'Serves ~20 - 25. Show extra love with a large heart shape. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c5', name: '8 inch, 3 Layer (Round)', price: '€85', img: round_11, images: roundImages, description: 'Serves ~40 - 45. Grand 3-layer masterpiece. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c7', name: '8 inch, 3 Layer (Heart)', price: '€95', img: heart_3, images: heartImages, description: 'Serves ~40 - 45. Tall and impressive heart-shaped cake. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c-3d', name: '3D Custom Cake Designer', isFullWidth: true, description: 'Design your own cake in 3D! Choose layers, shapes, and decorations to see your masterpiece come to life.' },
    ]
  },
  {
    category: "Cupcakes",
    sections: [
      {
        title: "Buttercream",
        items: [
          { id: 'cu1', name: 'Buttercream (Box of 6)', price: '€15', img: cupcake_1, images: cupcakeImages, description: 'A half-dozen of our fluffiest buttercream cupcakes. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
          { id: 'cu2', name: 'Buttercream (Box of 12)', price: '€28.80', img: cupcake_2, images: cupcakeImages, description: 'A full dozen premium buttercream cupcakes. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
          { id: 'cu3', name: 'Buttercream (Additional)', price: '€2.20', img: cupcake_3, images: cupcakeImages, description: 'Add an individual buttercream cupcake to your order. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
        ]
      },
      {
        title: "White Chocolate",
        items: [
          { id: 'cu4', name: 'White Chocolate (Box of 6)', price: '€17', img: cupcake_4, images: cupcakeImages, description: 'A half-dozen decadent white chocolate cupcakes. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
          { id: 'cu5', name: 'White Chocolate (Box of 12)', price: '€32.50', img: cupcake_5, images: cupcakeImages, description: 'A full dozen premium white chocolate cupcakes. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
          { id: 'cu6', name: 'White Chocolate (Additional)', price: '€2.50', img: cupcake_6, images: cupcakeImages, description: 'Add an individual white chocolate cupcake to your order. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
        ]
      }
    ]
  },
  {
    category: "Cake Pops",
    items: [
      { id: 'cp1', name: 'Cake Pops (Each)', price: '€1.70', img: pops_1, description: 'Delicious cake pops (minimum order 15). Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'cp2', name: 'Cake Pops (Pack of 15)', price: '€25.50', img: pops_2, description: 'A standard pack of 15 cake pops. Perfect for small gatherings. Choice of flavors.' },
      { id: 'cp3', name: 'Cake Pops (Pack of 30)', price: '€51.00', img: pops_3, description: 'A large pack of 30 cake pops for parties. Choice of Chocolate, Vanilla, or Red Velvet.' },
    ]
  },
  {
    category: "Brownies",
    items: [
      { 
        id: 'brownies-box', 
        name: 'Signature Brownies Box', 
        price: '€32', 
        img: brownies, 
        description: 'Rich chocolate brownies with your choice of up to 3 signature spreads. Select your preferred piece count below.',
        options: [
          { label: 'Box of 6', value: '6' },
          { label: 'Box of 9', value: '9' },
          { label: 'Box of 12', value: '12' },
          { label: 'Box of 16', value: '16' },
          { label: 'Box of 20', value: '20' }
        ]
      }
    ]
  },
  {
    category: "Breakable Hearts",
    items: [
      { id: 't2', name: 'Breakable Heart Box', price: '€37', img: heart1, description: 'Heart made of White Chocolate filled with marshmallows & chopsticks. Includes 8 cakesicles.' },
    ]
  },
  {
    category: "Mini Cakes",
    items: [
      { id: 'cu5', name: 'Mini Cake (Single)', price: '€5.50', img: mini2, description: 'Bite-sized indulgence (Single portion). Choice of 1 signature spread.' },
      { id: 'cu6', name: 'Mini Cake (Large)', price: '€3.50', img: mini1, description: 'A delightful small treat (Large portion). Choice of 1 signature spread.' },
    ]
  },
  {
    category: "Cakesicles",
    items: [
      { id: 't3', name: 'Cakesicles (Box of 5)', price: '€17', img: sicles1, description: 'Cake truffles on a stick (Minimum order). Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 't4', name: 'Cakesicles (Box of 10)', price: '€29', img: sicles3, description: 'A premium box of 10 cakesicles. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 't5', name: 'Cakesicle (Additional)', price: '€2.60', img: sicles4, description: 'Add an extra cakesicle to your box. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 't6', name: 'Cakesicles (20+ pieces)', price: '€2.40 each', img: sicles2, img2: sicles5, description: 'Bulk order discount for 20 or more cakesicles. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
    ]
  }
];
