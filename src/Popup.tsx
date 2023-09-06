import { useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';

import styles from './popup.module.css';

function Popup() {
  const [currentFocus, setCurrentFocus] = usePersistentState<string>('currentFocus', '');
  const [focusInputValue, setFocusInputValue] = useState<string>(currentFocus);
  const [editingFocus, setEditingFocus] = useState<boolean>(!currentFocus);
  const [focusLog, setFocusLog] = usePersistentState<string[]>('focusLog', []);

  const handleClickLogAndNew = () => {
    if (!currentFocus) return;
    setFocusLog([...focusLog, currentFocus]);
    setCurrentFocus('');
    setFocusInputValue('');
  }

  const handleClickEditFocus = () => {
    if (!currentFocus) return;
    setFocusInputValue(currentFocus);
    setEditingFocus(true);
  }

  const handleClickSetFocus = () => {
    if (!focusInputValue) return;
    setCurrentFocus(focusInputValue);
    setEditingFocus(false);
  }

  return <div className={styles.popup}>
    {(!editingFocus && currentFocus) && <>
      <div
        className={styles.focus}
        onClick={handleClickEditFocus}
      >{currentFocus}</div>
      <button
        disabled={!currentFocus}
        onClick={handleClickLogAndNew}
      >Log this and set new focus</button>
    </>}
    {(editingFocus || !currentFocus) && <>
      <input
        className={styles.input}
        autoFocus
        placeholder='What are you working on?'
        type="text"
        onChange={(e) => setFocusInputValue(e.target.value)}
        value={focusInputValue}
      />
      <button
        className={styles.button_primary}
        disabled={!focusInputValue}
        onClick={handleClickSetFocus}
      >Set Focus</button>
    </>}
    <h2>Focus log</h2>
    <ul>
      {focusLog.map((focus, i) => <li key={i}>{focus}</li>)}
    </ul>
    <button
      onClick={() => setFocusLog([])}
    >Clear Log </button>
  </div>
}

export default Popup
