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
      isRevealed: false

    },
    {
      name: 'grater',
      price: 250,
      origPrice: 250,
      quantity: 0,
      multiplier: 5,
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
      isRevealed: false
    },
    {
      name: 'cannon',
      price: 50000,
      origPrice: 50000,
      quantity: 0,
      multiplier: 100,
      isRevealed: false
    }
  ]
}

let cheese = 100000
let clickMulti = 1
let autoMulti = 0
let timer = 0
let timerPer = 0

// SECTION Functions
function mine() {
  cheese += clickMulti
  draw()
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

      if (cheese < u.price) {
        upgradeBtn.setAttribute('disabled', '')
      } else {
        u.isRevealed = true
        upgradeBtn.removeAttribute('disabled')
      }

      if (u.isRevealed == true) {
        console.log('success', u);
        // NOTE if upgrade is equal to auto add / 3s
        if ()
          upgradeReveal.innerHTML = `
        <p>${u.name}</p>
        <p>+${u.multiplier}</p>`
        upgradeStat.innerHTML = `
        <p>${u.name}</p>`
      }
    })
  })

  cheeseElem.innerText = cheese
  pointerElem.innerText = clickMulti
  autoElem.innerText = autoMulti
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
  if (cheese >= foundUpgrade.price) {
    if (type == 'automaticUpgrades') {
      autoMulti += foundUpgrade.multiplier
    } else {
      clickMulti += foundUpgrade.multiplier
    }
    cheese -= foundUpgrade.price
    foundUpgrade.quantity++
    foundUpgrade.price += Math.floor((foundUpgrade.origPrice / 2) * foundUpgrade.quantity)
  }
  draw()
}

function autoClick() {
  cheese += autoMulti
  draw()
}

function timerBar() {
  timer += 300
  if (timer >= 3000) {
    timer = 0
  }
  timerPer = timer / 300 * 10

  if (autoMulti > 0) {
    timerElem.innerHTML = `
    <div class="progress-bar p-bg" role="progressbar" style="width: ${timerPer}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>`
  }
}

// SECTION Called Functions
draw()
setInterval(timerBar, 300)
setInterval(autoClick, 3000)