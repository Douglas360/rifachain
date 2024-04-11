import shortid from "shortid";
export const encodeId = (id: number): string => {
  const hash = shortid.generate();
  const encoded = `${id};${hash}`;

  return encoded;
};
