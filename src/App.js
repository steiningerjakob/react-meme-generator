import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import UserInputs from './UserInputs.js';

const imageStyle = css`
  max-width: 300px;
  max-height: auto;
  margin: 20px;
`;

function App() {
  const [topTextInput, setTopTextInput] = useState('Launched 1000&1 memes');
  const [topTextOutput, setTopTextOutput] = useState('Launched 1000&1 memes');
  const [bottomTextInput, setBottomTextInput] = useState(
    '#hated every one of them',
  );
  const [bottomTextOutput, setBottomTextOutput] = useState(
    '#hated every one of them',
  );
  const [image, setImage] = useState('grumpycat');
  const stringInput = `https://api.memegen.link/images/${image}/${topTextOutput}/${bottomTextOutput}.png`;
  const stringOutput = stringInput
    .replace(/ /g, '_')
    .replace(/[#]/g, '~h')
    .replace(/&/g, '~a');

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <h1>
        <span role="img" aria-label="waving hand">
          👋
        </span>{' '}
        Welcome friend. This is my React Meme Generator!
      </h1>

      {/* Collect user inputs */}
      <UserInputs
        topTextInput={topTextInput}
        setTopTextInput={setTopTextInput}
        topTextOutput={topTextOutput}
        setTopTextOutput={setTopTextOutput}
        bottomTextInput={bottomTextInput}
        setBottomTextInput={setBottomTextInput}
        bottomTextOutput={bottomTextOutput}
        setBottomTextOutput={setBottomTextOutput}
        image={image}
        setImage={setImage}
      />
      <img src={stringOutput} alt="meme" css={imageStyle} />
      <br />
      {/* download functionality currently not working */}
      <a href="{stringOutput}" download="myMeme.jpeg">
        Click to download
      </a>
    </div>
  );
}

export default App;
