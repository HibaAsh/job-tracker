import { useState } from "react";

const getInitialValue = (key, initialValue) => {
  const saved = localStorage.getItem(key)
  if(saved) {
    return JSON.parse(saved)
  }

  return initialValue
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => getInitialValue(key, initialValue))

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value

    setStoredValue(valueToStore)

    localStorage.setItem("jobs", JSON.stringify(valueToStore))
  }
  
  return [storedValue, setValue]
}

export default useLocalStorage