/**
 * Мини-квиз для подбора покрытия
 */
document.addEventListener('DOMContentLoaded', () => {
  const quiz = document.getElementById('quiz');
  if (!quiz) return;

  const steps = quiz.querySelectorAll('.quiz-step');
  const progressDots = quiz.querySelectorAll('.quiz-progress__dot');
  const resultBlock = document.getElementById('quiz-result');
  const answers = {};

  let currentStep = 0;

  quiz.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
      const step = option.closest('.quiz-step');
      const question = step.dataset.question;

      step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('quiz-option--selected'));
      option.classList.add('quiz-option--selected');
      answers[question] = option.dataset.value;

      setTimeout(() => {
        steps[currentStep].classList.remove('quiz-step--active');
        progressDots[currentStep].classList.add('quiz-progress__dot--done');
        progressDots[currentStep].classList.remove('quiz-progress__dot--active');

        currentStep++;

        if (currentStep < steps.length) {
          steps[currentStep].classList.add('quiz-step--active');
          progressDots[currentStep].classList.add('quiz-progress__dot--active');
        } else {
          showResult();
        }
      }, 300);
    });
  });

  function showResult() {
    quiz.querySelector('.quiz-steps').style.display = 'none';
    quiz.querySelector('.quiz-progress').style.display = 'none';
    resultBlock.classList.add('quiz-result--visible');

    const resultPhone = document.getElementById('quiz-phone');
    if (resultPhone) {
      resultPhone.addEventListener('click', () => {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
          phoneInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          phoneInput.focus();
        }
      });
    }
  }
});
