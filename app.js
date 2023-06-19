// SECTION Variables
let cheeseElem = document.getElementById('cheeseCount')
let pointerElem = document.getElementById('pointerCount')
let autoElem = document.getElementById('autoCount')
let timerElem = document.getElementById('timer')

let upgrades = {
  clickUpgrades: [
    {
      name: 'knife',
      price: 50,
      origPrice: 50,
      quantity: 0,
      multiplier: 1,
      clickType: 'click',
      isRevealed: false
    },
    {
      name: 'grater',
      price: 250,
      origPrice: 250,
      quantity: 0,
      multiplier: 5,
      clickType: 'click',
      isRevealed: false
    }
  ],
  automaticUpgrades: [
    {
      name: 'rover',
      price: 1000,
      origPrice: 1000,
      quantity: 0,
      multiplier: 20,
      clickType: 'auto',
      isRevealed: false
    },
    {
      name: 'cannon',
      price: 50000,
      origPrice: 50000,
      quantity: 0,
      multiplier: 100,
      clickType: 'auto',
      isRevealed: false
    }
  ]
}

let counters = {
  cheese: 0,
  clickMulti: 1,
  autoMulti: 0,
}

let timer = 0
let timerPer = 0

// SECTION Functions
function mine() {
  counters.cheese += counters.clickMulti
  saveCheese()
}

function saveCheese() {
  window.localStorage.setItem("counters", JSON.stringify(counters))
  window.localStorage.setItem("upgrades", JSON.stringify(upgrades))
  draw()
}

function loadCheese() {
  let storedCheese = JSON.parse(window.localStorage.getItem("counters"))
  let storedUpgrades = JSON.parse(window.localStorage.getItem("upgrades"))
  if (storedCheese) {
    counters = storedCheese
  }
  if (storedUpgrades) {
    upgrades = storedUpgrades
  }
}

function draw() {
  Object.values(upgrades).forEach(upgrade => {
    upgrade.forEach(u => {
      let upgradeCount = document.getElementById(`${u.name}Total`)
      let upgradeMulti = document.getElementById(`${u.name}Multi`)
      let upgradePrice = document.getElementById(`${u.name}Price`)
      let upgradeBtn = document.getElementById(`${u.name}Btn`)
      let upgradeReveal = document.getElementById(`${u.name}Reveal`)
      let upgradeStat = document.getElementById(`${u.name}Stat`)

      upgradeCount.innerText = round(u.quantity)
      upgradeMulti.innerText = round(u.multiplier * u.quantity)
      upgradePrice.innerText = round(u.price)

      if (counters.cheese < u.price) {
        upgradeBtn.setAttribute('disabled', '')
      } else {
        u.isRevealed = true
        upgradeBtn.removeAttribute('disabled')
      }

      if (u.isRevealed == true) {
        if (u.clickType == 'auto') {
          upgradeReveal.innerHTML = `
          <p>${u.name}</p>
          <p>+${u.multiplier} / 3s</p>`
        } else {
          upgradeReveal.innerHTML = `
          <p>${u.name}</p>
          <p>+${u.multiplier}</p>`
        }
        upgradeStat.innerHTML = `
        <p>${u.name}</p>`
      }
    })
  })

  cheeseElem.innerText = counters.cheese
  pointerElem.innerText = counters.clickMulti
  autoElem.innerText = counters.autoMulti
}

function round(num) {
  if (num >= 1000000) {
    num = num / 1000000
    return `${Math.round(num * 100) / 100}M`
  } else if (num >= 1000) {
    num = num / 1000
    return `${Math.round(num * 1000) / 1000}K`
  }
  return num
}

function addUpgrade(name, type) {
  let foundUpgrade = upgrades[type].find(u => u.name == name)
  if (counters.cheese >= foundUpgrade.price) {
    if (type == 'automaticUpgrades') {
      counters.autoMulti += foundUpgrade.multiplier
    } else {
      counters.clickMulti += foundUpgrade.multiplier
    }
    counters.cheese -= foundUpgrade.price
    foundUpgrade.quantity++
    foundUpgrade.price += Math.floor((foundUpgrade.origPrice / 2) * foundUpgrade.quantity)
  }
  saveCheese()
}

function autoClick() {
  counters.cheese += counters.autoMulti
  saveCheese()
}

function timerBar() {
  timer += 300
  if (timer >= 3000) {
    timer = 0
  }
  timerPer = timer / 300 * 10

  if (counters.autoMulti > 0) {
    timerElem.innerHTML = `
    <div class="progress-bar p-bg" role="progressbar" style="width: ${timerPer}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>`
  }
}

// SECTION Called Functions
loadCheese()
draw()
setInterval(timerBar, 300)
setInterval(autoClick, 3000)