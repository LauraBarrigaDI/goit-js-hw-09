
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const firstDelay = Number(delayInput.value);
  const delayStep = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + delayStep * (i - 1);
    createPromise(i, delay)
      .then(result => console.log(`Promise ${result.position} resolved after ${result.delay} ms`))
      .catch(error => console.log(`Promise ${error.position} rejected after ${error.delay} ms`));
  }
});