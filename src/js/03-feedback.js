import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('submit', onSubmit);
feedbackForm.addEventListener('input', throttle(onInput, 500));

onLoad();

function onSubmit(event) {
  event.preventDefault();
  const email = event.currentTarget.email.value;
  const message = event.currentTarget.message.value;
  const form = {
    email: email,
    message: message,
  };
  console.log(form);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(event) {
  const email = feedbackForm.email.value;
  const message = feedbackForm.message.value;
  const form = {
    email: email,
    message: message,
  };
  form[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
}

function onLoad() {
  const fromStorage = localStorage.getItem(STORAGE_KEY);
  if (fromStorage) {
    feedbackForm.email.value = JSON.parse(fromStorage).email;
    feedbackForm.message.value = JSON.parse(fromStorage).message;
  }
}
