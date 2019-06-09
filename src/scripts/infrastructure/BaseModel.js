const BaseModel = (defaultAttrs = {}, { version = 1 } = {}) => {
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

    _getAttrs = () => {
      return this._attrs;
    };

    serializeForCreate = () => {
      const attrs = { ...this._attrs };

      delete attrs.id;

      return attrs;
    };

    serializeForStorage() {
      return {
        version: this._version,
        attrs: this._getAttrs()
      };
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
  }

  return Model;
};

export default BaseModel;
