'use strict';
const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('input, textarea');
const agree = document.querySelectorAll('.agree');
const selectInputs = document.querySelectorAll('.select');

const addErrorText = true;
const minSymbols = 3;
const errorSymbols = 'Minimum characters!';
const errorEmptyInput = 'The field must not be empty!';
const errorNameInput = 'Only letters are allowed!';
const errorEmailInput = 'Wrong E-mail format!';
const errorPhoneInput = 'Wrong phone format!';
const errorMinNumber = 'The minimum value is';
const errorMaxNumber = 'The maximum value is';

selectInputs.forEach(select => {
   const selectLabel = select.closest('.label--select');
   const options = select.querySelectorAll('option');
   selectLabel.insertAdjacentHTML(
      'beforeend',
      '<div class="selectInput"><div class="selectInput__result">Начальный</div><div class="selectInput__options">sss</div></div>'
   );
   select.value = 'React';
   console.log(select.value);
});

inputs.forEach(input => {
   let parentContainer = input.closest('.label');
   if (input.type === 'checkbox' || input.type === 'radio') {
      parentContainer = input.closest('.fieldset');
   }

   //INPUT CLEAR ON FOCUS
   input.addEventListener('focus', function () {
      const redInputs = parentContainer.querySelectorAll('.red');
      redInputs.forEach(redInput => {
         redInput.classList.remove('red');
         if (addErrorText == true && redInput.closest('.label').querySelector('.label__error') !== null) {
            redInput.closest('.label').querySelector('.label__error').classList.remove('active');
            setTimeout(function () {
               redInput.closest('.label').querySelector('.label__error').remove();
            }, 250);
         }
      });
   });

   //INPUT VALIDATE ON BLUR
   input.addEventListener('blur', function () {
      if (this.value !== '') {
         let inputChecker = checkForm(parentContainer);
         if (inputChecker === true) {
            this.classList.add('valid');
         }
      }
   });
});

//POLICY DISABLE
agree.forEach(policy => {
   policy.addEventListener('change', function () {
      let disabled = true;
      let agree = this.closest('.form').querySelectorAll('.agree');
      let agreeLength = agree.length;
      let agreeChecked = 0;
      agree.forEach(agree => {
         if (agree.checked) {
            agreeChecked++;
         }
      });
      if (agreeLength == agreeChecked) {
         disabled = false;
      }
      this.closest('.form').querySelector('[type=submit]').disabled = disabled;
   });
});

//FORMS SUBMIT
forms.forEach(form => {
   form.addEventListener('submit', async function (event) {
      event.preventDefault();
      let answer = checkForm(this);
      if (answer != false) {
         popup('loading');
         const formData = new FormData(this);
         let dataArray = {};
         formData.forEach((value, key) => (dataArray[key] = value));
         let jsonData = JSON.stringify(dataArray);
         console.log(jsonData);
         setTimeout(function () {
            popup('ok');
            formsReset();
            //-----
            //-----
            //----- google Analitics targets
            //-----
            // ----
         }, 1500);
      }
      return false;
   });
});

//FORMS VALIDATION
function checkForm(formId) {
   let checker = true;
   formId.querySelectorAll('[required]').forEach(required => {
      let requiredLabel = required.parentNode;
      let requiredInput = required;
      if (requiredInput.value.length === 0) {
         addError(requiredLabel, errorEmptyInput);
      } else {
         if (requiredInput.value.length < minSymbols && requiredInput.type !== 'number') {
            let minSymbolsErrorText = errorSymbols.split(' ');
            addError(requiredLabel, minSymbolsErrorText[0] + ' ' + minSymbols + ' ' + minSymbolsErrorText[1]);
         } else {
            //type Name
            if (requiredInput.name == 'name' && /[^A-zА-яЁё\+ ()\-]/.test(requiredInput.value)) {
               addError(requiredLabel, errorNameInput);
            }
            //type email
            if (requiredInput.type == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(requiredInput.value)) {
               addError(requiredLabel, errorEmailInput);
            }
            //type tel
            if (requiredInput.type == 'tel' && /[^0-9\+ ()\-]/.test(requiredInput.value)) {
               addError(requiredLabel, errorPhoneInput);
            }
            //type number
            if (requiredInput.type == 'number') {
               if (requiredInput.min && Number(requiredInput.value) < Number(requiredInput.min)) {
                  addError(requiredLabel, errorMinNumber + ' ' + requiredInput.min);
               }
               if (requiredInput.max && Number(requiredInput.value) > Number(requiredInput.max)) {
                  addError(requiredLabel, errorMaxNumber + ' ' + requiredInput.max);
               }
            }
         }
      }
      //type checkbox
      if (requiredInput.type == 'checkbox' && !requiredInput.checked) {
         checkerFalse();
      }
      //type radio
      if (requiredInput.type == 'radio' && !requiredInput.checked) {
         const radioList = formId.querySelectorAll('[name="' + requiredInput.name + '"]');
         let isChecked = false;
         for (let i = 0; i < radioList.length; i++) {
            if (radioList[i].checked === true) {
               isChecked = true;
               break;
            }
         }
         if (isChecked === false) {
            checkerFalse();
         }
      }

      //ERROR TEXT CREATE
      function addError(correntLabel, text) {
         if (addErrorText === true) {
            let errors = correntLabel.querySelectorAll('.label__error').length;
            if (errors < 1) {
               correntLabel.insertAdjacentHTML('beforeend', '<div class="label__error">' + text + '</div>');
               setTimeout(function () {
                  correntLabel.querySelector('.label__error').classList.add('active');
               }, 5);
            }
         }
         checkerFalse();
      }

      //ADD "RED" CLASS TO INPUTS
      function checkerFalse() {
         requiredInput.classList.add('red');
         checker = false;
      }
   });
   return checker;
}

//OLL FORMS RESET
function formsReset() {
   forms.forEach(form => {
      form.reset();
      form.querySelectorAll('.label__error').forEach(errors => {
         errors.classList.remove('active');
         setTimeout(function () {
            errors.remove();
         }, 250);
      });
      form.querySelectorAll('[required]').forEach(required => {
         required.classList.remove('red');
         required.classList.remove('valid');
      });
      if (form.querySelectorAll('.agree').length > 0) {
         form.querySelector('[type=submit]').disabled = true;
      }
   });
}
