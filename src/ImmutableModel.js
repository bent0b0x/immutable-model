const ImmutableModel = (defaultAttrs = {}, { version = 1 } = {}) => {
  class Model {
    static version = version;

    constructor(attrs = {}) {
      this._attrs = {};
      this._version = version;

      for (const key in defaultAttrs) {
        this._attrs[key] = defaultAttrs[key];
      }

      for (const key in attrs) {
        if (!this.isValidAttrKey(key)) {
          throw new Error(`Cannot build model with unknown key ${key}`);
        }
        this._attrs[key] = attrs[key];
      }

      Object.freeze(this._attrs);
    }

    isValidAttrKey = key => {
      return Object.hasOwnProperty.call(defaultAttrs, key);
    };

    get = key => {
      if (!this.isValidAttrKey(key)) {
        throw new Error(`Cannot get unknown key ${key} on model.`);
      }

      return this._attrs[key];
    };

    set = (key, val) => {
      if (!this.isValidAttrKey(key)) {
        throw new Error(`Cannot set unknown key ${key} on model.`);
      }

      return new this.constructor({
        ...this._attrs,
        [key]: val
      });
    };

    attrs = () => {
      return this._attrs;
    };
  }

  return Model;
};

export default ImmutableModel;
