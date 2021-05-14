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
  const [topTextInput, setTopTextInput] = useState(['Launched 1000&1 memes']);
  const [topTextOutput, setTopTextOutput] = useState(['Launched 1000&1 memes']);
  const [bottomTextInput, setBottomTextInput] = useState([
    '#hated every one of them',
  ]);
  const [bottomTextOutput, setBottomTextOutput] = useState([
    '#hated every one of them',
  ]);
  const [imageInput, setImageInput] = useState(['grumpycat']);
  const [imageOutput, setImageOutput] = useState(['grumpycat']);
  const stringInput = `https://api.memegen.link/images/${imageOutput}/${topTextOutput}/${bottomTextOutput}.png`;
  const stringOutput = stringInput
    .replace(/ /g, '_')
    .replace(/[#]/g, '~h')
    .replace(/&/g, '~a');

  // download function currently not working - source:
  // https://stackoverflow.com/questions/49668363/html5-download-attribute-not-working-when-download-external-pdf-file-on-chrome/60299071#60299071

  function forceDownload(blob, filename) {
    // Create an invisible anchor element
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.setAttribute('download', filename);
    document.body.appendChild(anchor);

    // Trigger the download by simulating click
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
    document.body.removeChild(anchor);
  }

  function downloadResource(url, filename) {
    // If no filename is set, use filename from URL
    if (!filename) filename = url.match(/\/([^/#?]+)[^/]*$/)[1];

    fetch(url, {
      headers: new Headers({
        Origin: window.location.origin,
      }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => forceDownload(blob, filename))
      .catch((e) => console.error(e));
  }

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
        setTopTextOutput={setTopTextOutput}
        bottomTextInput={bottomTextInput}
        setBottomTextInput={setBottomTextInput}
        setBottomTextOutput={setBottomTextOutput}
        imageInput={imageInput}
        setImageInput={setImageInput}
        setImageOutput={setImageOutput}
      />
      {/* Dispyay meme */}
      <img src={stringOutput} alt="meme" css={imageStyle} />
      <br />
      <button onClick={() => downloadResource(stringOutput, 'MyMeme.jpeg')}>
        Download meme
      </button>
    </div>
  );
}

export default App;
