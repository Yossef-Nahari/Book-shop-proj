'use strict'

var gLorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quasi ex maiores, dolore, magnam beatae nostrum at nobis odit voluptatum sint. Vitae mollitia beatae saepe! Culpa ea illo voluptas numquam?'

//Return a random number - the maximum is also inclusive
function getRandomIntIncl(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}