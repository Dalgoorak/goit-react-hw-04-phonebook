import React from 'react';
// import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contacts__item}>
          <p>
            {name}: {number}
          </p>
          <button onClick={() => onDeleteContact(id)} type="button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
