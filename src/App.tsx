import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const App: React.FC = () => {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty()
  });

  const changeHandler = (editorState: EditorState) => {
    setState({ editorState });
  };

  return <Editor editorState={state.editorState} onChange={changeHandler} />;
};

export default App;
