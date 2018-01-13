//Cubic Hermite Interpolation for Vector3
//Ported from: https://github.com/empyreanx/godot-snapshot-interpolation-demo
let CherpedVector3 = (function (bt = 0.15) {
  const BUFFERING = 0;
  const PLAYING = 1;

  let initialized = false;
  let set = false;
  let state = BUFFERING;
  let buffer = [];
  let bufferTime = bt;
  let time = 0;
  let mark = 0;
  let lastPosition = new THREE.Vector3();
  let lastVelocity = new THREE.Vector3();
  let lastTime = 0.0;
  let target = new THREE.Vector3();

  function hermite(t, p1, p2, v1, v2) {
    const t2 = t * t;
    const t3 = t * t * t;
    const a = 2*t3 - 3*t2 + 1;
    const b = -2*t3 + 3*t2;
    const c = t3 - 2*t2 + t;
    const d = t3 - t2;

    let retVector = new THREE.Vector3();
    retVector.add(p1.clone().multiplyScalar(a));
    retVector.add(p2.clone().multiplyScalar(b));
    retVector.add(v1.clone().multiplyScalar(c));
    retVector.add(v2.clone().multiplyScalar(d));
    return retVector;
  }

  return {
    isSet: function() {
      return set;
    },

    reset: function() {
      initialized = false;
      set = false;
      state = BUFFERING;
      buffer = [];
      bufferTime = bt;
      time = 0;
      mark = 0;
      lastPosition = new THREE.Vector3();
      lastVelocity = new THREE.Vector3();
      lastTime = 0.0;
      target = new THREE.Vector3();
    },

    setTarget: function(target, velocity) {
      buffer.push({target: target, vel: velocity, time: time})
    },

    update: function(delta) {
      if (state == BUFFERING) {
        if (buffer.length > 0 && !initialized) {
          lastPosition = buffer[0].target;
          lastVelocity = buffer[0].vel;
          lastTime = buffer[0].time;
          initialized = true;
          buffer.shift();
        }

        if (buffer.length > 0 && initialized && time > bufferTime) {
          state = PLAYING;
        }
      } else if (state == PLAYING) {

        //Purge buffer of expired frames
        while (buffer.length > 0 && mark > buffer[0].time) {
          lastPosition = buffer[0].target;
          lastVelocity = buffer[0].vel;
          lastTime = buffer[0].time;
          buffer.shift();
        }
        
        if (buffer.length > 0 && buffer[0].time > 0) {
          const delta_time = buffer[0].time - lastTime;
          const alpha = (mark - lastTime) / (delta_time);
          
          //Use cubic Hermite interpolation to determine position
          target = hermite(alpha, lastPosition, buffer[0].target, 
          lastVelocity.multiplyScalar(delta_time), buffer[0].vel.multiplyScalar(delta_time))
          set = true;
        }

         mark += delta;
      }

      if (initialized)
        time += delta;
    },

    getCurrentTarget: function() {
      return target;
    }
  };

});
