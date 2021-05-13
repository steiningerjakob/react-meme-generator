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
  const [topText, setTopText] = useState('Launched 1000 memes');
  const [bottomText, setBottomText] = useState('hated every one of them');
  const [image, setImage] = useState('grumpycat');
  const stringInput = `https://api.memegen.link/images/${image}/${topText}/${bottomText}.png`;
  const stringOutput = stringInput.replace(/ /g, '_');
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
        topText={topText}
        setTopText={setTopText}
        bottomText={bottomText}
        setBottomText={setBottomText}
        image={image}
        setImage={setImage}
      />
      <img src={stringOutput} alt="meme" css={imageStyle} />
      <br />
      <a href={stringOutput} download="myMeme.png">
        Click to download
      </a>
    </div>
  );
}

export default App;
