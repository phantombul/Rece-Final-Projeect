export type SearchMode = 'some' | 'all';

export const sortOptions = [
  'popularity',
  'healthiness',
  'price',
  'time',
  'max-used-ingredients',
  'min-missing-ingredients',
  'calories',
] as const;

export type SortOption = typeof sortOptions[number]; // SortOption must be one of the elements of sortOptions array, so to avoid duplication type can be inferred as sortOptions[number]

export type SortDirection = 'asc' | 'desc';

export type Ingredient = {
  name: string;
};

export type ShortRecipe = {
  id: number;
};

export type Recipe = ShortRecipe & {
  image: string;
  title: string;
  summary: string;
  aggregateLikes: number;
  readyInMinutes: number;
  pricePerServing: number;
};

type InstructionStep = {
  // "ingredients": [],
  number: number;
  step: string;
};

export type RecipeInstruction = {
  name: string;
  steps: InstructionStep[];
};

export type RecipesRequest = {
  ingredients: string[];
  dislikes: string[];
  allergies: string[];
  searchMode: SearchMode;
  sortOption: SortOption;
  sortDirection: SortDirection;
  offset: number;
};

export type RecipesResponse = {
  totalResults: number;
  results: Recipe[];
};

export type AuthCredentials = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  allergies: string[];
  favourites: string[];
};
