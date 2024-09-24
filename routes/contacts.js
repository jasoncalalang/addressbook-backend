// routes/contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Create a new contact
router.post('/', async (req, res) => {
  const newContact = new Contact(req.body);
  try {
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a contact by ID
router.get('/:id', getContact, (req, res) => {
  res.json(res.contact);
});

// Update a contact
router.put('/:id', getContact, async (req, res) => {
  Object.assign(res.contact, req.body);
  try {
    const updatedContact = await res.contact.save();
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a contact
router.delete('/:id', getContact, async (req, res) => {
  try {
    await res.contact.remove();
    res.json({ message: 'Deleted Contact' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get contact by ID
async function getContact(req, res, next) {
  let contact;
  try {
    contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.contact = contact;
  next();
}

module.exports = router;

