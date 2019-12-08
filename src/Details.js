import React from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext"; // using context in classes is different
import Modal from "./Modal";

class Details extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: true
  //   };
  // }

  // --> Alternvative to cotr.becoming part of JS in 2019/2020. For now enable it in babel config. Check babel config and eslint parse portions and babel related packages
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        url: animal.url,
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false
      });
    }, console.error);
  }

  toggleModal = () => {
    console.log("AAAAAAAA");
    this.setState({
      showModal: !this.state.showModal
    });
  };

  adopt = () => navigate(this.state.url);

  // hooks cannot be used with classes
  render() {
    if (this.state.loading) {
      return <h1>Loading.........</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          {/* ThemeContext is from react context which is a gloabl state.See SearchParams.js for how to use
          global state in components exported as functions */}
          <ThemeContext.Consumer>
            {themeHook => (
              // ([theme]) for destructuring
              <button
                style={{ backgroundColor: themeHook[0] }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          {/* <button>Adopt {name}</button> */}
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>Adopt {name}? </div>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No, I am a monster</button>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// const Details = props => {
//   return (
//     <pre>
//       <code>{JSON.stringify(props, null, 4)}</code>
//     </pre>
//   );
// };

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
