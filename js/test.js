const $ = q => document.querySelector(q)
const on = (elem, event, callback) => elem.addEventListener(event, callback)
const resources = {
    wood: 3,
    food: 35,
}
const population = {
    ready: 15,
    hungry: 0,
    sick: 0,
    hurt: 0,
}
const achievements = {
    carpentry: {
        cost: {
            wood: 10,
            food: 10,
            people: 4
        }
    },
    shipyard: {
        requires: [
            'carpentry'
        ]
    }
}

const date = new Date('1499/05/13')
const DAY = 10000

on($('#chop-wood'), 'click', () => fetchWood())
on($('#forage'), 'click', () => forage())
on($('#hunt'), 'click', () => hunt())

const log = (text, color) => {
    if ($('#log .new')) {
        setTimeout(() => log(text, color), 500)
        return
    }
    const newLog = document.createElement('p')
    newLog.innerText = text
    if (color) newLog.classList.add(color)
    newLog.classList.add('new')
    $('#log').prepend(newLog)
    setTimeout(() => {
        newLog.classList.remove('new')
    }, 200)
}

const fetchWood = () => {
    population.ready -= 2
    setTimeout(bring('wood', 2, 5, 0.05), DAY * 0.5)
    log('🌳👬 2 people set off to bring wood.')
    updateView()
}

const forage = () => {
    population.ready -= 2
    setTimeout(bring('food', 2, 4, 0), DAY * 0.3)
    log('🌾👬 2 people have gone foraging.')
    updateView()
}

const hunt = () => {
    population.ready -= 4
    setTimeout(bring('food', 4, 12, 0.1), DAY * 0.6)
    log('🏹👨‍👩‍👦‍👦 4 hunters left to bring food.')
    updateView()
}

const bring = (resource, partySize, amount, risk) => () => {
    if (Math.random() > risk) {
        log(`🌟 A party of ${partySize} has returned with ${amount} ${resource} successfully.`)
        resources[resource] += amount
        population.ready += partySize
    } else {
        log(`💀 A party of ${partySize} returned from fetching ${resource}, but got attacked by wild animals. 1 person died`, 'red')
        resources[resource] += Math.floor(amount / 2)
        population.ready += partySize - 1
        blink('population', 'red')
    }
    updateView()
    blink(resource, 'green')
}

const blink = (resource, color) => {
    $(`#${resource}`).classList.add(color)
    setTimeout(() => {
        $(`#${resource}`).classList.remove(color)
    }, 100);
}

const updateView = () => {
    $('#wood .value').innerText = resources.wood
    $('#food .value').innerText = resources.food

    $('#population .value').innerText = population.ready
    $('#hungry .value').innerText = population.hungry
    if (population.hungry < 1) {
        $('#hungry').classList.add('hidden')
    } else {
        $('#hungry').classList.remove('hidden')
    }

    $('#forage').disabled = population.ready < 2
    $('#chop-wood').disabled = population.ready < 2
    $('#hunt').disabled = population.ready < 4
}

updateDate = () => {
    date.setDate(date.getDate() + 1)
    $('#days .value').innerText = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
}

const nextDay = () => {
    updateDate()

    if ((population.ready + population.hungry) < 1) {
        log(`💀💀💀 Your population was decimated`, 'red')
        stop()
    }
    if (population.hungry > 0) {
        population.hungry -= 1
        log(`💀 One person has died from starvation. +5 food.`, 'red')
        resources.food += 5
    }

    population.ready += population.hungry
    population.hungry = 0

    resources.food -= population.ready
    if (resources.food < 0) {
        population.ready += resources.food
        population.hungry += -resources.food
        resources.food = 0
        log(`😞 Due to lack of food, ${population.hungry} are starving and can't work.`, 'red')
    }
    updateView()
}

// init
const dayInterval = setInterval(nextDay, DAY)
const stop = () => {
    clearInterval(dayInterval)
}
updateDate()
updateView()
