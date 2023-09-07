$(function() {
    // 공지사항
    let notice = new Swiper("#noticeSwiper", {
        navigation: {
            nextEl: ".notice .swiper-button-next",
            prevEl: ".notice .swiper-button-prev",
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop : true,
        loopAdditionalSlides : 1,
    });

    // main visual
    let visual = new Swiper("#visualSwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".visual .swiper-button-next",
            prevEl: ".visual .swiper-button-prev",
        },
        pagination: {
            el: '.visual .swiper-pagination',
            type: 'fraction',
            clickable: true,
  
            renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' <span>-</span> ' + '<span class="' + totalClass + '"></span>'; }
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop : true,
        loopAdditionalSlides : 1,
    });

    // 추천제품
    let product = new Swiper("#productSwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.product .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        loop : true,
        loopAdditionalSlides : 1,
    });

    // 베스트상품
    function esgAni(){
        let idx = 0;
        let bpItem = $('.bp-list > li');
        function time(){
            bpItem.removeClass('on');
            bpItem.eq(idx).addClass('on');
            idx++;
            if(idx >= bpItem.length) idx= 0;
        }
        let interval = setInterval(time, 3500);
        bpItem.mouseover(function(){
            clearInterval(interval);
        });

        bpItem.mouseleave(function(){
            interval = setInterval(time, 4000);
        });

        bpItem.click(function(){
            bpItem.removeClass('on');
            $(this).addClass('on');
        });
    }esgAni();
});