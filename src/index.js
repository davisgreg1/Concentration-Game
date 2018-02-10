/* global flipACard, shuffleCards */
import styles from "./index.css";
const React = require("react");
const ReactDom = require("react-dom");

class DisplayBackOfAllCards extends React.Component {
  render() {
    const { values, handleImageClick } = this.props;
    const displayValues = [...values];

    return (
      <div className="cardHolder">
        <div className="cardDiv">
          {displayValues.map(cardName => (
            <img
              src={`https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/back.png`}
              onClick={handleImageClick}
              // id={index + 1}
              alt={cardName}
              name={cardName}
            />
          ))}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.cards = [
      "apple",
      "apple",
      "camera",
      "camera",
      "clover",
      "clover",
      "coffee",
      "coffee",
      "heart",
      "heart",
      "key",
      "key",
      "paw",
      "paw",
      "smiley",
      "smiley",
      "snowflake",
      "snowflake",
      "star",
      "star"
    ];

    this.shuffleCards(this.cards);

    this.state = {
      firstCard: "",
      matches: 0
    };
  }

 flipACard = e => {
    const { firstCard } = this.state;
    const backOfCard = `https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/back.png`;

    // first card
    if (!firstCard) {
      e.target.src = `https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/${e
        .target.name}.png`;
      this.setState({
        firstCard: e.target
      });
    } else {
      // second card
      e.target.src = `https://raw.githubusercontent.com/C4Q/AC_4_Web/master/units/react/exercises/objects_and_arrays/cards/${e
        .target.name}.png`;
      // if card are not equal
      if (e.target.name !== firstCard.name) {
        document.querySelector("body").style.pointerEvents = "none";

        // need this const for setTimeout because e on ln 79 no longer exists
        const event = e.target;
        setTimeout(() => {
          event.src = backOfCard;
          firstCard.src = backOfCard;
          document.querySelector("body").style.pointerEvents = "auto";
        }, 1000);
      } else {
        this.setState({
          matches: this.state.matches += 1
        })
      } if(this.state.matches === 10){
        this.shuffleCards(this.cards)
      }
      this.setState({
        firstCard: ""
      });
    }
  };

 shuffleCards = array => {
    var i = 0,
      j = 0,
      temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // componentDidMount() {
  // this.shuffleCards(this.cards)
  // this.flipACard
  // }

  render() {
    console.log("the state is:", this.state);
    //  console.log("the current card src is: ", this.state.currentCard)
    return (
      <div className="main">
        <div className="flex-container">
          <DisplayBackOfAllCards
            values={this.cards}
            handleImageClick={this.flipACard}
          />
        </div>

        <div>
          {/* <button onClick={forceUpdate()}>RESET</button> */}
        </div>
      </div>
    );
  }
}
ReactDom.render(<App />, document.getElementById("root"));
