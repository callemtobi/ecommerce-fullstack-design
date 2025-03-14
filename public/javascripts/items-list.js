const gridBtn = $('#grid-view');
const listBtn = $('#list-view');

const productDiv = $('.products-div');

gridBtn.click(() => {
    console.log(productDiv.attr('class'))
    const hasClass = productDiv.hasClass('grid-view');
    if (!hasClass) {
        productDiv.addClass('grid-view'); 
        productDiv.removeClass('list-view');

        $('.desc-display').css('display', 'none');
    }
    
    console.log(productDiv.attr('class'))
    
})

listBtn.click(() => {
    console.log(productDiv.attr('class'))
    const hasClass = productDiv.hasClass('list-view');
    if (!hasClass) {
        productDiv.addClass('list-view'); 
        productDiv.removeClass('grid-view');

        $('.desc-display').css('display', 'block');
    }
    
    console.log(productDiv.attr('class'))

})