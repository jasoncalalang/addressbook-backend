const express = require('express');
const router = express.Router();

// Middleware to check Bearer token (implement your own logic here)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // Verify the token here (e.g., using JWT)
  // If valid, call next(); if invalid, return 403 (Forbidden)
  next();
};

// Sample data structure for Swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the contact
 *         name:
 *           type: string
 *           description: The name of the contact
 *         email:
 *           type: string
 *           description: The email of the contact
 *         phone:
 *           type: string
 *           description: The phone number of the contact
 *         address:
 *           type: string
 *           description: The address of the contact
 *       example:
 *         id: "60d0fe4f5311236168a109ca"
 *         name: "John Doe"
 *         email: "johndoe@example.com"
 *         phone: "+1-202-555-0171"
 *         address: "1234 Elm Street, Springfield"
 */

// GET /contacts - Retrieve all contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     description: Retrieve all contacts stored in the address book.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 */
router.get('/contacts', verifyToken, (req, res) => {
  // Code to retrieve contacts
});

// GET /contacts/{id} - Retrieve a contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a single contact by its ID.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The contact details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Contact not found
 */
router.get('/contacts/:id', verifyToken, (req, res) => {
  // Code to retrieve a contact by ID
});

// POST /contacts - Create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Add a new contact to the address book.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       400:
 *         description: Bad request (validation errors)
 */
router.post('/contacts', verifyToken, (req, res) => {
  // Code to create a new contact
});

// PUT /contacts/{id} - Update a contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update an existing contact's details by ID.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Contact not found
 */
router.put('/contacts/:id', verifyToken, (req, res) => {
  // Code to update a contact by ID
});

// DELETE /contacts/{id} - Delete a contact by ID
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete an existing contact from the address book by ID.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Contact not found
 */
router.delete('/contacts/:id', verifyToken, (req, res) => {
  // Code to delete a contact by ID
});

module.exports = router;