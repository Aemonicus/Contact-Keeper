const express = require("express")
const router = express.Router()

// api/contacts
router.get("/", (req, res) => {
  res.send("Get all contacts")
})

// api/contacts
router.post("/", (req, res) => {
  res.send("Add new contact")
})

// api/contacts/:id
router.put("/:id", (req, res) => {
  res.send("Update contact")
})

// api/contacts/:id
router.post("/:id", (req, res) => {
  res.send("Delete contact")
})

module.exports = router