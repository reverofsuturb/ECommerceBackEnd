const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find/display all tags with associated product data

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_products' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find/display tag by id with associated product data

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_products' }],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new tag

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update tag by id

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(({ message: "Tag has been updated" }));
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete tag by id

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found, cannot delete" });
      return;
    }
    res.status(200).json( ({ message: "Tag has been deleted"}));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
