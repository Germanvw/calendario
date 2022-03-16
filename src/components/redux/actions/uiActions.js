import { types } from "../types";

export const modalOpen = () => ({
  type: types.uiOpenModal,
});

export const modalClose = () => ({
  type: types.uiCloseModal,
});

export const setError = (errorMsg) => ({
  type: types.uiSetError,
  payload: errorMsg,
});

export const clearError = () => ({
  type: types.uiClearError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const stopLoading = () => ({
  type: types.uiStopLoading,
});
