const expressAsyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc get individual contact
//@route GET /api/contacts/:id
//@access public

const getContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc create contacts
//@route POST /api/contacts
//@access public

const createContact = expressAsyncHandler(async (req, res) => {
  console.log("Requested Body", req.body);
  const { name, email, phone } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  if (!name || !phone) {
    res.status(400);
    throw new Error("Please add both name and phone number");
  }
  res.status(201).json(contact);
});

//@desc update contacts
//@route PUT /api/contacts/:id
//@access public

const updateContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  updateContact,
  deleteContact,
  createContact,
};
