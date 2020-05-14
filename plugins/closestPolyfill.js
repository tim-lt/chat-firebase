((ELEMENT_) => {
  const ELEMENT = ELEMENT_;
  ELEMENT.matches = ELEMENT.matches
    || ELEMENT.mozMatchesSelector
    || ELEMENT.msMatchesSelector
    || ELEMENT.oMatchesSelector
    || ELEMENT.webkitMatchesSelector;
  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    try {
      if (!this) return null;
      if (this.matches(selector)) return this;
      if (!this.parentElement) return null;

      return this.parentElement.closest(selector);
    } catch (error) {
      console.log(`Error ${error}`);
    }

    return true;
  };
})(Element.prototype);
