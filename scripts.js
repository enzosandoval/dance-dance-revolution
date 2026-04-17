const teamMembers = [
    { 
        nombre: "Mega Man 6 (NES) Music - Wily Battle", 
        materia: "Programación Estructurada", 
        cancion: "canciones/Mega Man 6 (NES) Music - Wily Battle.mp3", 
        foto: "images/1.png",
        dificultad: 5 
    },
    { 
        nombre: "Back To The China - Metal Slug 2", 
        materia: "Herramientas Informáticas II", 
        cancion: "canciones/Metal Slug 2  Back to the China.mp3", 
        foto: "images/2.jpg",
        dificultad: 7 
    },
    { 
        nombre: "Hidden Factory - Metal Slug 3", 
        materia: "Bases de Datos II", 
        cancion: "canciones/Metal Slug 3_ OST - Hidden factory.mp3", 
        foto: "images/3.jpg",
        dificultad: 8 
    },
    { 
        nombre: "Moskau - Dschinghis Khan", 
        materia: "Álgebra II", 
        cancion: "canciones/Dschinghis Khan - Moskau LEGENDADO.mp3", 
        foto: "images/4.jpg",
        dificultad: 10 
    },
    { 
        nombre: "I Am Willing to Be By Your Side - Wang Qiqi", 
        materia: "Programación Orientada a Objetos", 
        cancion: "canciones/Em nguyn lm mt ngi bnh thng bn cnh anh remix _Nhc hot Tik Tok Trung Quc __ TM.mp3", 
        foto: "images/5.jpg",
        dificultad: 9 
    },
    { 
        nombre: "Benkyou No Uta - Chisato Moritaka", 
        materia: "Programación y Servicios Web", 
        cancion: "canciones/森高千里 「勉強の歌」古今東西 ～鬼が出るか蛇が出るかツアー～_1080p.mp3", 
        foto: "images/6.jpg",
        dificultad: 7 
    },
    { 
        nombre: "Roppongi Shinju (六本木心中) - Ann Lewis feat. ZARD, Nanase Aikawa", 
        materia: "Técnicas y Estructuras Digitales", 
        cancion: "canciones/六本木心中 ZARD 坂井泉水 相川七瀬 アンルイス_1080p.mp3", 
        foto: "images/7.jpg",
        dificultad: 10 
    },
    { 
        nombre: "246 Planet Girls - Yoko Oginome", 
        materia: "Algebra Lineal", 
        cancion: "canciones/246.mp3", 
        foto: "images/8.jpg",
        dificultad: 8 
    },
    { 
        nombre: "Ame No Planetarium - Tomoyo Harada", 
        materia: "Sistemas de Información I", 
        cancion: "canciones/Harada Tomoyo  - _Ame No Planetarium_.mp3", 
        foto: "images/9.jpg",
        dificultad: 9 
    },
    { 
        nombre: "MUGO・ん・・・Iroppoi - Shizuka Kudo", 
        materia: "Legislación, Ética y Ejercicio Profesional", 
        cancion: "canciones/MUGOん色っぽい 工藤静香 映像は紅白歌合戦 音声はオフィシャル音源.mp3", 
        foto: "images/10.jpg",
        dificultad: 30 
    }
];

const cards = document.querySelectorAll(".card");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const leftBtn = document.querySelector(".nav-arrow.left");
const rightBtn = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;
let currentAudio = null;
let loopTimeout = null;

function generateSkulls(amount) {
    return `<span>💀</span>`.repeat(amount);
}

function playSong(index) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    clearTimeout(loopTimeout);

    currentAudio = new Audio(teamMembers[index].cancion);
    currentAudio.volume = 0.5;

    currentAudio.addEventListener('ended', () => {
        loopTimeout = setTimeout(() => {
            playSong(currentIndex);
        }, 5000);
    });

    currentAudio.play().catch(() => {});
}

function setupImages() {
    cards.forEach((card, i) => {
        const member = teamMembers[i];
        if (member) {
            card.innerHTML = `<img src="${member.foto}" style="width:100%; height:100%; object-fit:cover; pointer-events:none;">`;
        }
    });
}

function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + teamMembers.length) % teamMembers.length;

    cards.forEach((card, i) => {
        card.classList.remove("center", "up-1", "up-2", "down-1", "down-2", "hidden");
        let distance = i - currentIndex;
        if (distance > cards.length / 2) distance -= cards.length;
        if (distance < -cards.length / 2) distance += cards.length;

        if (distance === 0) card.classList.add("center");
        else if (distance === 1) card.classList.add("down-1");
        else if (distance === 2) card.classList.add("down-2");
        else if (distance === -1) card.classList.add("up-1");
        else if (distance === -2) card.classList.add("up-2");
        else card.classList.add("hidden");
    });

    memberName.style.opacity = "0";
    memberRole.style.opacity = "0";
    
    setTimeout(() => {
        const member = teamMembers[currentIndex];
        memberName.textContent = member.nombre;
        memberRole.innerHTML = `
            <div class="materia-text" style="margin-bottom:5px; font-weight:bold;">${member.materia}</div>
            <div class="skulls-row">
                ${generateSkulls(member.dificultad)}
            </div>
        `;
        memberName.style.opacity = "1";
        memberRole.style.opacity = "1";
        playSong(currentIndex);
    }, 300);

    setTimeout(() => { isAnimating = false; }, 800);
}

leftBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));
rightBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));
cards.forEach((card, i) => card.addEventListener("click", () => updateCarousel(i)));

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
    if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
});

setupImages();
updateCarousel(0);