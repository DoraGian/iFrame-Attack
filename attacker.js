var runs = [];
var FPS_first_sec = 0;
var FPS_second_sec = 0;
var FPS_third_sec = 0;

function createRunFunction(description, source, prevFunction) {

  var fun = function() {

    console.log("then executed for "+description)
    var timeStamps = [];
    // !!!!!!!!!
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
