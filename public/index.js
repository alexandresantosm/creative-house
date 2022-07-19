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

function checkFields(event) {
  const valuesToCheck = [
    "title",
    "category",
    "image-url",
    "description",
    "idea-url",
  ];

  const valuesFields = [
    {"title": "Título da ideia"},
    {"category": "Categoria"},
    {"image-url": "Link da imagem"},
    {"description": "Digite uma descrição para essa ideia"},
    {"idea-url": "Link da ideia"},
  ];

  const isEmpty = valuesToCheck.find((value) => {
    const checkIfIsString = typeof event.target[value].value === 'string';
    const checkIfIsEmpty = !event.target[value].value.trim();

    if (checkIfIsString && checkIfIsEmpty) {
      return true;
    }
  });

  if (isEmpty) {
    event.preventDefault();

    const field = valuesFields.find((item) => item[isEmpty]);

    swal({
      title: "Valor inválido!",
      text: `Por favor preencha o campo "${field[isEmpty]}".`,
      icon: "warning",
      dangerMode: true,
    });
  }
}