var runs = [];

function createRunFunction(description, source, prevFunction) {

  var fun = function() {

    console.log("then executed for "+description)
    var timeStamps = [];
    // !!!!!!!!!
    var FPS_first_sec = [];
    var FPS_second_sec = [];
    var FPS_third_sec = [];
    var framesArray = [];
    var startTimeMillisec = performance.now();

    function render(now) {

      var passingTime = performance.now();
      var timeOfOneFrame = passingTime - startTimeMillisec;

      framesArray.push(passingTime - startTimeMillisec);
      //console.log('!!! Frames : ', framesArray.length);

      timeStamps.push(now);

      if (now - timeStamps[0] < 5000) {

          requestAnimationFrame(render);
      }
      else {
        var ts2 = [];

        for (var i = 1; i< timeStamps.length; ++i) {

          ts2.push(timeStamps[i] - timeStamps[i-1]);
        }

        console.log("finished run "+description)
        runs.push({description: description, values: ts2});
        setTimeout(fun.nextFunc, 100);

        console.log('!!! !!! FINAL Frames : ', description, " total frames :", framesArray.length);

        var i;
        for (i = 0; i < framesArray.length; i++) {
          if (!(Math.floor(framesArray[i]) >= 1000)) {
            FPS_first_sec.push(framesArray[i]);
          }
          else if (Math.floor(framesArray[i]) > 1000 && !(Math.floor(framesArray[i]) >= 2000)) {
            FPS_second_sec.push(framesArray[i]);
          }
          else if (Math.floor(framesArray[i]) > 2000 && !(Math.floor(framesArray[i]) >= 3000)) {
            FPS_third_sec.push(framesArray[i]);
          }
        }
        console.log('!!! !!! 1st second : ', description, " total frames :", FPS_first_sec.length);
        console.log('!!! !!! 2nd second : ', description, " total frames :", FPS_second_sec.length);
        console.log('!!! !!! 3rd second : ', description, " total frames :", FPS_third_sec.length);
      }
    }
    requestAnimationFrame(render);
    var iArea = document.getElementById("iframearea");
    iArea.innerHTML = '';
    var iframe = document.createElement('iframe');
    iframe.src = source;
    iframe.width = "1000";
    iframe.height = "1000";
    iArea.appendChild(iframe);
};

  if (prevFunction) {
    prevFunction.nextFunc = fun;
  }
  return fun;
}

function dumpCsv() {
  var out = "";
  for(var run in runs) {
      run = runs[run];
      out += run.description;
      out += ";";
      out += run.values.join(";")
      out += "\n";

  }
  document.getElementById("dumparea").value = out;
}

window.addEventListener("load", function() {

  var iframebtn = document.getElementById('iframebtn')
  iframebtn.addEventListener("click", function() {

    iframebtn.parentNode.removeChild(iframebtn);
    setTimeout(function() {

      var p1 = createRunFunction("1. simple", "login.html");
      var p2 = createRunFunction("2. simple", "login.html", p1);
      var p3 = createRunFunction("3. simple", "login.html", p2);
      var p4 = createRunFunction("4. simple", "login.html", p3);
      var p5 = createRunFunction("5. simple", "login.html", p4);
      var p6 = createRunFunction("6. simple", "login.html", p5);

      // var p1 = createRunFunction("1. complex", "iframes.html");
      // var p2 = createRunFunction("2. complex", "iframes.html", p1);
      // var p3 = createRunFunction("3. complex", "iframes.html", p2);
      // var p4 = createRunFunction("4. complex", "iframes.html", p3);
      // var p5 = createRunFunction("5. complex", "iframes.html", p4);
      // var p6 = createRunFunction("6. complex", "iframes.html", p5);
      p6.nextFunc = dumpCsv;
      p1();
    }, 100);
  })
})
