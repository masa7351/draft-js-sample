import React, { Fragment, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  ContentState,
  convertToRaw
} from 'draft-js';
import styled from 'styled-components';
import { stateToHTML } from 'draft-js-export-html';

const App: React.FC = () => {
  // ex) Set empty text
  // const [state, setState] = useState({
  //   editorState: EditorState.createEmpty()
  // });

  // ex) Set default text
  const [state, setState] = useState({
    editorState: EditorState.createWithContent(
      ContentState.createFromText('This is a sample of Draft.js.')
    )
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

  const saveHandler = () => {
    // https://qiita.com/samayotta/items/309f28b9da5a99b6e38f
    const contentState = state.editorState.getCurrentContent();
    const content = convertToRaw(contentState);
    console.log(content);
    const html = stateToHTML(contentState);
    console.log(html);
  };

  return (
    <Fragment>
      <StyledBoldLabel>
        範囲選択してタップするとBoldになります。
        <button onClick={boldHandler}>Bold</button>
      </StyledBoldLabel>
      <StyledDiv>
        <button onClick={saveHandler}>Save</button>
      </StyledDiv>
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
