'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Customers', 
			[
				{
					id: 1,
					full_name: 'Mia Huljanah',
					username: 'miahun',
					address: 'miahun@fakemail.com',
					phone_number: '08155559890',
					createdAt: new Date(),
          updatedAt: new Date()
				},
				{
					id: 2,
					full_name: 'Rashif Ilmi Nurzaman',
					username: 'rashzam',
					address: 'rashzam@fakemail.com',
					phone_number: '0812598837',
					createdAt: new Date(),
          updatedAt: new Date()
				}
			], {});
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Customers', null, {});
  }
};
