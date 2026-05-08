import cake2layer6 from '../assets/2layer6inch.png';
import cake2layer8 from '../assets/2layer8inch.png';
import cake3layer from '../assets/3layer.png';
import loveCake from '../assets/lovecake1.png';
import bentoCake from '../assets/bento_cake_aesthetic_1775218142199.png';
import customCake from '../assets/custom_theme_cake_pastel_1775218188608.png';

import cupcake1 from '../assets/cupcake1.png';
import cupcake2 from '../assets/cupcake2.png';
import cupcake3 from '../assets/cupcake3.png';
import cupcake6 from '../assets/cupcake6.png';

import brownies from '../assets/brownies_box.png';
import cakepops from '../assets/cakepops.png';
import cakesicles5 from '../assets/cakesicles5.png';
import breakableHeart from '../assets/breakable_heart.png';

export const menuData = [
  {
    category: "Cakes",
    items: [
      { id: 'c1', name: '6 inch, 2 Layer (Round)', price: '€45', img: cake2layer6, description: 'Serves ~10. Classic round cake. The perfect size for intimate gatherings.' },
      { id: 'c2', name: '6 inch, 2 Layer (Heart)', price: '€50', img: bentoCake, description: 'Serves ~10. A beautiful aesthetic heart-shaped design. +€5 from round.' },
      { id: 'c3', name: '8 inch, 2 Layer (Round)', price: '€65', img: cake2layer8, description: 'Serves ~20 - 25. Perfect for medium parties and celebrations.' },
      { id: 'c4', name: '8 inch, 2 Layer (Heart)', price: '€72', img: loveCake, description: 'Serves ~20 - 25. Show extra love with this large heart-shaped masterpiece. +€7 from round.' },
      { id: 'c5', name: '8 inch, 3 Layer (Round)', price: '€85', img: cake3layer, description: 'Serves ~40 - 45. A tall, impressive 3-layer cake for grand celebrations.' },
      { id: 'c7', name: '8 inch, 3 Layer (Heart)', price: '€95', img: loveCake, description: 'Serves ~40 - 45. Our grandest 3-layer cake, shaped as a beautiful heart. +€10 from round.' },
      { id: 'c6', name: 'Bespoke Custom Cake', price: 'Varies', img: customCake, description: 'Fully custom design service to bring your ultimate cake vision to life.', isFullWidth: true },
    ]
  },
  {
    category: "Cupcakes & Mini Treats",
    items: [
      { id: 'cu1', name: 'Box of 6 Cupcakes', price: '€18.00', img: cupcake1, description: 'A half-dozen of our fluffiest cupcakes in your choice of flavors.' },
      { id: 'cu2', name: 'Box of 12 Cupcakes', price: '€31.20', img: cupcake2, description: 'A full dozen cupcakes. Perfect for sharing at any celebration.' },
      { id: 'cu3', name: 'Single Cupcake', price: '€2.40', img: cupcake3, description: 'One perfectly baked cupcake. Choice of Chocolate, Vanilla, or Red Velvet.' },
      { id: 'cu4', name: 'Custom Cake Pops', price: '€1.70 each', img: cakepops, description: 'Delicious cake pops (minimum order 15). Choice of Chocolate, Vanilla, or Red Velvet.' },
      { id: 'cu5', name: 'Mini Cake (Single)', price: '€5.50', img: bentoCake, description: 'Bite-sized indulgence. Choice of 1 signature spread.' },
      { id: 'cu6', name: 'Mini Cake (Large)', price: '€3.50', img: cupcake6, description: 'The perfect mini treat. Large individual portion.' },
    ]
  },
  {
    category: "Signature Boxes",
    items: [
      { id: 't1', name: 'Loaded Brownies Box', price: '€32.00', img: brownies, description: 'Rich chocolate brownies with optional spreads (Pistachio, Nutella, Lotus, etc.).' },
      { id: 't2', name: 'Breakable Heart Box', price: '€37.00', img: breakableHeart, description: 'White chocolate heart filled with marshmallows & 8 cakesicles.' },
      { id: 't3', name: 'Cakesicles (Box of 5)', price: '€17.00', img: cakesicles5, description: 'Cake truffles shaped like popsicles. (Minimum order).' },
      { id: 't4', name: 'Cakesicles (Box of 10)', price: '€29.00', img: cakesicles5, description: 'A larger box of 10 delicious cakesicles in assorted flavors.' },
    ]
  }
];
