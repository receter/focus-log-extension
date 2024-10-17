import { Button, classButtonGroup, classInlineIcon, Stack, SvgLogoUserbrainCurrentColor, TextInput } from '@userbrain/ui';
import { useEffect, useRef, useState } from 'react';
import { usePersistentState } from './hooks/usePersistentState';
import styles from './popup.module.css';
import Browser from 'webextension-polyfill';
import { actionIconActive, actionIconDefault } from './helpers';
import { TextLinkButton } from '@userbrain/ui';
import { accessibleOnClick, concatClassNames as cn } from '@sys42/utils';

function Popup() {
  const refInput = useRef<HTMLInputElement>(null);
  const [currentFocus, setCurrentFocus] = usePersistentState<string>('currentFocus', '');
  const [focusInputValue, setFocusInputValue] = usePersistentState<string>('focusInputValue', '');
  const [focusLog, setFocusLog] = usePersistentState<string[]>('focusLog', []);
  const [nextUp, setNextUp] = usePersistentState<string[]>('nextUp', []);
  const [isAddForLaterWhileInFocus, setIsAddForLaterWhileInFocus] = useState(false);

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
  }

  const handleClickSetFocus = () => {
    if (!focusInputValue) return;
    setCurrentFocus(focusInputValue);
    setFocusInputValue('');
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

  function handleClickAddSomethingForLater() {
    setIsAddForLaterWhileInFocus(true);
  }

  return <div className={styles.popup}>
    <Stack>
      {isAddForLaterWhileInFocus && <form onSubmit={() => {
        setNextUp([...nextUp, focusInputValue]);
        setFocusInputValue('');
        setIsAddForLaterWhileInFocus(false);
        refInput.current?.focus();
      }}>
        <Stack>
          <TextInput
            ref={refInput}
            className={styles.input}
            autoFocus
            placeholder='Add something for later'
            type="text"
            onChange={(e) => setFocusInputValue(e.target.value)}
            value={focusInputValue}
          />
          <div className={classButtonGroup}>
            <Button
              variant='primary'
              type="submit"
              disabled={!focusInputValue}
            >Add for later</Button>
            <Button
              onClick={() => {
                setFocusInputValue('');
                setIsAddForLaterWhileInFocus(false);
              }}
            >Cancel</Button>
          </div>
        </Stack>
      </form>}

      {(currentFocus && !isAddForLaterWhileInFocus) && <Stack>
        <div
          className={styles.focus}
        >{currentFocus}</div>
        <Button
          className={styles.buttonLogAndClear}
          disabled={!currentFocus}
          onClick={handleClickLogAndNew}
        >Log and clear</Button>
        <div style={{ textAlign: "center" }}>
          <TextLinkButton
            className={styles.textLinkButtonAddForLater}
            onClick={handleClickAddSomethingForLater}>Add something for later</TextLinkButton>
        </div>
      </Stack>}
      {!currentFocus && <form onSubmit={handleFormSubmit}>
        <Stack>
          <TextInput
            ref={refInput}
            className={styles.input}
            autoFocus
            placeholder='Hmm… what should I focus on?'
            type="text"
            onChange={(e) => setFocusInputValue(e.target.value)}
            value={focusInputValue}
          />
          <div className={classButtonGroup}>
            <Button
              variant='primary'
              disabled={!focusInputValue}
              type='submit'
              className={styles.buttonSetFocus}
            >Set Focus</Button>
            <Button
              disabled={!focusInputValue}
              onClick={handleClickAddNextUp}
              className={styles.buttonAddForLater}
            >Add for later</Button>
          </div>
        </Stack>

      </form>}

      {(nextUp.length > 0 && !currentFocus) && <>
        <Stack>
          <h2>Next up</h2>
          {nextUp.map((focus, i) => <div
            key={i}
            className={styles.nextUpItem}
            {...accessibleOnClick(() => handleClickNextUpItem(i))}
          >
            {focus}
          </div>)}
        </Stack>
      </>}

      {(focusLog.length > 0 && !currentFocus) && <Stack>
        <h2>Focus log</h2>
        <ul>
          {focusLog.map((focus, i) => <li key={i}>{focus}</li>)}
        </ul>
        <Button
          onClick={() => setFocusLog([])}
        >Clear Log </Button>
      </Stack>}
    </Stack>

    {!currentFocus && <div className={styles.footer}>
      Powered by <a href="https://www.userbrain.com/">
        {" "}
        <SvgLogoUserbrainCurrentColor className={
          cn(
            styles.userbrainLogo,
            classInlineIcon
          )}
        />
      </a>
    </div>}
  </div>
}

export default Popup
