import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  state = {
    newNoteContent: ""
  };

  handleUserInput = e => {
    this.setState({
      newNoteContent: e.target.value
    });
  };

  writeNote = () => {
    this.props.addNote(this.state.newNoteContent);

    this.setState({
      newNoteContent: ""
    });
  };

  render() {
    return (
      <div className="form-wrapper">
        <input
          className="note-input"
          placeholder="Write a new note..."
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
        />
        <button className="note-button" onClick={this.writeNote}>
          Add note
        </button>
      </div>
    );
  }
}

export default NoteForm;
