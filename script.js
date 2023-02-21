console.log("Hii Welcome to Spotify Clone");

var header = document.querySelector('.header');
var musicImage = document.querySelector('.music-image');
var musicName = document.querySelector('.music-name');
var musicArtist = document.querySelector('.music-artist');

var currTime = document.querySelector('.curr-time');
var timeRange = document.querySelector('.time-range');
var totalTime = document.querySelector('.total-time');
var volume = document.querySelector('.volume');
var playPauseBtn = document.querySelector('.play-pause-btn');
var selectTrack = document.querySelector('.select-track');

let index = 0;
let isPlaying = false;
let timer;

let curr_track = document.createElement('audio');

const track_list = [
    {
        url: 'songs/Jhoome Jo Pathaan(PagalWorld.com.se).mp3',
        name: 'Jhoome Jo Pathan',
        artist: 'Arjit Singh',
        image: 'images/pathan.jpg'
    },
    {
        url: 'songs/Raatan Lambiyan(PagalWorld.com.se).mp3',
        name: 'Raatan Lambiyan',
        artist: 'Jublin Nautiyal',
        image: 'images/ratan.jpg'
    },
    {
        url: 'songs/Ranjha--Shershaah(PagalWorldl).mp3',
        name: 'Ranjha',
        artist: 'B Praak',
        image: 'images/ranjha.jpg'
    },
    {
        url: 'songs/Lut Gaye - Jubin Nautiyal.mp3',
        name: 'Lut Gaye',
        artist: 'Jublin Nautiyal',
        image: 'images/lutgaye.jpg'
    },
    {
        url: 'songs/Company(PagalWorld.com.se).mp3',
        name: 'Company',
        artist: 'Emiway Bantain',
        image: 'images/company.jpg'
    },
    {
        url: 'songs/320kbps_TZH 2017 - Swag Se Swagat.mp3',
        name: 'Swag Se Swagat',
        artist: 'Vishal Dalhani',
        image: 'images/tiger.jpg'
    },
    {
        url: 'songs/Jai Jai Shivshankar - War 128 Kbps.mp3',
        name: 'Jai Jai Shiv Shankar',
        artist: 'Benny Dayal',
        image: 'images/war.jpg'
    },
    {
        url: 'songs/Jhootha.mp3',
        name: 'Jhootha',
        artist: 'Emiway Bantai',
        image: 'images/jootha.jpg'
    },
    {
        url: 'songs/Kaha Par Hu.mp3',
        name: 'Kaha Par Hu',
        artist: 'Emiway Bantai',
        image: 'images/kaha.jpg'
    },
    {
        url: 'songs/No Love.mp3',
        name: 'No Love',
        artist: 'Emiway Bantai',
        image: 'images/nolove.jpg'
    },
    {
        url: 'songs/Bantai Ki Public.mp3',
        name: 'Bantai Ki Public',
        artist: 'Emiway Bantai',
        image: 'images/public.jpg'
    },
    {
        url: 'songs/Malum Hai Na.mp3',
        name: 'Malum Hai Na',
        artist: 'Emiway Bantai',
        image: 'images/malum.jpg'
    },
]

const resetValues = () => {
    isPlaying = false;
    currTime.innerText = '00 : 00';
    totalTime.innerText = '00 : 00';
}

const updateTime = () => {
    let pos = curr_track.currentTime * (100 / curr_track.duration);
    timeRange.value = pos

    let currMins = Math.floor(curr_track.currentTime / 60);
    let currSecs = Math.floor(curr_track.currentTime - currMins * 60);
    let durMins = Math.floor(curr_track.duration / 60);
    let durSecs = Math.floor(curr_track.duration - durMins * 60);

    if (currMins < 10) currMins = '0' + currMins;
    if (currSecs < 10) currSecs = '0' + currSecs;
    if (durMins < 10) durMins = '0' + durMins;
    if (durSecs < 10) durSecs = '0' + durSecs;

    currTime.innerHTML = `${currMins} : ${currSecs}`;
    totalTime.innerHTML = `${durMins} : ${durSecs}`;

    if (curr_track.ended) nextTrack();
}

const loadTrack = (i) => {
    clearInterval(timer)
    resetValues();

    curr_track.src = track_list[i].url;
    curr_track.load();

    musicImage.style.backgroundImage = `url(${track_list[i].image})`;
    musicName.innerText = track_list[i].name;
    musicArtist.innerText = track_list[i].artist;
    header.textContent = `Playing ${i + 1} of ${track_list.length}`

    timer = setInterval(updateTime, 1000);
}

loadTrack(index);

const prevTrack = () => {
    index > 0 ? index -= 1 : index = 0;
    loadTrack(index);
    playTrack();
}

const nextTrack = () => {
    index < track_list.length - 1 ? index += 1 : alert('No More Tracks');
    loadTrack(index);
    playTrack();
}

const playPauseTrack = () => {
    if (!isPlaying) playTrack()
    else pauseTrack();
}

const playTrack = () => {
    curr_track.play();
    isPlaying = true;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
}

const pauseTrack = () => {
    curr_track.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
}

const changeTime = () => {
    let val = Math.floor(timeRange.value / 100 * curr_track.duration);
    console.log(Math.floor(timeRange.value), val);
    curr_track.currentTime = val;
}

const changeVolume = () => {
    let val = volume.value;
    curr_track.volume = val / 100;
}

const fillMenu = () => {
    selectTrack.length = track_list.length;
    track_list.map((e, i) => {
        selectTrack.options[i].text = e.name
    })
}

fillMenu();

const setTrack = () => {
    let i = selectTrack.selectedIndex;
    loadTrack(i);
    playTrack();
}