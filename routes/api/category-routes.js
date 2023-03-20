const router = require("express").Router();
const { Category, Product } = require("../../models");

// display/find all categories w/ associated products

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// display/find category by id w/ associated products

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create category

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update category by id

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(({ message: "Category has been updated" }));
  } catch (err) {
    res.status(400).json(err);
  }
}); 

// delete category by id

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found, cannot delete" });
      return;
    }
    res.status(200).json( ({ message: "Category has been deleted"}));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
