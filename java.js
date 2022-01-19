const playMusic = document.querySelector('.fa-pause')
const getAudio = document.querySelector('audio')
const playOrPause = document.querySelector('.playOrPause')
const imgSpin = document.querySelector('img')

playMusic.onclick = function(){
    if (getAudio.duration > 0 && !getAudio.paused){
        getAudio.pause()
        imgSpin.style.animation = ''
        playOrPause.classList.add('fa-pause')
        playOrPause.classList.remove('fa-play')
    } else {
        getAudio.play()
        line()
        linePosition()
        imgSpin.style.animation = 'spin 50s linear infinite'
        playOrPause.classList.remove('fa-pause')
        playOrPause.classList.add('fa-play')
    }
}

// add list music
var getFooter = document.querySelector('.footer')
    getFooter.innerHTML = `
        <div class="listMusic random0">
            31072-DuonggNauWn-MP3
        </div>
        <div class="listMusic random1">
            DeVuong-DinhDungACV-MP3
        </div>
        <div class="listMusic random2">
            SaiGonDauLongQua-HuaKimTuyenHoangDuyen-MP3
        </div>
        <div class="listMusic random3">
            TheLuong-PhucChinh-MP3
        </div>
        <div class="listMusic random4">
            ThucGiac-DaLAB-MP3
        </div>
    `
// add current music
var getClickMusic = document.querySelectorAll('.listMusic')
var currentHeading = document.querySelector('.heading')
var currentImg = document.querySelector('img')
for (var i = 0; i < getClickMusic.length; ++i) {
    const click = getClickMusic[i]
    const index = i
    click.addEventListener('click',function(e) {
        currentHeading.removeChild(currentHeading.childNodes[0])
        currentHeading.innerHTML = click.innerText
        currentImg.src=`/music-player/img/${index}.jpg`
        getAudio.src=`/music-player/music/${index}.mp3`
        //pause Audio 
        getAudio.pause()
        playOrPause.classList.add('fa-pause')
        playOrPause.classList.remove('fa-play')
    })
}


// tua audio
const getLine = document.querySelector('.progress')
function line() {
    getLine.addEventListener('click',function(e) {
        var percent = +getLine.value / 250
        return getAudio.currentTime = percent * getAudio.duration
    })
}
function linePosition () {
    getAudio.onplay = function() {
        setInterval(function() {
            randomOrNot()
            repeatOrNot()
            var percent = getAudio.currentTime / getAudio.duration
            return getLine.value = percent * 250
        },1000)
    }
}

// repeat and forward
const repeat = document.querySelector('.fa-redo')
var clicked = false
repeat.onclick = function() {
    if (clicked) {
        repeat.style.color = '#000'
        return clicked = false
    }
    else {
        repeat.style.color = 'coral'
        checked = false
        random.style.color = '#000'
        return clicked = true
    }
}
function repeatOrNot() {
    if (clicked) {getAudio.loop = true}
    else {getAudio.loop = false} 
}

const random = document.querySelector('.fa-random')
var checked = false
random.onclick = function(e) {
    if (checked) {
        random.style.color = '#000'
        return checked = false
    } else {
        random.style.color = 'coral'
        clicked = false
        repeat.style.color = '#000'
        return checked = true
    }
}
function randomMusic() {
    var rNumber = Math.floor(Math.random()*4)
    currentHeading.removeChild(currentHeading.childNodes[0])
    currentHeading.innerHTML = document.querySelector(`.random${rNumber}`).innerText
    currentImg.src=`/music-player/img/${rNumber}.jpg`
    getAudio.src=`/music-player/music/${rNumber}.mp3` 
    getAudio.play()
}
function randomOrNot() {
    if (getAudio.ended == true && checked) {
        return randomMusic()
    }
}

const forward = document.querySelector('.fa-fast-forward')
forward.onclick = () => {
    return getAudio.currentTime += 20
}

const backward = document.querySelector('.fa-fast-backward')
backward.onclick = () => {
    return getAudio.currentTime -= 20
}
