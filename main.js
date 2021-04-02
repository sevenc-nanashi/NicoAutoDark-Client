console.log("Niconico DarkMode: Flipper")

window.addEventListener("load", () => {
    newNode = document.createElement("script")
    newContent = document.createTextNode(`
function sort_floats(a, b){
    return a - b
}
function update_screen(){
    time = window.__videoplayer._lastCurrentTime
    fil = frame.filter((k, i) => {
        return k <= time
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

function update_seekbar(){
    ra = ""
    duration = __videoplayer._lastDuration
    frame.forEach((e,i)=>{
        ra += \`
        <span style="background:\` + (i % 2 == 0 ? "#111" : "white") + \`;position:absolute;height:4px;top:0px;left:\` + (e / duration * 100).toString() + \`%;right:\` + (100 - (frame[i+1] / duration * 100)).toString() + \`%">
        </span>
        \`
    })
    document.getElementById("white_and_black").innerHTML = ra
}
if((typeof variable === 'undefined') || frame_for != location.pathname){
    frame = []
}else if (frame){
    intv3 = setInterval(()=>{
        if((!document.getElementById("white_and_black")) || (!__videoplayer._lastDuration)|| (!frame)){return}
        update_seekbar()
        clearInterval(intv3)
    },10)
}

function switch_and_record(k){
    if(k.key=="t"){
        frame.push(__videoplayer._lastCurrentTime)
        frame.sort(sort_floats)
        update_screen()
        update_seekbar()
    }else if(k.key=="b"){
        fil = frame.filter((k, i) => {
            return k <= __videoplayer._lastCurrentTime
        })
        f = fil.pop()
        frame = frame.filter(n => n !== f);
        frame.sort(sort_floats)
        update_screen()
        update_seekbar()
    }
}
document.addEventListener("keypress", switch_and_record)

intv = setInterval(()=>{
    if(!__videoplayer._lastDuration){return}
    if (document.querySelector(".UadView > audio[src]")) {
        per = (10 / (__videoplayer._lastDuration + 10)) * 100
    } else {
        per = 0
    }
    document.getElementById("white_and_black").style.right = per + "%"
    clearInterval(intv)
}, 10)
setInterval(update_screen, 10)
function submit_data(){
    var oReq = new XMLHttpRequest()
    oReq.onreadystatechange = ()=>{
        if(oReq.readyState !== 4 ){ return }
        switch (oReq.status) {
            case 429:
                document.querySelector("#kff_error_view").innerText = "アップロードは5分に1度しかできません。"
                break
            case 403:
                document.querySelector("#kff_error_view").innerText = "パスワードが違います。"
                break
            default:
                console.log(Math.floor(oReq.status / 100))
                if(Math.floor(oReq.status / 100) == 2){
                    document.querySelector("#kff_success_view").innerText = "正常にアップロードされました。反映には時間がかかる場合があります。"
                }else{
                    document.querySelector("#kff_error_view").innerText = "不明なエラーが発生しました。"
                }
        }
    }
    document.querySelector("#kff_error_view").innerText = ""
    document.querySelector("#kff_success_view").innerText = ""
    oReq.open("POST", "https://NicoAutoDark.sevencnanashi.repl.co/" + location.pathname.split("/").pop())
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(JSON.stringify({"userid": userId,"name": document.querySelector("#kff_username").value, "pass": document.querySelector("#kff_password").value, "frame": frame}))
}
intv2 = setInterval(()=>{
    if(!document.querySelector(".nicodark-setting-menupanel")){return}
    document.querySelector(".nicodark-setting-menupanel").innerHTML += \`
    <div>
        <h3 style="text-align: center;">
            Keyframed Flipper
        </h3>
        <p style="margin: auto;display: block;width: 80%;">
            <span style="background: #8884;padding: 1px 4px;border-radius: 4px;">T</span> to add keyframe<br>
            <span style="background: #8884;padding: 1px 4px;border-radius: 4px;">B</span> to remove keyframe
        </p>
        <div style="text-align: center;">
            <input type="password" style="height: 20px;border-radius: 4px;" placeholder="パスワード" id="kff_password">
            <input type="textbox" style="height: 20px;border-radius: 4px;" placeholder="名前" id="kff_username"><br>
            <input type="button" style="display: inline;height: 20px;line-height: 20px;padding: 0px 16px;" onclick="submit_data()" value="投稿">
            <p style="color: #4f4;text-align: center;" id="kff_success_view"></p>
            <p style="color: #f44;text-align: center;" id="kff_error_view"></p>
        </div>
    </div>\`
    clearInterval(intv2)
}, 10)
var oReq = new XMLHttpRequest()
oReq.addEventListener("load", reqListener)
oReq.open("GET", "https://NicoAutoDark.sevencnanashi.repl.co/" + location.pathname.split("/").pop())

function reqListener() {
    // console.log(this, this.status)
    if (this.status !== 200) { return }
    resp = JSON.parse(this.responseText)
    flipKeyframe = resp.flip
    newNode = document.createElement("script")
    newContent = document.createTextNode(\`
        frame = [\` + flipKeyframe.toString() + \`]
        frame_for = location.pathname
        update_seekbar()
    \`)
    newNode.appendChild(newContent)
    document.body.appendChild(newNode)
}
oReq.send()
`)
    newNode.appendChild(newContent)

    newNodeSeek = document.createElement("div")
    newNodeSeek.setAttribute("id", "white_and_black")
    newNodeSeek.setAttribute("style", "position: absolute;top: 4px;left:0;right:0;height:4px;background:#222;")
    document.querySelector(".SeekBar").appendChild(newNodeSeek)
    document.body.appendChild(newNode)
})