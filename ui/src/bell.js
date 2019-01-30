// Must create AudioContext() only after user guesture on page
// https://goo.gl/7K7WLu
let context;
let bellChimingBuffer = null;

// https://freesound.org/people/fauxpress/sounds/42095/
// Modded to remove gap before start of ring
const request = new XMLHttpRequest();
const url = '/42095__fauxpress__bell-meditation_modded.mp3';
request.open('GET', url, true);
request.responseType = 'arraybuffer';
request.send();

function playChime() {
  const source = context.createBufferSource();
  source.buffer = bellChimingBuffer;
  source.connect(context.destination);
  source.start();
}

export default function chime() {
  if (context) {
    playChime();
  } else {
    context = new AudioContext();
    context.decodeAudioData(request.response, function(buffer) {
      bellChimingBuffer = buffer;
      playChime();
    }, () => console.log('Could not load ' + url));
  }
}
