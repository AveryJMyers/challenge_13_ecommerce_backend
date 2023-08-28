const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    });
    res.status(200).json(tagData)
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error'})
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include:[
        { 
          model: Product 
        }
      ]
    });
    if(!tagData){
      res.status(404).json({ message: 'No tag data found with this ID'})
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error'})
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    if (!tagData){
      res.status(404).json({ message: 'no tag found witht this ID'})
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});
// delete by id route
router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
    })
    if (!tagData){
      res.status(400).json({
        message: 'no tag found with this id!'
      })
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
