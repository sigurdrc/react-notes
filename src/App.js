import React, { Component } from "react";
import "./App.css";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./config/firebase-config";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child("notes");
  }

  state = {
    notes: []
  };

  componentWillMount() {
    this.database.on("child_added", snap => {
      const previousNotes = this.state.notes;
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });

      this.setState({
        notes: previousNotes
      });
    });

    this.database.on("child_removed", snap => {
      const previousNotes = this.state.notes;
      const filteredNotes = previousNotes.filter(i => i.id !== snap.key);

      this.setState({
        notes: filteredNotes
      });
    });
  }

  addNote = note => {
    this.database.push().set({ noteContent: note });
  };

  removeNote = noteId => {
    this.database.child(noteId).remove();
  };

  render() {
    return (
      <div className="notes-wrapper">
        <div className="notes-header">
          <div className="notes-header__heading">
            React & Firebase To-Do list
          </div>
        </div>
        <div className="notes-body">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
                removeNote={this.removeNote}
              />
            );
          })}
        </div>
        <div className="notes-footer">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
