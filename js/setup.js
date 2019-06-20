'use strict';

var setupElement = document.querySelector('.setup');
setupElement.classList.remove('hidden');

var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {string[]} input
 * @return {string}
 */
function getRandomItem(input) {
  var randomIndex = getRandom(0, input.length - 1);

  return input[randomIndex];
}

/**
 * @param {number} number
 * @return {Wizard[]}
 */
function makeWizard(number) {
  var finalArray = [];

  for (var i = 0; i < number; i++) {
    var wizard = {
      name: getRandomItem(FIRST_NAME) + ' ' + getRandomItem(SECOND_NAME),
      coatColor: getRandomItem(COAT_COLOR),
      eyesColor: getRandomItem(EYES_COLOR)
    };

    finalArray.push(wizard);
  }

  return finalArray;
}

/**
 *
 * @param {Element} element
 * @param {Wizard} data
 * @return {Element}
 */
function fillPlaceholder(element, data) {
  var wrap = element.cloneNode(true);

  var name = wrap.querySelector('.setup-similar-label');
  name.textContent = data.name;

  var coat = wrap.querySelector('.wizard-coat');
  coat.style.fill = data.coatColor;

  var eyes = wrap.querySelector('.wizard-eyes');
  eyes.style.fill = data.eyesColor;

  return wrap;
}

/**
 * @param {Wizard[]} objects
 */
function appendSimilarWizards(objects) {
  var template = document.querySelector('#similar-wizard-template');
  var rootElement = template.content.querySelector('.setup-similar-item');
  var container = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  objects.forEach(function (item) {
    var element = fillPlaceholder(rootElement, item);

    fragment.appendChild(element);
  });

  container.appendChild(fragment);
}

appendSimilarWizards(makeWizard(4));

var setupSimElement = document.querySelector('.setup-similar');
setupSimElement.classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var form = document.querySelector('.setup-wizard-form');
var setUpWizard = form.querySelector('.setup-wizard');
var coat = setUpWizard.querySelector('.wizard-coat');
var eyes = setUpWizard.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');
var inputCoatColor = form.querySelector('[name=coat-color]');
var inputEyesColor = form.querySelector('[name=eyes-color]');
var inputFireballColor = fireball.querySelector('[name=fireball-color]');

coat.addEventListener('click', function () {
  var randomCoatColor = getRandomItem(COAT_COLOR);
  coat.style.fill = randomCoatColor;
  inputCoatColor.value = randomCoatColor;
});

eyes.addEventListener('click', function () {
  var randomEyesColor = getRandomItem(EYES_COLOR);
  eyes.style.fill = randomEyesColor;
  inputEyesColor.value = randomEyesColor;
});

fireball.addEventListener('click', function () {
  var randomFireballColor = getRandomItem(FIREBALL_COLOR);
  fireball.style.background = randomFireballColor;
  inputFireballColor.value = randomFireballColor;
});

/**
 * @typedef {Object} Wizard
 * @prop {string} name
 * @prop {string} eyesColor
 * @prop {string} coatColor
 */
