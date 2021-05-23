const { Router } = require("express");
const {
    getAllUsers,
    createUser,
    updateUser,
    updatePartialUser,
    deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/",getAllUsers);
router.post("/",createUser);
router.put("/:id",updateUser);
router.patch("/:id",updatePartialUser);
router.delete("/:id",deleteUser);


module.exports = router;