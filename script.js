const htmlElements = {
  startscreen: document.querySelector(".startscreen"),
  balance: document.querySelector(".balance"),
  caseopen: document.querySelector(".case"),
  openbtn: document.querySelector(".open"),
  sellbtn: document.querySelector(".sell"),
  start: document.querySelector(".startbtn"),
  caseimg: document.querySelector(".caseimg"),
  skinimg: document.querySelector(".skinimg"),
  content: document.querySelector(".content"),
  keep: document.querySelector(".keep"),
  inventory: document.querySelector(".inventory"),	
  rare0: document.querySelector(".rare"),
  rare1: document.querySelector(".mythical"),
  rare2: document.querySelector(".legendary"),
  rare3: document.querySelector(".ancient"),
};
const user = JSON.parse(localStorage.getItem("user")) || {	balance: 100, cases: [] };	

const skins = [
  [
    {
      name: "",
      price: 0.17,
      src: "/content/0.png",
    },
    {
      name: "",
      price: 0.55,
      src: "/content/1.png",
    },
    {
      name: "",
      price: 1,
      src: "/content/2.png",
    },
    {
      name: "",
      price: 1.52,
      src: "/content/3.png",
    },
    {
      name: "",
      price: 2.70,
      src: "/content/4.png",
    },
    {
      name: "",
      price: 2.92,
      src: "/content/5.png",
    },
    {
      name: "",
      price: 3.09,
      src: "/content/6.png",
    },
  ],
  [
    {
        name: "",
        price: 4.90,
        src: "/content/7.png",
    },
    {
      name: "",
      price: 9.10,
      src: "/content/8.png",
    },
    {
      name: "",
      price: 24.00,
      src: "/content/9.png",
    },
    {
      name: "",
      price: 48.90,
      src: "/content/10.png",
    },
    {
      name: "",
      price: 77.19,
      src: "/content/11.png",
    },
  ],
  [
    {
        name: "",
        price: 90.02,
        src: "/content/12.png",
    },
    {
      name: "",
      price: 100,
      src: "/content/13.png",
    },
    {
      name: "",
      price: 200,
      src: "/content/14.png",
    },
  ],
  [
    {
      name: "",
      price: 400,
      src: "/content/16.png",
    },
    {
        name: "",
        price: 300,
        src: "/content/15.png",
    }
  ],
];

showRarity()
showInventory()

htmlElements.balance.innerHTML = user.balance;	
htmlElements.start.addEventListener("click", startOpening);

function noShow(element) {
  element.style.display = "none";
}
function show(element) {
  element.style.display = "block";
}

htmlElements.openbtn.addEventListener("click", () => {
    if (user.balance > 20) {
        user.balance -= 20;
        htmlElements.balance.innerHTML = user.balance;
        localStorage.setItem("user", JSON.stringify(user));
        openCase();
    }    
}
);

function startOpening() {
  noShow(htmlElements.startscreen);
}

function showRarity(){
    skins[0].forEach(skin => {
        htmlElements.rare0.innerHTML += `<img src="${skin.src}" alt="${skin.name}" class="skin">`;
    })
    skins[1].forEach(skin => {
        htmlElements.rare1.innerHTML += `<img src="${skin.src}" alt="${skin.name}" class="skin">`;
    })
    skins[2].forEach(skin => {
        htmlElements.rare2.innerHTML += `<img src="${skin.src}" alt="${skin.name}" class="skin">`;
    })
    skins[3].forEach(skin => {
        htmlElements.rare3.innerHTML += `<img src="${skin.src}" alt="${skin.name}" class="skin">`;
    })
}


let group;
let skin;

function openCase() {
    group = skins[Math.floor(Math.random() * skins.length)];
    skin = group[Math.floor(Math.random() * group.length)];
    htmlElements.caseopen.innerHTML = skin.name;
    htmlElements.caseimg.src = skin.src;
    noShow(htmlElements.openbtn)
    show(htmlElements.sellbtn)
    show(htmlElements.keep)
    console.log(skin, 'skin')
    htmlElements.sellbtn.innerHTML = `Sell for ${skin.price}`;
    showInventory();
}

htmlElements.sellbtn.addEventListener("click", () => {
  user.balance += skin.price;
  htmlElements.balance.innerHTML = user.balance;
  localStorage.setItem("user", JSON.stringify(user));
  noShow(htmlElements.sellbtn)
  noShow(htmlElements.keep)
  show(htmlElements.openbtn)
  htmlElements.caseimg.src = "/content/Recoil_Case.png";
})
htmlElements.keep.addEventListener("click", () => {	
  user.cases.push(skin);
  console.log(user.cases);
  localStorage.setItem("user", JSON.stringify(user));
  noShow(htmlElements.sellbtn)
  noShow(htmlElements.keep)
  show(htmlElements.openbtn)
  htmlElements.caseimg.src = "/content/Recoil_Case.png";
})


function showInventory() {
    htmlElements.inventory.innerHTML = "";
    user.cases.forEach(skin => {
        htmlElements.inventory.innerHTML += `<img src="${skin.src}" alt="${skin.name}" class="skin">`;
    })
}

