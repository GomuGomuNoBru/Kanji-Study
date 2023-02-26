import "./App.css";
import React, { useState } from "react";
import { kanji } from "./Gallery.js";
import useSound from "use-sound";
import mySound from "./minecraft_click_ver_2.mp3"


//randomize array kanji
const randomKanjis = kanji.sort((a, b) => 0.5 - Math.random());

export default function App() {
  //consts for many thinks  
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const currentRandomKanji = randomKanjis[currentKanjiIndex];
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [play, setPlay] = useState(false);
  const [kanjiLatinka, setKanjiLatinka] = useState(false);
  const [latinkaKanji, setLatinkaKanji] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [playSound] = useSound(mySound)

  const [ownStudy,setOwnStudy] = useState(false);
  const [cards, setCards] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const front = e.target.front.value;
    const back = e.target.back.value;
    const newCard = { front, back };
    setCards([...cards, newCard]);
    // save card to folder here
    e.target.reset();
  }
  function StudySession({ cards }) {
    const [index, setIndex] = useState(0);
    const [learnedCards, setLearnedCards] = useState([]);
    const [showBack, setShowBack] = useState(false);
  
    function handleLearned() {
      setLearnedCards([...learnedCards, index]);
      setIndex(index + 1);
      setShowBack(false);
    }
  
    function handleNotLearned() {
      setIndex(index + 1);
      setShowBack(false);
    }
  
    function handleFlip() {
      setShowBack(!showBack);
    }
  
    function handleReset() {
      setIndex(0);
      setLearnedCards([]);
    }
return (
  <div>
      {cards.length > 0 ? (
        <div>
          <h2>Study session</h2>
          {index < cards.length ? (
            <div>
             
              <button onClick={handleFlip}>
                {showBack ? <p>{cards[index].back}</p> : <p>{cards[index].front}</p>} 
              </button>
              <p></p>
              <button onClick={handleLearned}>Learned</button>
              <button onClick={handleNotLearned}>Not learned</button>
            </div>
          ) : (
            <div>
              <h3>Session complete</h3>
              <p>You learned {learnedCards.length} out of {cards.length} cards</p>
              <button onClick={handleReset}>Start over</button>
            </div>
          )}
        </div>
      ) : (
        <p>No cards to study</p>
      )}
    </div>
);
}
  
  //for play type 1
  const correctAnswer = currentRandomKanji.name;
  const badAnswer1 =
    //if answear=null then answear= last index in array
    randomKanjis[currentKanjiIndex - 1]?.name ?? randomKanjis.slice(-1)[0].name;
  const badAnswer2 =
    //if answear=null then answear= firts index in array
    randomKanjis[currentKanjiIndex + 1]?.name ?? randomKanjis[0].name;
  //randomize answear array
  const randomAnswers = [correctAnswer, badAnswer1, badAnswer2].sort(
    (a, b) => 0.5 - Math.random()
  );
  //for play type 2
  const correctAnswer2 = currentRandomKanji.kanji;
  const badAnswer12 =
    //if answear=null then answear= last index in array
    randomKanjis[currentKanjiIndex - 1]?.kanji ??
    randomKanjis.slice(-1)[0].kanji;
  const badAnswer22 =
    //if answear=null then answear= firts index in array
    randomKanjis[currentKanjiIndex + 1]?.kanji ?? randomKanjis[0].kanji;
  //randomize answear array
  const randomAnswers2 = [correctAnswer2, badAnswer12, badAnswer22].sort(
    (a, b) => 0.5 - Math.random()
  );

  //refresh page
  function refreshPage() {
    window.location.reload(false);
  }
  //game type 1
  //if correct score +1, new kanji
  //if incorrect score +0, new kanji
  function goodJob(correct) {
    if (currentKanjiIndex < randomKanjis.length - 1) {
      setCurrentKanjiIndex(currentKanjiIndex + 1);
    } else {
      setGameOver(true);
    }
    //answear buttons
    setButtonText(randomAnswers[0]);
    setButtonText2(randomAnswers[1]);
    setButtonText3(randomAnswers[2]);

    if (correct) setCurrentScore(currentScore + 1);
  }

  const [buttonText, setButtonText] = useState(randomAnswers[0]);
  const [buttonText2, setButtonText2] = useState(randomAnswers[1]);
  const [buttonText3, setButtonText3] = useState(randomAnswers[2]);

  //game type 2
  //if correct score +1, new kanji
  //if incorrect score +0, new kanji
  function goodJob2(correct) {
    if (currentKanjiIndex < randomKanjis.length - 1) {
      setCurrentKanjiIndex(currentKanjiIndex + 1);
    } else {
      setGameOver(true);
    }
    //answear buttons
    setButtonText4(randomAnswers2[0]);
    setButtonText5(randomAnswers2[1]);
    setButtonText6(randomAnswers2[2]);

    if (correct) setCurrentScore(currentScore + 1);
  }

  const [buttonText4, setButtonText4] = useState(randomAnswers2[0]);
  const [buttonText5, setButtonText5] = useState(randomAnswers2[1]);
  const [buttonText6, setButtonText6] = useState(randomAnswers2[2]);

  //buttons for Light/Dark theme
  const darkText = "Dark";
  const lightText = "Light";
  const [buttonTheme, setButtonTheme] = useState("Light");
  function check() {

    darkTheme === true ? setButtonTheme(darkText, (" Theme")) : setButtonTheme(lightText, (" Theme"))

  }




  return (

    <div className={darkTheme ? "GameOver-dark" : "GameOver-light"}>
      <div className="App">
        <header className="App-header">
          <>
            <body>
              {!play && (
                <div className={darkTheme ? "GameOver-dark" : "GameOver-light"}>
                  <div className="menu">


                    <h1>THE BIG KANJI</h1>
                    <p id="question">WHAT TYPE OF LECTURE DO YOU WANT?</p>


                    <button
                      id="MenuButton"
                      onClick={() => {
                        setPlay(true);
                        setKanjiLatinka(true);
                        playSound();
                      }}
                    >
                      kanji / latinka
                    </button>


                    <button
                      id="MenuButton"
                      onClick={() => {
                        setPlay(true);
                        setLatinkaKanji(true);
                        playSound();
                      }}
                    >
                      latinka / kanji
                    </button>{" "}

                    <button id="" onClick={() => {
                      playSound();
                      setPlay(true);
                      setOwnStudy(true);
                    }}> Own study
                    </button>
                    <p></p>

                    <button onClick={() => {
                      setDarkTheme(!darkTheme)
                      check();
                      playSound();
                    }}>{buttonTheme} Theme
                    </button>

                  </div>
                </div>
              )}

              {
                //if gameOver=false then its game
              }
              {!gameOver && play && kanjiLatinka && (
                <>
                  <div
                    className={darkTheme ? "GameOver-dark" : "GameOver-light"}
                  >
                    <h2>What kanji is this?</h2>

                    <p></p>
                    {
                      //kanji on page
                    }
                    <div className="Kanji">{currentRandomKanji.kanji}</div>

                    <p></p>

                    <button
                      onClick={() => {
                        goodJob(buttonText === currentRandomKanji.name);
                        playSound();
                      }}
                    >
                      {buttonText}
                    </button>

                    <button
                      onClick={() => {
                        goodJob(buttonText2 === currentRandomKanji.name);
                        playSound();
                      }}
                    >
                      {buttonText2}
                    </button>

                    <button
                      onClick={() => {
                        goodJob(buttonText3 === currentRandomKanji.name);
                        playSound();
                      }}
                    >
                      {buttonText3}
                    </button>
                    <p></p>
                    <p>{currentScore}</p>
                  </div>
                </>
              )}
              {
                //if gameOver=false then its game
              }
              {!gameOver && play && latinkaKanji && (
                <>
                  <div
                    className={darkTheme ? "GameOver-dark" : "GameOver-light"}
                  >
                    <h2>How do you write this in kanji?</h2>

                    <p></p>
                    {
                      //kanji on page
                    }
                    <div className="Latinka">{currentRandomKanji.name}</div>

                    <p></p>

                    <button
                      id="KanjiButton"
                      onClick={() => {
                        goodJob2(buttonText4 === currentRandomKanji.kanji);
                        playSound();
                      }}
                    >
                      {buttonText4}
                    </button>

                    <button
                      id="KanjiButton"
                      onClick={() => {
                        goodJob2(buttonText5 === currentRandomKanji.kanji);
                        playSound();
                      }}
                    >
                      {buttonText5}
                    </button>

                    <button
                      id="KanjiButton"
                      onClick={() => {
                        goodJob2(buttonText6 === currentRandomKanji.kanji);
                        playSound();
                      }}
                    >
                      {buttonText6}
                    </button>
                    <p></p>
                    <p>{currentScore}</p>
                  </div>
                </>
              )}
              {
                //if gameOver=true then its game over
              }
              {gameOver && (
                <div className={darkTheme ? "GameOver-dark" : "GameOver-light"}>
                  <h1>Game Over</h1>
                  <p>
                    {
                      //score
                    }
                    {currentScore} / {randomKanjis.length}
                  </p>
                  <button id="refresh" onClick={() => {
                    refreshPage();
                    playSound();
                  }}>
                    Play Again
                  </button>
                </div>
              )}
              {
                //Own study time
              }

              {!gameOver && play && ownStudy && (
                <>
                  <div
                    className={darkTheme ? "GameOver-dark" : "GameOver-light"}
                  >
                    <h2>Your own Library</h2>

                    <p></p>
                    {
                      //kanji on page
                    }

                    <p></p>
                    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Front:
          <input type="text" name="front" required />
        </label>
        <label>
          Back:
          <input type="text" name="back" required />
        </label>
        <button type="submit">Add card</button>
      </form>
      <StudySession cards={cards} />
    </div>
                    <button id="refresh" onClick={() => {
                    refreshPage();
                    playSound();
                  }}>
                    Go back
                  </button>
                  <p></p>
                  </div>
                </>
              )}



            </body>
          </>
        </header>
      </div>
    </div>
  );
}
