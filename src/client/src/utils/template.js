export function getSelectedWordDetails(text) {
  const selection = window.getSelection();
  console.log(selection);
  console.log(
    text.rawContent.substring(selection.anchorOffset, selection.focusOffset)
  );

  return {
    start: selection.anchorOffset,
    ending: selection.focusOffset,
    word: text.rawContent.substring(
      selection.anchorOffset,
      selection.focusOffset
    ),
    textId: text.textId,
  };
}
