const { Customer, OrderItem, Product } = require('../database/models');
const {to}				= require('await-to-js');

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Data can not be empty!"
    });
    return;
  }
  
  // Create a Customer
  const customer = {
		id: req.body.data.attributes.id,
    full_name: req.body.data.attributes.full_name,
    username: req.body.data.attributes.username,
		address: req.body.data.attributes.address,
    phone_number: req.body.data.attributes.phone_number
  };

  // Save Customer in the database
  Customer.create(customer)
    .then(data => {
      res.send({
        message: "success retrieve data",
				status: true,
				data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Retrieve all Customer from the database.
exports.findAll = (req, res) => {
  Customer.findAll({
		attributes: {
			exclude: ['createdAt', 'updatedAt']
		}
	})
    .then(data => {
      res.send({
        message: "success retrieve data",
				status: true,
				data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then(data => {
      res.send({
        message: "success retrieve data",
				status: true,
				data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id
      });
    });
};

// Retrieve all Orders
exports.findOrders = async (req, res) => {
	const id = req.params.id;
	let err, cst;
	[err, cst] = await to(Customer.findByPk(id));
	if (err) {
		return res.status(500).send({ message: err.message });
	}
	
	let orders;
	[err, orders] = await to(cst.getOrders({
		where: {status: 'accepted'},
		attributes:
			['id', ['createdAt', 'date'], 'status'],
		order: [['createdAt', 'ASC']],
		include: [{
			model: OrderItem,
			as: 'order_detail',
			attributes: ['id', 'quantity'],
			include: {
				model: Product,
				attributes: ['id', 'name', 'price']
			}
		}]
	}));
	if (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
	let data = JSON.stringify(orders, null, 2)
	console.log('data = ', data);
	res.send({
		message: "success retrieve data",
		status: true,
		data: orders
	});
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Customer.update(req.body.data.attributes, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id
      });
    });
};
