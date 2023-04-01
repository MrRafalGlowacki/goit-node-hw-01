const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = () => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
};

const getContactById = (contactId) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    console.log(contact);
  });
};

const removeContact = (contactId) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);
    if (contactIndex === -1) {
      console.error("Contact not found");
      return;
    }
    const contactName = contacts[contactIndex].name;
    contacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Contact ${contactName} with id ${contactId} removed`);
    });
  });
};

const addContact = (name, email, phone) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = {
      id: new Date(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("New contact added:", newContact.name);
    });
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
