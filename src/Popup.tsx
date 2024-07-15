import { Button } from '@sys42/components';
import { useEffect, useRef } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import styles from './popup.module.css';
import Browser from 'webextension-polyfill';
import { actionIconActive, actionIconDefault } from './helpers';

function Popup() {
  const refInput = useRef<HTMLInputElement>(null);
  const [currentFocus, setCurrentFocus] = usePersistentState<string>('currentFocus', '');
  const [focusInputValue, setFocusInputValue] = usePersistentState<string>('focusInputValue', '');
  const [focusLog, setFocusLog] = usePersistentState<string[]>('focusLog', []);
  const [nextUp, setNextUp] = usePersistentState<string[]>('nextUp', []);

  useEffect(() => {
    // Sets Web Extension popup icon /images/icon-16.png
    if (currentFocus) {
      Browser.action.setIcon(actionIconActive);
    } else {
      Browser.action.setIcon(actionIconDefault);
    }
  }, [currentFocus]);

  const handleClickLogAndNew = () => {
    if (!currentFocus) return;
    setFocusLog([...focusLog, currentFocus]);
    setCurrentFocus('');
    setFocusInputValue('');
  }

  const handleClickSetFocus = () => {
    if (!focusInputValue) return;
    setCurrentFocus(focusInputValue);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClickSetFocus();
  }

  const deleteNextUpItem = (i: number) => {
    const newNextUp = [...nextUp];
    newNextUp.splice(i, 1);
    setNextUp(newNextUp);
    refInput.current?.focus();
  }

  const handleClickNextUpItem = (i: number) => {
    setFocusInputValue(nextUp[i]);
    deleteNextUpItem(i);
  }

  const handleClickAddNextUp = () => {
    if (!focusInputValue) return;
    setNextUp([...nextUp, focusInputValue]);
    setFocusInputValue('');
    refInput.current?.focus();
  }

  return <div className={styles.popup}>
    {currentFocus && <>
      <div
        className={styles.focus}
      >{currentFocus}</div>
      <Button
        isDisabled={!currentFocus}
        onPress={handleClickLogAndNew}
      >Log and clear</Button>
    </>}
    {!currentFocus && <form className={styles.form} onSubmit={handleFormSubmit}>
      <input
        ref={refInput}
        className={styles.input}
        autoFocus
        placeholder='Hmm… what should I focus on?'
        type="text"
        onChange={(e) => setFocusInputValue(e.target.value)}
        value={focusInputValue}
      />
      <div className={styles.buttons}>
        <Button
          variant='primary'
          isDisabled={!focusInputValue}
          type='submit'
        >Set Focus</Button>
        <Button
          isDisabled={!focusInputValue}
          onPress={handleClickAddNextUp}
        >Add for later</Button>
      </div>

    </form>}

    {(nextUp.length > 0 && !currentFocus) && <>
      <h2>Next up</h2>
      {nextUp.map((focus, i) => <div
        key={i}
        className={styles.nextUpItem}
        onClick={() => handleClickNextUpItem(i)}
      >
        {focus}
        {/* <button className={styles.deleteButton} onClick={() => handleClickDeleteNextUp(i)} >Delete</button> */}
      </div>)}
    </>}

    {(focusLog.length > 0 && !currentFocus) && <>
      <h2>Focus log</h2>
      <ul>
        {focusLog.map((focus, i) => <li key={i}>{focus}</li>)}
      </ul>
      <Button
        onPress={() => setFocusLog([])}
      >Clear Log </Button>
    </>}

  </div>
}

export default Popup
