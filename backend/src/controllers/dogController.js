const { body, validationResult } = require('express-validator');
const dogsDetails = require("../models/Dogs");

//add new dog for system
exports.addNewDog = [
  // Input validation
  body('dogID').isAlphanumeric().trim().escape(),
  body('dogName').isString().trim().escape(),
  body('ownerName').isString().trim().escape(),
  body('address').isString().trim().escape(),
  body('dob').isDate(),
  body('breed').isString().trim().escape(),
  body('sex').isIn(['male', 'female', 'other']),
  body('weight').isFloat({ min: 0 }),
  body('bloodGroup').isString().trim().escape(),
  body('disease').optional().isString().trim().escape(),
  body('lastDate').optional().isDate(),
  body('nextDate').optional().isDate(),
  body('medicine').optional().isString().trim().escape(),
  body('labTests').optional().isString().trim().escape(),
  body('doctor').optional().isString().trim().escape(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure validated inputs
    const {
      dogID, dogName, ownerName, address, dob, breed, sex,
      weight, bloodGroup, disease, lastDate, nextDate,
      medicine, labTests, doctor
    } = req.body;

    try {
      // Check if dog already exists
      const savedDog = await dogsDetails.findOne({ dogID: dogID });
      if (savedDog) {
        return res.status(422).json({ error: "Dog already exists with that ID" });
      }

      // Create new dog instance
      const newDog = new dogsDetails({
        dogID, dogName, ownerName, address, dob, breed, sex,
        weight, bloodGroup, disease, lastDate, nextDate,
        medicine, labTests, doctor
      });

      // Save the new dog
      await newDog.save();
      res.status(201).json({ message: "Dog Added Successfully", dog: newDog });

    } catch (err) {
      console.error('Error in addNewDog:', err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  }
];

//delete existing one
exports.deleteDog = async (req, res) => {
    let dogid = req.params.id;
   
    await dogsDetails.findByIdAndDelete(dogid).then(() => {
      res.status(200).json({ status: "Deleted Successfully" });
    }).catch((error) => {
      res.status(500).json({ status: "Error with Deleting", error: error.message });
    })
  }
   
 //update 
 exports.updateDog= async (req, res) => { 
    //fetch id from url
    let id = req.params.id;
    const {dogID,dogName, ownerName,address,dob,breed,sex,weight,bloodGroup,disease,lastDate,nextDate,medicine,labTests,doctor} = req.body;
  
    const updateDog = {
        dogID,dogName,ownerName,address,dob,breed,sex,weight,bloodGroup,disease,lastDate,nextDate,medicine,labTests,doctor
    }
  
  
    const update = await dogsDetails.findByIdAndUpdate(id, updateDog).then(() => {
      res.status(200).send({status: "Result updated"})
    }).catch((err) => {
       
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
  }

//view 
exports.viewDogs= async (req, res) => { 
 
    //calling  model
    dogsDetails.find().then((dogs) => {
      res.json(dogs)
  
  }).catch((err) => {
     
  })
  
  }
  //view one
  exports.viewOneDog = async (req, res) => {
    
    let did = req.params.id;
    const dog = await dogsDetails.findById(did).then((dog) => {
        res.status(200).send({status: "  fetched", did})
    }).catch(() => {
        
         res.status(500).send({status:"Error with get " , error: err.message})
    })
  }