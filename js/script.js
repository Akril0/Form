"use strict"
document.addEventListener('DOMContentLoaded', function(){
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e){
      e.preventDefault();

      let error = formValidate(form);
   }

   function formValidate(form){
      let error = 0;
      let formReq = document.querySelectorAll('._req');
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);
            if(input.classList.contains('_email')){
               if (emailTest(input)){
                  formAddError(input);
                  error++;
               }
            }
            else if(input.getAttribute("type") === "checkbox" && input.checked === false){
               formAddError(input);
               error++;
            }
            else{
               if (input.value === ''){
                  formAddError(input);
                  error++;
               }
            }
      }
   }
   function formAddError(input){
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input){
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   //функиция теста emdil
   function emailTest(input){
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }
   //Получаем input file в переменную
   const formImage = document.getElementById('formImage');
   //Получаем div для preview в переменную
   const formPreview = document.getElementById('formPreview');

   //Смотрим изменения в input file
   formImage.addEventListener('change', () =>{
      uploadFile(formImage.files[0]);
   });

   function uploadFile (file){
     
      if(!['image/jpeg','image/png','image/gif'].includes(file.type)){
         alert('Разрешены только изображения.');
         formImage.value='';
         return;
      }
      if(file.size > 2 * 1024 * 1024){
         alert('Файл должен быть не менее 2 МБ.');
         return;
      }

      var reader = new FileReader();

      reader.onload= function(e){
         let close = document.getElementById("FotoOpen");
         close.classList.toggle("foto-open");
         formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;

      }
      reader.onerror = function (e){
       alert('Ошибка');  
      }
      reader.readAsDataURL(file);
   }

});

function fotoClose(){
   let close = document.getElementById("FotoOpen");
   close.classList.remove("foto-open");
   formImage.value='';
   var reader = new FileReader();
   reader.readAsDataURL(file);
}