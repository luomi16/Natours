/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

// VALUES
// Jonas encountered some errors in here, but I do not, he put this in addEventListener later
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const logOutBtn = document.querySelector('.nav__el--logout');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);
