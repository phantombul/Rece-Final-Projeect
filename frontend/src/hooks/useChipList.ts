import { useState } from 'react';

// included ingredients, disliked ingredients and allergies all have the same logic of adding items to an array
// without having duplicates, and also removing them if needed.
// this hook handles the logic for all of them

export const useChipList = (initialValue?: string[]) => {
  const [items, setItems] = useState<string[]>(initialValue || []);

  const addItem = (item: string) => setItems((prev) => [...prev, item]);

  const removeItem = (item: string) =>
    setItems((prev) => prev.filter((el) => el !== item));

  return {
    items,
    addItem,
    removeItem,
  };
};
