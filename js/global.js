export const cElem = (elem, all = false) => {
  if (all !== false) {
    const obj = [...document.querySelectorAll(elem)];
      return obj;
  } else {
    const obj = document.querySelector(elem);
    return obj;
  }
};

