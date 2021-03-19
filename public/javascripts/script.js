function addToCart(proId){
    $.ajax({
        url:'/add-to-cart/'+proId,
        method : 'get',
        success:(response)=>{
            if(response.status){
                let count = $('#cart-count').html()
                count = parseInt(count)+1
                $('#cart-count').html(count)
            }
        }
    })
}
function productAdd(proId){
    $.ajax({
        url:'/add-to-cart/'+proId,
        method : 'get',
        success:(response)=>{
            if(response.status){
                let count = $('#product-add').html()
                count = parseInt(count)+1
                $('#product-add').html(count)
            }
        }
    })
}
function productAdd(proId){
    $.ajax({
        url:'/add-to-cart/'+proId,
        method : 'get',
        success:(response)=>{
            if(response.status){
                let count = $('#product-add').html()
                count = parseInt(count)+1
                $('#product-add').html(count)
                $('#cart-count').html(count)
            }
        }
    })
}