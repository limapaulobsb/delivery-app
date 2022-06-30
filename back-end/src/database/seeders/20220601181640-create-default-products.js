'use strict';
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Products', [
      {
        seller_id: 1,
        name: 'Água Tônica Antarctica 350ml',
        price: 4,
        image_url: 'http://localhost:3001/images/Agua_Tonica_Antarctica_Lata_350ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Beefeater London Dry 750ml',
        price: 89.9,
        image_url: 'http://localhost:3001/images/Gin_Beefeater_London_Dry_750ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Tanqueray Dry 750ml',
        price: 119.9,
        image_url: 'http://localhost:3001/images/Gin_Tanqueray_Dry_750ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Absolut Natural 750ml',
        price: 64.9,
        image_url: 'http://localhost:3001/images/Vodka_Absolut_Natural_750ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Chivas Regal 18 anos 750ml',
        price: 484.9,
        image_url: 'http://localhost:3001/images/Whisky_Chivas_Regal_18_anos_750ml.jpg',
      },
      {
        seller_id: 2,
        name: 'X-Duplo Gourmet',
        price: 32,
        image_url: 'http://localhost:3001/images/X-Duplo_Gourmet.jpg',
      },
      {
        seller_id: 2,
        name: 'X-Pimenta Gourmet',
        price: 29,
        image_url: 'http://localhost:3001/images/X-Pimenta_Gourmet.jpg',
      },
      {
        seller_id: 2,
        name: 'X-Salada Gourmet',
        price: 25,
        image_url: 'http://localhost:3001/images/X-Salada_Gourmet.jpg',
      },
      {
        seller_id: 2,
        name: 'Hot Dog Clássico',
        price: 18,
        image_url: 'http://localhost:3001/images/Hot_Dog_Classico.jpg',
      },
      {
        seller_id: 2,
        name: 'Batata Frita 150g',
        price: 18,
        image_url: 'http://localhost:3001/images/Batata_Frita_150g.jpg',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
