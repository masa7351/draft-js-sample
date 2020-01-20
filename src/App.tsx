import React, { Fragment, useState } from 'react';
import { Editor, EditorState, RichUtils, DraftHandleValue } from 'draft-js';
import styled from 'styled-components';

const App: React.FC = () => {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty()
  });

  const changeHandler = (editorState: EditorState) => {
    setState({ editorState });
  };

  //  Key Command Shortcut
  // https://draftjs.org/docs/api-reference-editor/
  // Command + B = Bold
  // Command + I = Italic
  const keyCommandHandler = (
    command: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      changeHandler(newState);
      return 'handled';
    } else {
      return 'not-handled';
    }
  };

  const boldHandler = () => {
    const newState = RichUtils.toggleInlineStyle(state.editorState, 'BOLD');
    setState({ editorState: newState });
  };

  return (
    <Fragment>
      <StyledBoldLabel>
        範囲選択してタップするとBoldになります。
        <button onClick={boldHandler}>Bold</button>
      </StyledBoldLabel>
      <StyledDiv>Command + B → Bold　／ Command + I → Italic</StyledDiv>
      <StyledDiv>↓テキストを入力してください。</StyledDiv>
      <Editor
        editorState={state.editorState}
        handleKeyCommand={keyCommandHandler}
        onChange={changeHandler}
      />
    </Fragment>
  );
};

export default App;

const StyledBoldLabel = styled.div`
  display: inline;
  margin: 10px;
`;

const StyledDiv = styled.div`
  margin: 10px;
`;
