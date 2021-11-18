import React, { useEffect } from 'react';
import { GuessedWords, Input } from '.';
import { getSecretWord } from '../actions';
import { GUESS_WORDS, LANGUAGES } from '../constants/types';
import languageContext from '../context/language';
import '../styles/global.css';
import Congrats from './congrats';
import LanguagePicker from './languagePicker';

const initialState = {
  success: false,
  secretWord: null,
  guessedWords: [],
  language: 'en',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GUESS_WORDS.SET_SECRET_WORD: {
      return {
        ...state,
        secretWord: action.payload,
      };
    }

    case LANGUAGES.SET_LANGUAGE: {
      return {
        ...state,
        language: action.payload,
      };
    }

    default:
      throw new Error(`Action type: ${action.type} not supported`);
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setSecretWord = (secretWord) => {
    dispatch({ type: GUESS_WORDS.SET_SECRET_WORD, payload: secretWord });
  };

  const setLanguage = (language) => {
    dispatch({ type: LANGUAGES.SET_LANGUAGE, payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div data-testid="component-spinner" className="container">
        <div role="status" className="spinner-border">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <languageContext.Provider value={state.language}>
      <LanguagePicker setLanguage={setLanguage} />

      <div className="container" data-testid="component-app">
        <h1>Jotto</h1>
        <Input secretWord={state.secretWord} success={state.success} />
        <Congrats success={state.success} />
        <GuessedWords guessedWords={state.guessedWords} />
      </div>
    </languageContext.Provider>
  );
};

export default App;
