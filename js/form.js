/**
 * Обработка формы заявки
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('request-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const consent = form.querySelector('#consent');
    if (!consent.checked) {
      alert('Пожалуйста, подтвердите согласие на обработку данных.');
      return;
    }

    const data = {
      name: form.querySelector('#name').value.trim(),
      phone: form.querySelector('#phone').value.trim(),
      objectType: form.querySelector('#object-type').value,
      area: form.querySelector('#area').value.trim(),
      service: form.querySelector('#service').value,
      comment: form.querySelector('#comment').value.trim()
    };

    const message = buildWhatsAppMessage(data);

    form.classList.add('form--hidden');
    const success = document.getElementById('form-success');
    success.classList.add('form-success--visible');

    const whatsappBtn = document.getElementById('send-whatsapp');
    if (whatsappBtn && typeof SITE_CONFIG !== 'undefined') {
      whatsappBtn.href = `${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    }

    const telegramBtn = document.getElementById('send-telegram');
    if (telegramBtn && typeof SITE_CONFIG !== 'undefined') {
      telegramBtn.href = `${SITE_CONFIG.telegram}?text=${encodeURIComponent(message)}`;
    }
  });
});

function buildWhatsAppMessage(data) {
  const objectLabels = {
    apartment: 'Квартира',
    house: 'Дом',
    office: 'Офис',
    commercial: 'Коммерческое помещение',
    other: 'Другое'
  };

  const serviceLabels = {
    plaster: 'Декоративная штукатурка',
    material: 'Подбор материала',
    estimate: 'Расчёт стоимости',
    repair: 'Ремонт покрытия',
    consultation: 'Консультация'
  };

  let text = `Заявка с сайта\n\n`;
  text += `Имя: ${data.name}\n`;
  text += `Телефон: ${data.phone}\n`;
  text += `Тип объекта: ${objectLabels[data.objectType] || data.objectType}\n`;
  if (data.area) text += `Площадь: ${data.area} м²\n`;
  text += `Услуга: ${serviceLabels[data.service] || data.service}\n`;
  if (data.comment) text += `Комментарий: ${data.comment}\n`;

  return text;
}
