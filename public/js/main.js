$(function() {
  // Your custom JavaScript goes here
  $('#bulk').click(function(){
    window.prompt('You are about to Download our bulk-adding agent'
    +'\nSimply unzip, run the .exe file and follow the instructions'
    +'\nYour token is shown below. Please copy it to your clipboard', 662903737229708);
  })

  $('#add').click(function(){
    if ($('#hidden-form').hasClass('hidden')){
      $('#hidden-form').removeClass('hidden');
    } else {
      $('#hidden-form').addClass('hidden');
    }
  })

  $('#search').click(function(){
    if ($('#search-form').hasClass('hidden')){
      $('#search-form').removeClass('hidden');
    } else {
      $('#search-form').addClass('hidden');
    }
    
  })

  $('#t1').click(function(){
    console.log('t1')
    $('#url').addClass('hidden');
    $('#path').addClass('hidden');
    $('#name').removeClass('hidden')
    $('#size').addClass('hidden')
    $('#submit-add').removeClass('hidden');
  })

  $('#t2').click(function(){
    console.log('t2')
    $('#url').addClass('hidden');
    $('#path').removeClass('hidden');
    $('#name').removeClass('hidden')
    $('#size').removeClass('hidden')
    $('#submit-add').removeClass('hidden');
  })

  $('#t3').click(function(){
    console.log('t3')
    $('#url').removeClass('hidden');
    $('#path').addClass('hidden');
    $('#name').addClass('hidden')
    $('#size').addClass('hidden')
    $('#submit-add').removeClass('hidden');
  })
});
