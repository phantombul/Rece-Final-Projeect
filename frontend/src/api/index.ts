import axios from 'axios';
import {
  AuthCredentials,
  FindByIngredientsResponse,
  Ingredient,
  Recipe,
  RecipeInstruction,
  RecipesRequest,
  RecipesResponse,
} from '../types';

const recipesAPI = axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '827b779ff5mshdf38741819745e7p18b4cfjsncb70f1da2a1b',
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
  },
});

const userAPI = axios.create({
  baseURL: 'http://localhost:6000',
});

export const register = (body: AuthCredentials) =>
  userAPI.post('/auth/register', body).then((res) => res.data.data);

export const login = (body: AuthCredentials) =>
  userAPI.post('/auth/login', body).then((res) => res.data.data);

//add and remove elements from fav list
export const updateFavourites = ({
  email,
  favourites,
}: {
  email: string;
  favourites: string[];
}) =>
  userAPI
    .patch(`/update/favourite/${email}`, { favourites })
    .then((res) => res.data);

export const updateUserAllergies = ({
  email,
  allergies,
}: {
  email: string;
  allergies: string[];
}) =>
  userAPI
    .patch(`/update/allergy/${email}`, { allergies })
    .then((res) => res.data);

//autocomplete for the search (this is spoonacular)
export const getIngredients = (query: string) =>
  recipesAPI
    .get<Ingredient[]>('/food/ingredients/autocomplete', {
      params: { number: 10, query },
    })
    .then((res) => res.data);

//instructions for how to cook the recipe
export const getRecipeInstructions = (id: number) =>
  recipesAPI
    .get<RecipeInstruction[]>(`/recipes/${id}/analyzedInstructions`)
    .then((res) => res.data);

//used to get all the information about the meal and than saved into lists created by the user
export const getRecipesByIds = (ids: string[]) =>
  recipesAPI
    .get<Recipe[]>(`/recipes/informationBulk`, {
      params: { ids: ids.join(',') },
    })
    .then((res) => res.data);

const fridgeResultsCount = 50;


export const getRecipes = ({
  ingredients,
  dislikes,
  allergies,
  searchMode,
  offset,
  sortOption,
  sortDirection,
  fridgeModeRanking,
}: RecipesRequest) =>
  searchMode === 'fridge'
    ? recipesAPI //fridge mode
        .get<FindByIngredientsResponse>('/recipes/findByIngredients', {
          params: {
            ingredients: ingredients.join(','),
            number: fridgeResultsCount,
            ranking: fridgeModeRanking,
          },
        })
        .then((res) =>
          getRecipesByIds(res.data.map(({ id }) => id as unknown as string)),
        )
        .then((results) => ({
          results,
          totalResults: fridgeResultsCount,
        }))
    : recipesAPI //same endpoint that is used for some of them and all of them, if we say "some", we use query, is "all", includeIngredients
        .get<RecipesResponse>('/recipes/complexSearch', {
          params: {
            includeIngredients:
              searchMode === 'all' ? ingredients.join(',') : undefined, // all these ingredients must be present in the recipes returned

            // if some is selected, not all ingredients will be included.
            // also, in any request, either includeIngredients is used, or query. cannot have both as they are mutually exclusive because of the radio button

            query: searchMode === 'some' ? ingredients.join(' ') : undefined,
            excludeIngredients: dislikes.join(','),
            intolerances: allergies.join(','),
            instructionsRequired: true,
            addRecipeInformation: true,
            offset,
            sort: sortOption,
            sortDirection,
            number: 20,
          },
        })
        .then((res) => res.data);

const getRecipesByCuisine = (cuisine: string) =>
  recipesAPI //use the parameter cuisine
    .get<RecipesResponse>('/recipes/complexSearch', {
      params: {
        cuisine,
        number: 3,
        sortDirection: 'desc',
        sort: 'popularity',
        instructionsRequired: true,
        addRecipeInformation: true,
      },
    })
    .then(({ data }) => ({ cuisine, data: data.results }));

const cuisines = ['British', 'European', 'Chinese', 'French', 'Italian'];

export const getRecipesForCuisines = () =>
  Promise.all(cuisines.map((cuisine) => getRecipesByCuisine(cuisine)));
