export const loadANotes = (setChange) => {
  const notes = JSON.parse(localStorage.getItem("Notes"));
  if (notes) {
    console.log(notes);
    setChange(notes);
  } else {
    console.log("!");

    setChange([]);
  }
};

export const setANotes = (notes) => {
  localStorage.setItem("Notes", JSON.stringify(notes));
};
