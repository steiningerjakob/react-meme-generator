import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import UserInputs from './UserInputs.js';

// Style element via CSS-in-JS

const imageStyle = css`
  max-width: 300px;
  max-height: auto;
  margin: 20px;
`;
const pStyles = css`
  font-size: 1.5em;
  font-weight: bold;
  margin: 5px;
  text-align: center;
`;
const historyStyles = css`
  background-color: #fafafa;
  max-width: 400px;
  padding: 5px;
  margin: auto;
  margin-top: 20px;
  display: flexbox;
  justify-content: center;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  border-radius: 5px;
  text-align: left;
  font-size: 12px;
`;

function App() {
  // set state variables

  const [topTextInput, setTopTextInput] = useState('Launched 1000&1 memes');
  const [topTextOutput, setTopTextOutput] = useState('Launched 1000&1 memes');
  const [bottomTextInput, setBottomTextInput] = useState(
    '#hated every one of them',
  );
  const [bottomTextOutput, setBottomTextOutput] = useState(
    '#hated every one of them',
  );
  const [imageInput, setImageInput] = useState('grumpycat');
  const [imageOutput, setImageOutput] = useState('grumpycat');
  const [memeHistory, setMemeHistory] = useState([]);
  let historyId = 0;

  // assemble URL string based on user inputs

  const stringInput = `https://api.memegen.link/images/${imageOutput}/${topTextOutput}/${bottomTextOutput}.png`;
  const stringOutput = stringInput
    .replace(/ /g, '_')
    .replace(/[#]/g, '~h')
    .replace(/&/g, '~a');

  // retrieve user input via button click and create history

  function submitInput() {
    setTopTextOutput(topTextInput);
    setBottomTextOutput(bottomTextInput);
    setImageOutput(imageInput);
    const newMemeHistory = memeHistory.concat({
      id: historyId,
      name: `Top text: ${topTextInput}, bottom text: ${bottomTextInput}, image: ${imageInput}`,
    });
    historyId = historyId + 1;
    setMemeHistory(newMemeHistory);
  }

  // download function source:
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

  // render elements on website

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
        imageOutput={imageOutput}
        setImageOutput={setImageOutput}
        submitInput={submitInput}
      />
      <br />
      {/* Dispyay meme */}
      <img src={stringOutput} alt="meme" css={imageStyle} />
      <br />
      <button onClick={() => downloadResource(stringOutput, 'MyMeme.jpeg')}>
        Download meme
      </button>
      <br />
      {/* Display search history */}
      <div css={historyStyles}>
        <p css={pStyles}>Your meme history</p>
        <ul>
          {memeHistory.map((item) => {
            return <li key={`Meme-History-Item-${item.id}`}>{item.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
