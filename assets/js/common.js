$(function() {
    // include
    $('#header').load('../../include/header.html'); 
    $('.lnb').load('../../include/lnb.html'); 
    $('#footer').load('../../include/footer.html'); 

    let dim = $('.dimmed');
    // reize
    function lnbResize(){
        let width = $(window).width();
        let timer = null;
        let sec = 50;

        $(window).on('resize', function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                width = $(window).width();
                if(width < 1536){
                    $('.lnb').addClass('deactivate');
                }else{
                    $('.lnb').removeClass('deactivate');
                }
                
                if(width < 1000){
                    $('.lnb').removeClass('deactivate');
                    mobileTop();
                }
            }, sec);
        });
    }lnbResize();

    function mobileTop(){
        $(window).scroll(function(){
            let scrT = $(window).scrollTop();
            // let ftHeight = $('footer').height();
            let height = $(document).height() - $(window).height();

            // console.log($(document).scrollTop())
            if(scrT == height){
                $('footer .totop').addClass('on');
            } else {
                $('footer .totop').removeClass('on');
            }
        });
    }

    // datepicker custom
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
        changeYear: true,
        changeMonth: true,
    });

    /* header(gnb, quick menu, 메가드롭 메뉴) */
    function gnb(){
        let menuDepth3 = $('#header .menu-wrap .depth3-list');
        let menuDepth4 = $('#header .menu-wrap .depth4-list');
        let hamBtn = $('#header .ham-btn'); // 메가드롭 controls
        let menuWrap = $('#header .menu-wrap'); // 메가드롭 menuwrap
        let nav = $('#header .nav'); // gnb menu(pc만 노출)

        // 메가드롭 메뉴
        $(document).on('click', '#header .ham-btn', function(){
            console.log('메가드롭 활성')
            if($(this).hasClass('on') == true){
                $(this).removeClass('on');
                $('#header .menu-wrap').removeClass('on');
                $('.nav').removeClass('hidden');
            }else{
                $(this).addClass('on');
                $('#header .menu-wrap').addClass('on');
                $('.nav').addClass('hidden');
                $('.nav-menu').removeClass('on');
            }
        });

        // lnb init
        // $('#header .menu-wrap .depth3-list').hide();
        // $('#header .menu-wrap .depth4-list').hide();
        $('.menu-wrap .depth3').parents('.depth3-list').siblings('.depth2').addClass('have-depth3');
        $('.menu-wrap .depth4').parents('.depth4-list').siblings('.depth3').addClass('have-depth4');

        $(document).on('click', '.menu-wrap .depth2', function(){
            if($(this).hasClass('on') == true){
                $(this).next('.depth3-list').slideUp();
                $(this).removeClass('on');
            }else{
                $(this).next('.depth3-list').slideDown();
                $(this).addClass('on');
            }
        });

        $(document).on('click', '.menu-wrap .depth3', function(){
            if($(this).hasClass('on') == true){
                $(this).next('.depth4-list').slideUp();
                $(this).removeClass('on');
            }else{
                $(this).next('.depth4-list').slideDown();
                $(this).addClass('on');
            }
        });

        // quick menu
        $(document).on('click', '.seen-btn', function(){
            $('.seen-product').addClass('on');
            dim.addClass('on');
        });
        $(document).on('click', '.seen-product .closed-btn', function(){
            $('.seen-product').removeClass('on');
            dim.removeClass('on');
        });
        $(document).on('click', '.totop', function(){
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });

        // gnb menu
        $(document).on('mouseover', 'nav .menu-list > li', function(){
            $(this).addClass('on').siblings().removeClass('on');
            $('.nav-menu').addClass('on');
        });

        $(document).on('mouseleave', nav, function(){
            $('nav .menu-list > li').removeClass('on');
            $('.nav-menu, .nav-menu .depth3-wrap').removeClass('on');
        });
        $(document).on('click', '.nav-menu .depth2', function(){
            $(this).addClass('on');
            $(this).parents('.depth2-wrap').next('.depth3-wrap').addClass('on');
        });

        // 메가드롭 메뉴(mobile)
        $(document).on('click', '#header .menu-wrap .tit-wrap > li', function(){
            let index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $('#header .menu-wrap .list-info > li').eq(index).addClass('on').siblings().removeClass('on');
        });
        
    }gnb();

    /* lnb(제품검색) */
    // 모바일 lnb 활성화
    $(document).on('click', '.lnb .serch-wrap', function(){
        $('.lnb-info').addClass('on');
    });
    $(document).on('click', '.lnb-info .closed-btn', function(){
        $(this).parents('.lnb-info').removeClass('on');
    });

    // 노트북(1536px) 열고/닫기
    $(document).on('click', '.lnb-controls', function(){
        $('.lnb').toggleClass('deactivate');
        // if($(this).hasClass('on') == true){
        //     $('.lnb').removeClass('deactivate');
        // }else{
        //     $('.lnb').addClass('deactivate');
        // }
    });

    $(document).on('click', '.lnb-wrap .toggle-btn', function(e){
        let target = $(this);
        if($(this).hasClass('on') == true){
            target.removeClass('on');
            target.parent('.tit').next('.input-cont').slideUp(200);
        }else{
            target.addClass('on');
            target.parent('.tit').next('.input-cont').slideDown(200);
        }
    });

    /* sub page */
    // 총주문금액 메뉴고정
    $('.fixed-menu').parents('.wrap-inner').addClass('fixed-wrap');
    $('.fixed-menu').before('<div class="empty-wrap"></div>');

    // checkbox
    function tableCheck(e){
        var target = $(e.target);
        var allcheck = $('.allcheck')
        var checkTable = target.parents('table');
        var checkTableBody = target.parents('table').find('tbody');

        //all check
        function tableCheckAll(){
            if(target.prop('checked') == true){
                checkTable.find('input[type="checkbox"]').prop('checked',true);
            }else if(target.prop('checked') == false ){
                checkTable.find('input[type="checkbox"]').prop('checked',false);
            }
        };

        if(target.hasClass('allcheck') == true){
            tableCheckAll();
        }
        if(target.hasClass('allcheck') == false){
            allcheck.prop('checked',false);
        }
    }
    
    $('.table-wrap table input[type="checkbox"]').on('click',function(e){
        tableCheck(e);

        var total = $('.table-wrap tbody').find('input[type="checkbox"]').length;
        var checked = $('.table-wrap tbody').find('input[type="checkbox"]:checked').length;
        
        if(total != checked){
            $(this).parents('.table-wrap').find('.allcheck').prop("checked", false);
        }else{
            $(this).parents('.table-wrap').find('.allcheck').prop("checked", true); 
        }
        
    });

    /* popup */
    function popup(){
        if($('#wrapper .popup').hasClass('on') === true){
            $('body').addClass('fixed');
        }else{
            $('body').removeClass('fixed');
        }

        $('.closed-btn').on('click', function(){
            $(this).parents('.popup-cont').removeClass('on');
            $('.popup').removeClass('on');
            $('body').removeClass('fixed');
        });
    }popup();
});