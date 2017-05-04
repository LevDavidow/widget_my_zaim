import React, {Component} from 'react';

import './slider.css';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.addDomSlider = this.addDomSlider.bind(this);

    this.onSlideHandler = this.onSlideHandler.bind(this);
  }
  addDomSlider(node) {
    this.domSlider = node;
  }
  onSlideHandler(e) {
    this.props.onSlide(+e.target.value);
  }
  componentDidMount() {
    this.domSlider.addEventListener('change', this.onSlideHandler);
    this.domSlider.addEventListener('input', this.onSlideHandler);
  }
  componentWillUnMount() {
    this.domSlider.removeEventListener('change', this.onSlideHandler);
    this.domSlider.removeEventListener('input', this.onSlideHandler);
  }
  render() {
    const {current, min, max} = this.props;

    const percentage = ((current - min) * 100) / (max - min);

    return (
      <div className="slider__wrapper">
        <div className="slider__inner" >
          <div className="slider__progerss" style={{backgroundSize: `${percentage}% 100% `}} />
          <input
                defaultValue={current}
                type="range"
                min={min}
                max={max}
                step={1000}
                ref={this.addDomSlider}
                className="slider"/>
        </div>
        <div className="slider__label slider__label_max">{max}</div>
        <div className="slider__label slider__label_min">{min}</div>
      </div>
    );
  }
}

/*<InputRange
        step={1000}
        maxValue={max}
        minValue={min}
        value={this.props.current}
        onChange={this.onSlideHandler}
      />*/

Slider.defaultProps = {
};

export default Slider;
