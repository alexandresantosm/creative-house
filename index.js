function onOff() {
  document
    .querySelector('#modal')
    .classList
    .toggle('hidden');

  document
    .querySelector('body')
    .classList
    .toggle('hiddenScroll');

  document
    .querySelector('#modal')
    .classList
    .toggle('addScroll');
}
