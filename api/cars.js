const express = require('express');
const router = express.Router();
const fs = require("fs")

let cars = require("../cars.json")
let { body, validationResult } = require('express-validator')


// GET /api/cars - get all cars
// local middleware
router.get('/cars', (req, res) => 
{
    fs.readFile('./cars.json', (err, data) => {

        cars = JSON.parse(data)

        res.json(cars)
    })
})

// GET /api/cars/1 - get car by id
router.get('/cars/:id', (req, res) => 
{
    const id = req.params.id
    const car = cars.find(car => car.id === +id)

    if (!car)
        return res.status(404).json({ "message": "car was not found" })

    return res.json(car)
})

// POST /api/cars - create new car
router.post('/cars', body('brand').notEmpty(), body('model').notEmpty(),
        body('photo').notEmpty(), body('edition').notEmpty(), 
        body('rent').notEmpty(), (req, res) => 
{
    const result = validationResult(req);

    if (result.isEmpty()) {
        const id = cars.length + 1
        const car = { id, ...req.body }

        console.log(req.body)

        cars.push(car)

        fs.writeFile('./cars.json', JSON.stringify(cars), (err) => 
        {

            if (err)
                return res.status(400).json({ message: "Could not create a car" })

            return res.status(201).json(car)
        })
    }
    else
    {
        console.log(result.array())
        // return res.status(400).json({ "message": "No car added" })
        return res.status(400).json({ "errors": [`The ${result.array()[0].path} field is empty`] })
    }
})

// PUT/PATCH /api/cars/1 - update specific car by id
router.put('/cars/:id', (req, res) => 
{
    const carId = req.params.id
    const newDataForCar = { ...req.body }
    console.log(cars)

    let car = cars.find(car => car.id === +carId)

    const { id, ...other } = car

    console.log(other)

    if (req.body.brand !== "" && req.body.brand !== undefined && typeof req.body.brand === "String") {
        // update the json
        console.log("update = put")
    }

    console.log({ id, newDataForCar })

    res.json({ message: "Sababa" })

})

// DELETE /api/cars/1 - delete specific car by id
router.delete('/cars/:id', (req, res) => 
{
    const carId = req.params.id
    console.log(carId)

    let theCar = cars.find(car => car.id === +carId)

    let ndx = cars.indexOf(theCar)
    if (ndx > -1) 
    { 
        cars.splice(ndx, 1);
    
        fs.writeFile('./cars.json', JSON.stringify(cars), (err) =>
        {
            if (err)
                return res.status(400).json({ message: "Could not remove a car" })

            return res.status(201).json(theCar)
        })
    }
    else
    {
        return res.status(400).json({ message: "Wrong car ID" })
    }
})

module.exports = router;




    // const result = validationResult(req);
    // if (result.isEmpty()) {
    //     const data = matchedData(req);
    //     return res.send(`Hello, ${data.person}!`);
    // }

    // if(!car)
    //   return res.status(400).json({"message":"No car added"})

    // cars.push(car)

    // fs.writeFile('./cars.json', JSON.stringify(cars) ,(err) => {

    //   if(err)
    //     return res.status(400).json({message: "Could not create a car"})

    //   res.status(201).json(car)
    // })
    // fs.appendFile()

    // res.json({message: "car successfully added"})