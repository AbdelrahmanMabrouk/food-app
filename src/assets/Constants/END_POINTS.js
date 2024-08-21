
const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1';

export const BASE_IMG_URL = 'https://upskilling-egypt.com:3006';


//USERS URLS

const BASE_USERS = `${BASE_URL}/Users`;


export const USERS_URLS = {

  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  delete: (id) => `${BASE_USERS}/${id}`,
  resetRequest: `${BASE_USERS}/Reset/Request`,
  reset: `${BASE_USERS}/Reset`,
  getListUsers: `${BASE_USERS}`,
  verify: `${BASE_USERS}/verify`


};


//CATEGORIES URLS

const BASE_CATEGORIES = `${BASE_URL}/Category`;


export const CATEGORIES_URLS = {

  getList: `${BASE_CATEGORIES}`,
  delete: (id) => `${BASE_CATEGORIES}/${id}`,
  create: `${BASE_CATEGORIES}`,
  update: (id) => `${BASE_CATEGORIES}/${id}`,

};

//USERS URLS


const BASE_RECIPES = `${BASE_URL}/Recipe`;

export const RECIPES_URLS = {
  getList: `${BASE_RECIPES}`,
  delete: (id) => `${BASE_RECIPES}/${id}`,
  create: `${BASE_RECIPES}`,

};


//tags  

export const GETALLTAGS = `${BASE_URL}/tag`


//userRecipe

const BASE_USER_RECIPES = `${BASE_URL}/userRecipe`;

export const USER_RECIPES = {
  getList: `${BASE_USER_RECIPES}`,
  addToFav: `${BASE_USER_RECIPES}`,
  removeFromFav: (id) => `${BASE_USER_RECIPES}/${id}`,
};
