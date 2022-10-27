import { useState, useEffect, useCallback, useMemo } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

import { nanoid } from 'nanoid';

const CONTACTS_LIST_LOCAL_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(CONTACTS_LIST_LOCAL_KEY)) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_LIST_LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const visibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  }, [contacts, filter]);

  const addContatcts = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts([contact, ...contacts]);
    }
  };

  const deleteContacts = useCallback(
    contactId => {
      setContacts(contacts.filter(contact => contact.id !== contactId));
    },
    [contacts]
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContatcts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContacts}
      />
    </div>
  );
};
