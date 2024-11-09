export const textEllipsis = (text, length) => {
  if (text && text?.length <= length) return text;

  let temp = text ? text : "";

  return temp.slice(0, length) + "...";
};
