// import { useState, useEffect } from 'react';

// type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

// export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
//   // Get data from localStorage or use the provided initial value
//   const storedValue = localStorage.getItem(key);
//   const initial = storedValue ? JSON.parse(storedValue) as T : initialValue;

//   // State to keep track of the current value
//   const [value, setValue] = useState<T>(initial);

//   // Use useEffect to update localStorage when value changes
//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// }

// export function useTempLocalStorage<T>(key: string) {
//   const [tmp, setTmp] = useLocalStorage("tmp", "{}");
//   const [val, setVal] = useLocalStorage<T | undefined>(key, undefined);

//   useEffect(() => {
//     const parsed = JSON.parse(tmp);

//     setVal(parsed[key]);
//   }, [tmp]);

//   return [val, setVal]
// }
