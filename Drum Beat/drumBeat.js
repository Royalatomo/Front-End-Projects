
window.onload = () => {   
    document.querySelectorAll('.img-div')[0].addEventListener('click', () => {show('w')});    
    document.querySelectorAll('.img-div')[1].addEventListener('click', () => {show('a')});    
    document.querySelectorAll('.img-div')[2].addEventListener('click', () => {show('s')});    
    document.querySelectorAll('.img-div')[3].addEventListener('click', () => {show('d')});    
    document.querySelectorAll('.img-div')[4].addEventListener('click', () => {show('j')});    
    document.querySelectorAll('.img-div')[5].addEventListener('click', () => {show('k')});    
    document.querySelectorAll('.img-div')[6].addEventListener('click', () => {show('l')});    
}

playSong = (songName) => {
    let song = '';
    song = new Audio(songName)
    song.play();
}

show = (keyInput) => {
    switch (String(keyInput).toLowerCase()) {
        case ("w" || 1):
            playSong('./sounds/tom-1.mp3')
            blinkImg('.img1')
            break;

        case "a" || 2:
            playSong('./sounds/tom-2.mp3')
            blinkImg('.img2')
            break;

        case "s" || 3:
            playSong('./sounds/tom-3.mp3')
            blinkImg('.img3')
            break;

        case "d" || 4:
            playSong('./sounds/tom-4.mp3')
            blinkImg('.img4')
            break;

        case "j" || 5:
            playSong('./sounds/snare.mp3')
            blinkImg('.img5')
            break;

        case "k" || 6:
            playSong('./sounds/crash.mp3')
            blinkImg('.img6')
            break;

        case "l" || 7:
            playSong('./sounds/kick-bass.mp3')
            blinkImg('.img7')
            break;

    }
}


blinkImg = (idClass) => {
    document.querySelector(idClass).classList.add('img-active');
    setTimeout(() => {
        document.querySelector(idClass).classList.remove('img-active');
    }, 100)
}

// playSong('../mp3/drum/crash.mp3')
document.addEventListener('keydown', (e) => {
    show(e.key);
})
