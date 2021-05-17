/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// Style element via CSS-in-JS
const divStyles = css`
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
  bottomTextInput,
  setBottomTextInput,
  imageInput,
  setImageInput,
  submitInput,
}) {
  return (
    <>
      <div css={divStyles}>
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
          <br />
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
            value={imageInput}
            onChange={(event) => {
              setImageInput(event.currentTarget.value);
            }}
            css={inputStyles}
          />
        </label>
        <br />
      </div>
      <div>
        <button onClick={submitInput}>Create meme</button>
      </div>
    </>
  );
}

export default UserInputs;
