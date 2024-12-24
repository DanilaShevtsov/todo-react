import { useEffect, useRef, useState } from "react";
import "./App.css";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

import Modal from "./Modal";
import { loadANotes, setANotes } from "./storage";

function App() {
  const [start, setStart] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [listHeight, setListHeight] = useState("auto");
  const [editState, setEditState] = useState(false);
  const [editId, setEditId] = useState(0);

  const noteListRef = useRef(null);

  const [notes, setNotes] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const openEditNote = (id) => {
    setOpen(true);
    setEditId(id);
    setEditState(true);
    setTitle(notes.filter((note) => note.id === id)[0].title);
    setDesc(notes.filter((note) => note.id === id)[0].desc);
  };

  const removeNote = (id) => {
    const noteToRemove = document.getElementById(id);
    if (noteToRemove) {
      noteToRemove.classList.add("removing");
      setTimeout(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        setANotes(notes.filter((note) => note.id !== id));
      }, 300);
    }
  };

  const addTask = () => {
    const newTask = {
      id: editState ? editId : Date.now(),
      title: title,
      desc: desc,
    };

    setNotes((prevNotes) => {
      if (!editState) {
        setANotes([...prevNotes, newTask]);
        return [...prevNotes, newTask];
      } else {
        setANotes(
          prevNotes.map((note) => (note.id === editId ? newTask : note))
        );
        return prevNotes.map((note) => (note.id === editId ? newTask : note));
      }
    });
    setEditState(false);
    handleClose();
    setDesc("");
    setTitle("");
    setEditId(0);
  };
  useEffect(() => {
    if (start) {
      loadANotes(setNotes);
      setStart(false);
    }
    if (noteListRef.current) {
      setListHeight(`${notes.length * 250}px`);
    }
    if (!notes.length) {
      setListHeight(`${2 * 250}px`);
    }
  }, [notes]);

  return (
    <div className="App">
      <Modal
        setEditState={setEditState}
        editState={editState}
        isOpen={open}
        onClose={handleClose}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        addTask={addTask}
      />
      <div className="Frame-main">
        <div className="header">
          <h1 className="title-notes">Заметки</h1>
          <h1 className="add-notes" onClick={() => setOpen(true)}>
            +
          </h1>
        </div>
        <div
          ref={noteListRef}
          style={{ minHeight: listHeight }}
          className="noteList"
        >
          {notes.length && notes ? (
            notes.map((note) => {
              return (
                <div key={note.id} id={note.id} className="noteItem">
                  <div className="text-div">
                    <h1>{note.title}</h1>
                    <h2>{note.desc}</h2>
                  </div>
                  <div className="options-div">
                    <DeleteFilled
                      style={{
                        fontSize: "40px",
                        margin: 5,
                        color: "rgb(255,60,6)",
                      }}
                      onClick={() => removeNote(note.id)}
                    />
                    <EditFilled
                      style={{ fontSize: "40px", margin: 5, color: "" }}
                      onClick={() => openEditNote(note.id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <h1 style={{ color: "white" }}>Пусто</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
