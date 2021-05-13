/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';

// Style element via CSS-in-JS
const sectionStyles = css`
  display: flex;
  justify-content: center;
`;

const inputStyles = css`
  margin: 10px 30px 30px 30px;
  height: 30px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 8px 1px #dcdcdc;
  background-color: lightyellow;
  text-align: center;
`;

// Capture user input on top & bottom text and image, and change variable state accordingly
// Pass state to other components via destructured props
function UserInputs({
  topTextInput,
  setTopTextInput,
  topTextOutput,
  setTopTextOutput,
  bottomTextInput,
  setBottomTextInput,
  bottomTextOutput,
  setBottomTextOutput,
  image,
  setImage,
  imageOutput,
  setImageOutput,
}) {
  // function to delay processing of user input --> Question: variables are called in App.js files, is that ok?
  useEffect(() => {
    const timeOutTopText = setTimeout(
      () => setTopTextOutput(topTextInput),
      1000,
    );
    return () => clearTimeout(timeOutTopText);
  });
  useEffect(() => {
    const timeOutBottomText = setTimeout(
      () => setBottomTextOutput(bottomTextInput),
      1000,
    );
    return () => clearTimeout(timeOutBottomText);
  });
  useEffect(() => {
    const timeOutImage = setTimeout(() => setImageOutput(image), 1000);
    return () => clearTimeout(timeOutImage);
  });

  return (
    <div>
      <section css={sectionStyles}>
        <label htmlFor="top">
          Top text:
          <br />
          <input
            id="top"
            placeholder="Launched 1000&1 memes"
            value={topTextInput}
            onChange={(event) => {
              setTopTextInput(event.currentTarget.value);
            }}
            css={inputStyles}
          />
        </label>

        <label htmlFor="bottom">
          Bottom text:
          <br />
          <input
            id="bottom"
            placeholder="hated every one of them"
            value={bottomTextInput}
            onChange={(event) => {
              setBottomTextInput(event.currentTarget.value);
            }}
            css={inputStyles}
          />
        </label>

        <label htmlFor="image">
          Image:
          <br />
          <input
            id="image"
            placeholder="grumpycat"
            value={image}
            onChange={(event) => {
              setImage(event.currentTarget.value);
            }}
            css={inputStyles}
          />
        </label>
      </section>
    </div>
  );
}

export default UserInputs;
