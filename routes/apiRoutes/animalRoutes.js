const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// Get all animals route
router.get('/animals', (req, res) => {
    let results = animals;

    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    
    res.json(results);
});

// Get animals by id
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Post new animals
router.post('/animals', (req, res) => {
    //console.log(req.body);
    req.body.id = animals.length.toString();

    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;