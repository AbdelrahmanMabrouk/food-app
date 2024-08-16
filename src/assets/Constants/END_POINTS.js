
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
  getListUsers:`${BASE_USERS}`

 
};


//CATEGORIES URLS

const BASE_CATEGORIES = `${BASE_URL}/Category`;


export const CATEGORIES_URLS = {

  getList: `${BASE_CATEGORIES}`,
  delete : (id)=> `${BASE_CATEGORIES}/${id}`,
  create:`${BASE_CATEGORIES}`,

};

//RECIPES URLS


const BASE_RECIPES= `${BASE_URL}/Recipe`;

export const RECIPES_URLS = {

  getList: `${BASE_RECIPES}`,
  delete : (id)=> `${BASE_RECIPES}/${id}`

};


//users

// const BASE_USERS_RECIPIES = `${BASE_URL}/userRecipe`


//  export const USERS_RECIPIES ={
//   getListUsersRecipe:`${BASE_USERS_RECIPIES}`,
//   delete : (id)=> `${BASE_USERS_RECIPIES}/${id}`

// }