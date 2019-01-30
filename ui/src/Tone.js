import React from 'react';

class Tone extends React.Component {

  constructor(props) {
    super(props);

    this.audioContext = props.audioContext || new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
    this.gain = this.audioContext.createGain();

    this.gain.gain.value = props.volume || 1;
    this.oscillator.frequency.value = props.frequency || 440;

    this.gain.connect(this.audioContext.destination);

    if (props.play) {
      this.oscillator.start();
      this.oscillator.connect(this.gain);
      this.isStarted = true;
    }

    if (props.length) {
      window.setTimeout(() => {
        // TODO, case where stopped like this and then started again?
        this.oscillator.disconnect(this.gain);
      }, props.length * 1000);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.play && this.props.play) {
      if (!this.isStarted) {
        this.oscillator.start();
        this.isStarted = true;
      }
      this.oscillator.connect(this.gain);
    }
    if (prevProps.play && !this.props.play) this.oscillator.disconnect(this.gain);

    if (prevProps.volume !== this.props.volume)
      this.gain.gain.value = this.props.volume;

    if (prevProps.frequency !== this.props.frequency)
      this.oscillator.frequency.value = this.props.frequency;
  }

  componentWillUnmount() {
    if (this.props.play)
      this.oscillator.disconnect(this.gain);
    if (this.isStarted)
      this.oscillator.stop();
  }

  render() {
    return null;
  }
}

export default Tone;
