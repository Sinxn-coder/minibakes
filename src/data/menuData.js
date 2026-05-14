import cake2layer6 from '../assets/2layer6inch.png';
import cake2layer8 from '../assets/2layer8inch.png';
import cake3layer from '../assets/3layer.png';
import loveCake from '../assets/lovecake1.png';
import bentoCake from '../assets/bento_cake_aesthetic_1775218142199.png';

import cupcake1 from '../assets/cupcake1.png';
import cupcake2 from '../assets/cupcake2.png';
import cupcake3 from '../assets/cupcake3.png';
import cupcake6 from '../assets/cupcake6.png';

import brownies from '../assets/brownies_box.png';
import cakepops from '../assets/cakepops.png';
import pops1 from '../assets/cake pops/pops1.png';
import pops2 from '../assets/cake pops/pops2.png';
import pops3 from '../assets/cake pops/pops3.png';
import pops4 from '../assets/cake pops/pops4.png';
import pops5 from '../assets/cake pops/pops5.png';
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
import round_13 from '../assets/cakes/round/round (13).png';
import round_14 from '../assets/cakes/round/round (14).png';
import round_15 from '../assets/cakes/round/round (15).png';
import round_16 from '../assets/cakes/round/round (16).png';
import round_17 from '../assets/cakes/round/round (17).png';
import round_18 from '../assets/cakes/round/round (18).png';

const roundImages = [
  round_1, round_2, round_3, round_4, round_5, round_6, 
  round_7, round_8, round_9, round_10, round_11, round_12, 
  round_13, round_14, round_15, round_16, round_17, round_18
];

export const menuData = [
  {
    category: "Cakes",
    items: [
      { id: 'c1', name: '6 inch, 2 Layer (Round)', price: '€45', img: round_1, images: roundImages, description: 'Serves ~10. Classic round cake. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c2', name: '6 inch, 2 Layer (Heart)', price: '€50', img: heart_1, images: heartImages, description: 'Serves ~10. Elegant heart-shaped design. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c3', name: '8 inch, 2 Layer (Round)', price: '€65', img: round_2, images: roundImages, description: 'Serves ~20 - 25. Perfect for celebrations. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c4', name: '8 inch, 2 Layer (Heart)', price: '€72', img: heart_2, images: heartImages, description: 'Serves ~20 - 25. Show extra love with a large heart shape. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c5', name: '8 inch, 3 Layer (Round)', price: '€85', img: round_3, images: roundImages, description: 'Serves ~40 - 45. Grand 3-layer masterpiece. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c7', name: '8 inch, 3 Layer (Heart)', price: '€95', img: heart_3, images: heartImages, description: 'Serves ~40 - 45. Tall and impressive heart-shaped cake. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c-3d', name: '3D Custom Cake Designer', isFullWidth: true, description: 'Design your own cake in 3D! Choose layers, shapes, and decorations to see your masterpiece come to life.' },
    ]
  },
  {
    category: "Cupcakes",
    items: [
      { id: 'cu1', name: 'Cupcakes (Box of 6)', price: '€15', img: cupcake1, description: 'A half-dozen of our fluffiest cupcakes. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
      { id: 'cu2', name: 'Cupcakes (Box of 12)', price: '€28.80', img: cupcake2, description: 'A full dozen premium cupcakes. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
      { id: 'cu3', name: 'Cupcake (Additional)', price: '€2.20', img: cupcake3, description: 'Add an individual cupcake to your order. Choice of flavors. Individual packaging available for +€0.15 per cupcake.' },
    ]
  },
  {
    category: "Cake Pops",
    items: [
      { id: 'cp1', name: 'Cake Pops (Each)', price: '€1.70', img: pops1, img2: pops5, description: 'Delicious cake pops (minimum order 15). Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'cp2', name: 'Cake Pops (Pack of 15)', price: '€25.50', img: pops2, description: 'A standard pack of 15 cake pops. Perfect for small gatherings. Choice of flavors.' },
      { id: 'cp3', name: 'Cake Pops (Pack of 30)', price: '€51.00', img: pops3, img2: pops4, description: 'A large pack of 30 cake pops for parties. Choice of Chocolate, Vanilla, or Red Velvet.' },
    ]
  },
  {
    category: "Brownies",
    items: [
      { id: 't1-6', name: 'Brownies (Box of 6)', price: '€32', img: brownies, description: 'Rich chocolate brownies cut into 6 large pieces. Choice of up to 3 spreads.' },
      { id: 't1-9', name: 'Brownies (Box of 9)', price: '€32', img: brownies, description: 'Rich chocolate brownies cut into 9 pieces. Choice of up to 3 spreads.' },
      { id: 't1-12', name: 'Brownies (Box of 12)', price: '€32', img: brownies, description: 'Rich chocolate brownies cut into 12 pieces. Choice of up to 3 spreads.' },
      { id: 't1-16', name: 'Brownies (Box of 16)', price: '€32', img: brownies, description: 'Rich chocolate brownies cut into 16 snack-sized pieces. Choice of up to 3 spreads.' },
      { id: 't1-20', name: 'Brownies (Box of 20)', price: '€32', img: brownies, description: 'Rich chocolate brownies cut into 20 bite-sized pieces. Choice of up to 3 spreads.' },
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
      { id: 'cu5', name: 'Mini Cake (Single)', price: '€5.50', img: mini1, description: 'Bite-sized indulgence (Single portion). Choice of 1 signature spread.' },
      { id: 'cu6', name: 'Mini Cake (Large)', price: '€3.50', img: mini2, description: 'A delightful small treat (Large portion). Choice of 1 signature spread.' },
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
