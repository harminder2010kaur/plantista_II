const { Router } = require('express');
const utId = require('uuid/v1');
const router = Router();
const nursery = require('../data/nursery.json');
const plant = require('../data/plant.json');
const type = require('../data/type.json');
const plant_nursery = require('../data/plant_nursery.json');
const userInfo = require('../data/userInfo.json');
const port = process.env.PORT || '8080';
const url = `http://localhost:${port}`;
const img_url = process.env.PUBLIC_URL + "/images";

const getAllTypes = (req, res) => {
    res.json(type.map(type => ({...type,
        image: `${type.image}`,
        link: `${url}/type/${type.type}`
    })));    
}

const getAllPlants = (req, res) => {
    res.json(plant);
}


const getAllNursery = (req, res) => {
    res.json(nursery);
}

const getNurseryPlant = (req, res) => {
    res.json(plant_nursery);    
}

const getById = (req,res) => {
    const foundPlant = plant.find(plant => plant.id === req.params.id);
    if (!foundPlant) {
        res.status(404).json({ error: 'No plant with that Id was found' });
    }
    
    res.json(foundPlant);
}

const getPlantNurseryId = (req,res) => {
    const foundPlant = plant_nursery.map(item => Object.assign(item, plant.find(y => y.id === item.pid)))
                                    .filter(plant_nursery => plant_nursery.nid === req.params.id);

    const newList = foundPlant.map(list => Object.assign(list, nursery.filter(item => item.id === list.nid ).map(item => item.nursery_name)));                                                                            
    // res.json(foundPlant.filter(plant_nursery => plant_nursery.nid === req.params.id));
    res.json(newList);
}

const getNurseryPlantId = (req,res) => {
    const foundPlant = plant_nursery.map(item => Object.assign(item, nursery.find(nur => nur.id === item.nid)))
                                    .filter(plant_nursery => plant_nursery.pid === req.params.id);

    const newList = foundPlant.map(list => Object.assign(list, plant.filter(item => item.id === list.pid ).map(item => item.name)));                                        
    res.json(newList);
}

const getNurIdPlantId = (req,res) => {
    const foundPlant = plant_nursery.map(item => Object.assign(item, nursery.find(nur => nur.id === item.nid)));
    foundPlant.map(item => Object.assign(item, plant.find(plant => plant.id === item.pid)));
    res.json(foundPlant.filter(item => item.nid === req.params.nid && item.pid === req.params.pid));    
}

const getByType = (req,res) => {
    const foundPlant = plant.filter(plant => plant.type === req.params.type);
    if (!foundPlant) {
        res.status(404).json({ error: 'No plant with that Type was found' });
    }
    
    res.json(foundPlant);
}

const getByName = (req,res) => {
    const foundPlant = plant.find(plant => plant.name === req.params.name);
    if (!foundPlant) {
        res.status(404).json({ error: 'No plant with that Name was found' });
    }
    
    res.json(foundPlant);
}

const getOnlyName = (req,res) => {    
    res.json(plant.map(({id,type,category,image,description,light_requirements,planting_Space,soil_requirements,water_requirements,common_issues,harvesting,storage_wrap,others, ...plant}) => ({...plant})));
}

const createUserList = (req, res) => {
    const {user_name, user_phone, user_email, user_address, user_postal, nid, pid, price, order_created, order_received, order_completed} = req.body;
    const newUserList = {
        id: utId(),
        user_name,
        user_phone,
        user_email,
        user_address,
        user_postal,
        nid,
        pid,
        price,
        order_created,
        order_received,
        order_completed
    };

    userInfo.push(newUserList);
    res.json(newUserList);
    
    if (!newUserList)
    {
        res.status(400).json({error: 'The information provided is invalid or some information is missing.'});
    }
};

const getAllUserInfo = (req, res) => {
    const foundUser = userInfo.map(item => Object.assign(item, nursery.find(nur => nur.id === item.nid)));
    foundUser.map(item => Object.assign(item, plant.find(plant => plant.id === item.pid)));
    res.json(foundUser);

    // res.json(userInfo);
}

router.get('/', getAllPlants);
router.get('/get/:id', getById);
router.get('/type', getAllTypes);                       // Get type of plants
router.get('/nursery', getAllNursery);                  // Get list of Nurseries
router.get('/price', getNurseryPlant);                  // Get price list 
router.get('/byNursery/:id', getPlantNurseryId);        // Get List of Plants by Nursery id
router.get('/byPlant/:id', getNurseryPlantId);          // Get List of Nursery by Plant id
router.get('/name/:name', getByName);                   // Get plant by plant name
router.get('/name', getOnlyName);                       // Get only name of plants in our list for Search option list 
router.get('/types/:type', getByType);                  // Get by plant type e.g Medicinal
router.get('/buy/:nid/plant/:pid', getNurIdPlantId);    // Get by Nursery id and by Plant id
router.get('/user/list', getAllUserInfo);
router.post('/user/buy', createUserList);               // Create User Id

module.exports = router;