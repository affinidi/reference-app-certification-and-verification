type KeyValues = 'signUpToken' | 'did' | 'accessToken' | 'issuerLogin' | 'issuerPassword'

export const getItemFromLocalStorage = (key: KeyValues): string | undefined => {
  const stored = localStorage.getItem(key)
  if (!stored) {
    return undefined
  }

  return JSON.parse(stored)
}

export const setItemToLocalStorage = (key: KeyValues, value: string): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (error) {
    return error
  }
}

export const useLocalStorage = () => {
  const setItem = setItemToLocalStorage
  const getItem = getItemFromLocalStorage
  const clear = clearLocalStorage

  return {
    setItem,
    getItem,
    clear,
  }
}
