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
import cakesicles5 from '../assets/cakesicles5.png';
import breakableHeart from '../assets/breakable_heart.png';

export const menuData = [
  {
    category: "Cakes",
    items: [
      { id: 'c1', name: '6 inch, 2 Layer (Round)', price: '€45', img: cake2layer6, description: 'Serves ~10. Classic round cake. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c2', name: '6 inch, 2 Layer (Heart)', price: '€50', img: bentoCake, description: 'Serves ~10. Elegant heart-shaped design. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c3', name: '8 inch, 2 Layer (Round)', price: '€65', img: cake2layer8, description: 'Serves ~20 - 25. Perfect for celebrations. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c4', name: '8 inch, 2 Layer (Heart)', price: '€72', img: loveCake, description: 'Serves ~20 - 25. Show extra love with a large heart shape. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c5', name: '8 inch, 3 Layer (Round)', price: '€85', img: cake3layer, description: 'Serves ~40 - 45. Grand 3-layer masterpiece. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'c7', name: '8 inch, 3 Layer (Heart)', price: '€95', img: loveCake, description: 'Serves ~40 - 45. Tall and impressive heart-shaped cake. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
    ]
  },
  {
    category: "Cupcakes",
    items: [
      { id: 'cu1', name: 'Cupcakes (Box of 6)', price: '€18', img: cupcake1, description: 'A half-dozen of our fluffiest cupcakes. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'cu2', name: 'Cupcakes (Box of 12)', price: '€31.20', img: cupcake2, description: 'A full dozen premium cupcakes. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 'cu3', name: 'Cupcake (Additional)', price: '€2.40', img: cupcake3, description: 'Add an individual cupcake to your order. Choice of Chocolate, Vanilla, or Red Velvet.' },
    ]
  },
  {
    category: "Cake Pops",
    items: [
      { id: 'cp1', name: 'Cake Pops (Each)', price: '€1.70', img: cakepops, description: 'Delicious cake pops (minimum order 15). Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
    ]
  },
  {
    category: "Brownies",
    items: [
      { id: 't1', name: 'Brownies (Box)', price: '€32', img: brownies, description: 'Classic chocolate brownies. Custom cuts: 6, 9, 12, 16 or 20 pieces. Choice of up to 3 spreads.' },
    ]
  },
  {
    category: "Breakable Hearts",
    items: [
      { id: 't2', name: 'Breakable Heart Box', price: '€37', img: breakableHeart, description: 'Heart made of White Chocolate filled with marshmallows & chopsticks. Includes 8 cakesicles.' },
    ]
  },
  {
    category: "Mini Cakes",
    items: [
      { id: 'cu5', name: 'Mini Cake (Single)', price: '€5.50', img: bentoCake, description: 'Bite-sized indulgence (Single portion). Choice of 1 signature spread.' },
      { id: 'cu6', name: 'Mini Cake (Large)', price: '€3.50', img: cupcake6, description: 'A delightful small treat (Large portion). Choice of 1 signature spread.' },
    ]
  },
  {
    category: "Cakesicles",
    items: [
      { id: 't3', name: 'Cakesicles (Box of 5)', price: '€17', img: cakesicles5, description: 'Cake truffles on a stick (Minimum order). Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 't4', name: 'Cakesicles (Box of 10)', price: '€29', img: cakesicles5, description: 'A premium box of 10 cakesicles. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 't5', name: 'Cakesicle (Additional)', price: '€2.60', img: cakesicles5, description: 'Add an extra cakesicle to your box. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
      { id: 't6', name: 'Cakesicles (20+ pieces)', price: '€2.40 each', img: cakesicles5, description: 'Bulk order discount for 20 or more cakesicles. Choice of Chocolate, Vanilla, or Red Velvet flavors.' },
    ]
  }
];
