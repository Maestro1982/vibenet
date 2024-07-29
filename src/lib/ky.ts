import ky from "ky";

const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      // Return it back to a date object
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
});

export default kyInstance;
