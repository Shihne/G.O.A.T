$(function () {
   var questions = [];
    var pos = 0;
    var ans = {
        sc: 0,
        sp: 0,
        mel: 0,
        sn: 0,
        med: 0,
        un: 0,
        ex: 0,
        bi: 0,
        li: 0,
        ba: 0,
        br: 0,
        en: 0,
        re: 0,
        no: 0
    };

   $('.quest').each( function (i) {
        $(this).find('fieldset').append('<legend>К.О.З.А. Вопрос ' + (i + 1) + '</legend>');
        $(this).css({'background-image' : 'url("GOAT' + (i + 1) + '.jpg")'});
       var radioGroup = $(this).find('input[type="radio"]');
       radioGroup.attr('name', "ans" + (i + 1));
       console.info($(this).position());

   });

    //Для перемешивания вопросов
   /*function f() {
       $('.quest').each( function() {
           questions.push($(this));
           $(this).detach();
       });
       var result = $('#result');
       result.detach();
       var count = questions.length;
       for (var i = 0; i < count; i++) {
           var ix = Math.floor(Math.random() * questions.length);
           $('#slider-wrapper').append(questions[ix]);
           questions.splice(ix, 1);
       }
       $('#slider-wrapper').append(result);
   }
    f();*/



    $('#intro fieldset').fadeIn(400);
    $('input[type="radio"]').click(function () {
        var cur_text;
        var next_text;
        if ($(this).attr('id') !== "repeat") {
            pos -= 550;
            cur_text = $(this).parents('.slider-text');
            next_text = $(this).parents('.slide').next().children();
        } else {
            pos = 0;
            cur_text = $('#result fieldset');
            next_text = $('#intro fieldset');
        }
        if ($(this).attr('id') === "start")
            $('#slider-wrapper').animate({'top': pos + 'px'}, 800, function() {
                $('#intro fieldset').hide();
                $('.quest:first fieldset').fadeIn(800);
            });
        else {
            $('#slider-wrapper').animate({'top': pos + 'px'}, 800, function () {
                next_text.fadeIn(800);
                cur_text.hide();
            });
        }
    });
    $('.ans label input[type="radio"]').click(function () {
        var key = $(this).attr('key');
        console.info(key);
        if (key.indexOf(" ") === -1) {
            ans[key]++;
        }
        else {
            ans[key.substring(0, key.indexOf(" "))]++;
            ans[key.substring(key.indexOf(" ") + 1)]++;
        }
    });
    $('.quest:last .ans label input[type="radio"]').click(function () {
        console.info(ans);

        var skills = [];
        for (var max = 4; max > 0; max--) {
            for (var k in ans)
                if (ans[k] === max)
                    skills.push(k);
            if (skills.length !== 0)
                break;
        }
        if (skills.length === 4)
            $('#test').css({'font-size' : '15px'});
        else
            $('#test').css({'font-size' : '20px'});
        for (var skill in skills) {
            console.info(skills[skill]);
            $('.result').each(function () {
                if ($(this).hasClass(skills[skill]))
                    $(this).show();
            });
        }
    });
    $('#repeat').click(function () {
        $('.result').hide();
        for (var k in ans)
            ans[k] = 0;
        console.info(ans);
        //f();

    });




});