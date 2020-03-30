const router = require("express").Router();
let Attendances = require("../models/attendances");

router.route("/").get((req, res) => {
  Attendances.find()
    .then(ls => res.json(ls))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Attendances.findById(req.params.id)
    .then(ls => res.json(ls))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const staffID = req.body.staffID;
  const isOnline = req.body.isOnline;

  const Attendances = new Attendances({ staffID, isOnline });

  Attendances.save()
    .then(() => res.json("Login Status Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Attendances.findById(req.params.id)
    .then(ls => {
      ls.staffID = req.body.staffID;
      ls.isOnline = req.body.isOnline;

      ls.save()
        .then(() => res.json("Login Status Updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/delete_all").delete((req, res) => {
  Attendances.remove()
    .then(() => res.json("Collection Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Attendances.findByIdAndDelete(req.params.id)
    .then(() => res.json("Login Status Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
