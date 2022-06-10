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
        name: 'Eisenbahn Pilsen Long Neck 355ml',
        price: 4.5,
        image_url: 'http://localhost:3001/images/Cerveja_Eisenbahn_Pilsen_Long_Neck_355ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Heineken Long Neck 330ml',
        price: 5.5,
        image_url: 'http://localhost:3001/images/Cerveja_Heineken_Long_Neck_330ml.jpg',
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
        name: 'Jack Daniels Honey 1l',
        price: 159.9,
        image_url: 'http://localhost:3001/images/Liqueur_Jack_Daniels_Honey_1l.jpg',
      },
      {
        seller_id: 1,
        name: 'Absolut Natural 750ml',
        price: 64.9,
        image_url: 'http://localhost:3001/images/Vodka_Absolut_Natural_750ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Chivas Regal 12 anos 750ml',
        price: 123.9,
        image_url: 'http://localhost:3001/images/Whisky_Chivas_Regal_12_anos_750ml.jpg',
      },
      {
        seller_id: 1,
        name: 'Chivas Regal 18 anos 750ml',
        price: 484.9,
        image_url: 'http://localhost:3001/images/Whisky_Chivas_Regal_18_anos_750ml.jpg',
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
