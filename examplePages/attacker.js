var runs = [];


function createRunFunction(description, source, prevFunction) {
    var fun = function(){
        console.log("then executed for "+description)
        var timeStamps = [];
        function render(now){
            timeStamps.push(now)
            if(now - timeStamps[0] < 3000)
                requestAnimationFrame(render);
            else{
                var ts2 = [];
                for(var i = 1; i< timeStamps.length; ++i){
                    ts2.push(timeStamps[i] - timeStamps[i-1]);
                }
                console.log("finished run "+description)
                runs.push({description: description, values: ts2});
                setTimeout(fun.nextFunc, 100);
            }
        }
        requestAnimationFrame(render);
        var iArea = document.getElementById("iframearea");
        iArea.innerHTML = '';
        var iframe = document.createElement('iframe');
        iframe.src = source;
        iframe.width = "500";
        iframe.height = "700";
        iArea.appendChild(iframe);
    };
    if (prevFunction)
        prevFunction.nextFunc = fun;
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
    iframebtn.addEventListener("click", function(){
        iframebtn.parentNode.removeChild(iframebtn);
        setTimeout(function(){
            var p1 = createRunFunction("1p.", "div-colors.html");
            var p2 = createRunFunction("2p.", "div-colors.html", p1);
            var p3 = createRunFunction("3p.", "div-colors.html", p2);
            var p4 = createRunFunction("4p.", "div-colors.html", p3);

            var p5 = createRunFunction("5p.", "div-colors.html", p4);
            var p6 = createRunFunction("6p.", "div-colors.html", p5);
            p6.nextFunc = dumpCsv;
            p1();
        }, 100);
    })
})
