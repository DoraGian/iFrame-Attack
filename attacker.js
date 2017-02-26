var runs = [];

function createRunFunction(description, source, prevFunction) {

  var fun = function() {

    console.log("then executed for "+description)
    var timeStamps = [];
    // !!!!!!!!!
    var FPS_first_sec = [];
    var FPS_second_sec = [];
    var FPS_third_sec = [];
    var FPS_fourth_sec = [];
    var FPS_fifth_sec = [];
    var FPS_sixth_sec = [];
    var framesArray = [];
    // start timer
    var startTimeMillisec = performance.now();

    function render(now) {

      //
      var passingTime = performance.now();
      var timeOfOneFrame = passingTime - startTimeMillisec;

      framesArray.push(passingTime - startTimeMillisec);

      timeStamps.push(now);

      if (now - timeStamps[0] < 3000) {

          requestAnimationFrame(render);
      }
      else {
        var ts2 = [];

        for (var i = 0; i< timeStamps.length; ++i) {

          ts2.push(timeStamps[i] - timeStamps[i-1]);
        }

        console.log("finished run "+description)
        runs.push({description: description, values: ts2});
        setTimeout(fun.nextFunc, 100);

        console.log('!!! !!! TOTAL Frames : ', description, "  :", framesArray.length-1);

        var i;
        for (i = 0; i < framesArray.length; i++) {
          if (!(Math.floor(framesArray[i]) >= 1010)) {
            FPS_first_sec.push(framesArray[i]);
          }
          else if (Math.floor(framesArray[i]) > 1010 && !(Math.floor(framesArray[i]) >= 2010)) {
            FPS_second_sec.push(framesArray[i]);
          }
          else if (Math.floor(framesArray[i]) > 2010 /*&& !(Math.floor(framesArray[i]) >= 3010)*/) {
            FPS_third_sec.push(framesArray[i]);
          }
          // else if (Math.floor(framesArray[i]) > 3000 && !(Math.floor(framesArray[i]) >= 4000)) {
          //   FPS_fourth_sec.push(framesArray[i]);
          // }
          // else if (Math.floor(framesArray[i]) > 4000 && !(Math.floor(framesArray[i]) >= 5000)) {
          //   FPS_fifth_sec.push(framesArray[i]);
          // }
          // else if (Math.floor(framesArray[i]) > 5000 && !(Math.floor(framesArray[i]) >= 6000)) {
          //   FPS_sixth_sec.push(framesArray[i]);
          // }
        }
        console.log('!!! !!! 1st second : ', description, " total frames :", FPS_first_sec.length-1, (Math.floor(FPS_first_sec[FPS_first_sec.length-1])));
        console.log('!!! !!! 2nd second : ', description, " total frames :", FPS_second_sec.length, (Math.floor(FPS_second_sec[FPS_second_sec.length-1])));
        console.log('!!! !!! 3rd second : ', description, " total frames :", FPS_second_sec.length, (Math.floor(FPS_third_sec[FPS_third_sec.length-1])));
        // console.log('!!! !!! 4th second : ', description, " total frames :", FPS_fourth_sec.length, FPS_fourth_sec[length-1]);
        // console.log('!!! !!! 5th second : ', description, " total frames :", FPS_fifth_sec.length, FPS_fifth_sec[length-1]);
        // console.log('!!! !!! 6th second : ', description, " total frames :", FPS_sixth_sec.length, FPS_sixth_sec[length-1]);
        // console.log('!!!  1st ARRAY', FPS_first_sec);
        // console.log('!!!  2nd ARRAY', FPS_second_sec);
        // console.log('!!!  3rd ARRAY', FPS_third_sec);
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

      var p1 = createRunFunction("1. simple", "text.html");
      var p2 = createRunFunction("2. simple", "text.html", p1);
      var p3 = createRunFunction("3. simple", "text.html", p2);
      var p4 = createRunFunction("4. simple", "text.html", p3);
      var p5 = createRunFunction("5. simple", "text.html", p4);
      var p6 = createRunFunction("6. simple", "text.html", p5);

      // var p1 = createRunFunction("1. complex", "iframes.html");
      // var p2 = createRunFunction("2. complex", "iframes.html", p1);
      // var p3 = createRunFunction("3. complex", "iframes.html", p2);
      // var p4 = createRunFunction("4. complex", "iframes.html", p3);
      // var p5 = createRunFunction("5. complex", "iframes.html", p4);
      // var p6 = createRunFunction("6. complex", "iframes.html", p5);

      // var p1 = createRunFunction("1. complex", "examplePages/gif.html");
      // var p2 = createRunFunction("2. complex", "examplePages/gif.html", p1);
      // var p3 = createRunFunction("3. complex", "examplePages/gif.html", p2);
      // var p4 = createRunFunction("4. complex", "examplePages/gif.html", p3);
      // var p5 = createRunFunction("5. complex", "examplePages/gif.html", p4);
      // var p6 = createRunFunction("6. complex", "examplePages/gif.html", p5);

      // var p1 = createRunFunction("1. complex", "https://www.facebook.com/");
      // var p2 = createRunFunction("2. complex", "https://www.facebook.com/", p1);
      // var p3 = createRunFunction("3. complex", "https://www.facebook.com/", p2);
      // var p4 = createRunFunction("4. complex", "https://www.facebook.com/", p3);
      // var p5 = createRunFunction("5. complex", "https://www.facebook.com/", p4);
      // var p6 = createRunFunction("6. complex", "https://www.facebook.com/", p5);
      p6.nextFunc = dumpCsv;
      p1();
    }, 100);
  })
})
