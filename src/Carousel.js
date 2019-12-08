/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.legth) {
      photos = media.map(({ large }) => large);
    }
    console.log(photos);
    return { photos };
  }

  // new way. arrow functin do not cerate a new context. USE ARROW FUNTIONS FOR EVENT LISTNERs
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index // + turns it into a number
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
