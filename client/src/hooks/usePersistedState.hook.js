import { useState, useEffect } from "react";

//
const getLocalData = (key, fallbackValue) => {
  //Check for saved data, otherwise return fallback
  // console.log(`getLocalData(key: ${key}, fallbackValue: ${fallbackValue})`);
  let storedValue = localStorage.getItem(key);
  let parsedValue = JSON.parse(storedValue);

  // console.log(`LocalStorage(stored:${storedValue}, parsed: ${parsedValue})`);

  //Compare stored and fallback
  let result = parsedValue != null ? parsedValue : fallbackValue;

  // console.log(`${fallbackValue} OR ${parsedValue} = ${result}`);
  return result;
};

//Save amount of cookies to localStorage
const usePersistedState = (value, key) => {
  //Check for existing data in localStorage
  let newData = getLocalData(key, value);

  //Create a state to track data
  //State will be equal to provided value or localStorage value
  const [localData, setLocalData] = useState(newData);

  //Update value in Local storage on state change
  useEffect(() => {
    console.log(`Update storage status for ${key}`, localData);
    localStorage.setItem(key, JSON.stringify(localData));
  }, [localData]);

  //Return useState()
  return [localData, setLocalData];
};

export const clearLocalData = (key) => {
  localStorage.removeItem(key);
};

const savedState = (value, key) => {
  //Check storage
  let storedValue = localStorage.getItem(key);
  //Parse storage
  let parsedValue = JSON.parse(storedValue);
};

export default usePersistedState;
