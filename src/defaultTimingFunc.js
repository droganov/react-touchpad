const circ = timeFraction => 1 - Math.sin(Math.acos(timeFraction));
const makeEaseOut = ease => timeFraction => 1 - ease(1 - timeFraction);

export default makeEaseOut(circ);
