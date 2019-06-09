import ImmutableModel from "../ImmutableModel";

describe("ImmutableModel", () => {
  it("should create a class", () => {
    const MyModel = ImmutableModel();

    expect(typeof MyModel).toEqual("function");
    expect(() => {
      MyModel();
    }).toThrow();
    expect(() => {
      new MyModel();
    }).not.toThrow();
  });

  describe("constructor", () => {
    it("should build a new object with the specified default attributes", () => {
      const MyModel = ImmutableModel({
        foo: "bar",
        baz: "foo"
      });

      const model = new MyModel();

      expect(model.get("foo")).toEqual("bar");
      expect(model.get("baz")).toEqual("foo");
    });

    it("should override default attributes when overrides are passed in", () => {
      const MyModel = ImmutableModel({
        foo: "bar",
        baz: "foo"
      });

      const model = new MyModel({
        baz: "weeble"
      });

      expect(model.get("foo")).toEqual("bar");
      expect(model.get("baz")).toEqual("weeble");
    });

    it("should prevent unknown keys from being set", () => {
      const MyModel = ImmutableModel({
        foo: "bar",
        baz: "foo"
      });

      expect(() => {
        new MyModel({
          baz: "weeble",
          wobble: "dweeble"
        });
      }).toThrow();
    });
  });

  describe("get", () => {
    const MyModel = ImmutableModel({
      foo: "bar",
      baz: "bee"
    });

    it("should return values for valid attribute keys", () => {
      const model = new MyModel();

      expect(model.get("foo")).toEqual("bar");
    });

    it("should throw if an invalid attribute key is passed in", () => {
      const model = new MyModel();

      expect(() => {
        model.get("random_key");
      }).toThrow();
    });
  });

  describe("set", () => {
    const MyModel = ImmutableModel({
      foo: "bar",
      baz: "bee"
    });

    it("should fail to update attributes directly", () => {
      const model = new MyModel();

      model._attrs.foo = "fizzle";

      expect(model.get("foo")).toEqual("bar");
    });

    it("should set new values for valid attribute keys", () => {
      const model = new MyModel();

      const updatedModel = model.set("foo", "bazzle");
      expect(updatedModel.get("foo")).toEqual("bazzle");
      expect(updatedModel instanceof MyModel).toEqual(true);
    });

    it("should throw if an invalid attribute key is passed in", () => {
      const model = new MyModel();

      expect(() => {
        model.set("random_key", "lit");
      }).toThrow();
    });

    it("should return a new object with the updated value, leaving the original object unchanged", () => {
      const model = new MyModel();

      const updatedModel = model.set("foo", "beez");

      expect(model instanceof MyModel).toEqual(true);
      expect(updatedModel instanceof MyModel).toEqual(true);

      expect(model).not.toEqual(updatedModel);

      expect(model.get("foo")).toEqual("bar");
      expect(updatedModel.get("foo")).toEqual("beez");
      expect(updatedModel instanceof MyModel).toEqual(true);
    });
  });
});
