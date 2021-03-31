function reqListener() {
    // console.log(this, this.status)
    if (this.status !== 200) { return }
    resp = JSON.parse(this.responseText)
    flipKeyframe = resp.flip
    newNode = document.createElement("script")
    newContent = document.createTextNode(`
        flipKeyframe = [${flipKeyframe}]
        setInterval(()=>{
            time = window.__videoplayer._lastCurrentTime
            fil = flipKeyframe.filter((k, i) => {
                return k < time
            })
            if (fil.length % 2 == 0) {
                if (document.body.classList.contains("niconico-darkmode-setting-true")) {
                    document.body.classList.remove("niconico-darkmode-setting-true")
                }
            } else {
                if (!document.body.classList.contains("niconico-darkmode-setting-true")) {
                    document.body.classList.add("niconico-darkmode-setting-true")
                }
            }
        }, 10)
    `)
    newNode.appendChild(newContent)
    document.body.appendChild(newNode)

}
console.log("Niconico DarkMode: Flipper")
var oReq = new XMLHttpRequest()
oReq.addEventListener("load", reqListener)
oReq.open("GET", "https://NicoAutoDark.sevencnanashi.repl.co/" + location.pathname.split("/").pop())
oReq.send()
window.addEventListener("load", () => {
    newNode = document.createElement("script")
    newContent = document.createTextNode(`
function sort_floats(a, b){
    return a - b
}
function update_screen(){
    fil = frame.filter((k, i) => {
        return k <= window.__videoplayer._lastCurrentTime
    })
    if (fil.length % 2 == 0) {
        if (document.body.classList.contains("niconico-darkmode-setting-true")) {
            document.body.classList.remove("niconico-darkmode-setting-true")
        }
    } else {
        if (!document.body.classList.contains("niconico-darkmode-setting-true")) {
            document.body.classList.add("niconico-darkmode-setting-true")
        }
    }
}
frame = []
function update_seekbar(){
    ra = ""
    duration = __videoplayer._lastDuration
    frame.forEach((e,i)=>{
        ra += '<span style="background:' + (i % 2 == 0 ? "#111" : "white") + ';position:absolute;height:4px;top:0px;left:' + (e / duration * 100).toString() + "%;right:" + (100 - (frame[i+1] / duration * 100)).toString() + '%"></span>'
    })
    document.getElementById("white_and_black").innerHTML = ra
}
function switch_and_record(k){
    if(k.key=="t"){
        frame.push(__videoplayer._lastCurrentTime)
        frame.sort(sort_floats)
        update_screen()
        update_seekbar()
    }else if(k.key=="b"){
        fil = frame.filter((k, i) => {
            return k < __videoplayer._lastCurrentTime
        })
        f = fil.pop()
        frame = frame.filter(n => n !== f);
        frame.sort(sort_floats)
        update_screen()
        update_seekbar()
    }
}
document.addEventListener("keypress", switch_and_record)
if (document.querySelector(".UadView > audio[src]")) {
    per = (10 / (__videoplayer._lastDuration + 10)) * 100
} else {
    per = 0
}
document.getElementById("white_and_black").style.right = per + "%"
`)

    newNode.appendChild(newContent)

    newNodeSeek = document.createElement("div")
    newNodeSeek.setAttribute("id", "white_and_black")
    newNodeSeek.setAttribute("style", "position: absolute;top: 4px;left:0;right:0;height:4px;background:#222;")
    document.querySelector(".SeekBar").appendChild(newNodeSeek)
    document.body.appendChild(newNode)
})