var count = 0;
var time = 30;
var marks = 0;
var answer = [];
var timer;

var myData = {
    "Questions": [
        {
            "Quiz": "Q.1) What does HTML stand for?",
            "option1": "Hyper Type Markup Language",
            "option2": "Home Tool Markup Language",
            "option3": "Hyper Link and Text Markup Language",
            "option4": "Hyper Text Markup Language",
            "answer": "Hyper Text Markup Language"

        },
        {
            "Quiz": "Q.2) What does CSS stand for?",
            "option1": "Colorful Style sheets",
            "option2": "Computer Style Sheets",
            "option3": "Creative STyle Sheets",
            "option4": "Cascading Style Sheets",
            "answer": "Cascading Style Sheets"

        },
        {
            "Quiz": "Q.3) Which HTML attribute is used to define inline styles?",
            "option1": "Style",
            "option2": "Font",
            "option3": "Class",
            "option4": "Styles",
            "answer": "Style"

        },
        {
            "Quiz": "Q.4) Which is the correct CSS syntax?",
            "option1": "body:color=black;",
            "option2": "{body:color=black;}",
            "option3": "body{color:black;}",
            "option4": "{body;color:black;}",
            "answer": "body{color:black;}"

        },
        {
            "Quiz": "Q.5) Which is the correct HTML tag for playing video files?",
            "option1": "media",
            "option2": "movie",
            "option3": "video",
            "option4": "mp4",
            "answer": "video"

        }

    ]
};
//main ready function
$(document).ready(function () {
    
    // hide elements initially
    $("#mainBody, #finish, #Result").hide();
    $("#rightAns, #wrongAns, #congrats").hide();
    $(".option").removeAttr('disabled');
    
    buttons_manager();
    //create function
    function buttons_manager() {
        if (count > 0) {
            $('#prev').show();
            if (count == 4) {
                $('#next').hide();
                $('#finish').show();
            }
            else {
                $('#next').show();


            }
        }
        else {
            $('#prev').hide();
        }
    }
    //Create Question Function
    function adding_Questions(data, i) {
        $('#question').text(data[i].Quiz);
        //$("#option1").html(data[i].option1);
        $('#option1').text(data[i].option1)
        $('#option2').text(data[i].option2)
        $('#option3').text(data[i].option3)
        $('#option4').text(data[i].option4)
        $('#number').text(Number(i + 1));
    }

    // Answer Selection Function

    function selected_Answer() {
        for (var i = 0; i < 4; i++) {
            var a = document.getElementById("options").children;
            if (a[i].innerHTML == answer[count]) {
                $("#options").children("button")[i].classList.add("active");
            }
            else {
                $("#options").children("button")[i].classList.remove("active");
            }
        }
    }

    function creating_result(data) {
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] != "0") {
                marks += 5;
            }
        }
        $('#main').hide();
        $("#marks").text(marks);
        $("#correct-answer").text(marks / 5);
        //$('#correct-answer').text((marks / 25) * 100 + "%");
        
        $("#percentage").text((marks / 25) * 100 + "%");
        $("#Result").show();
        if ((marks / 5) >= 2) {
            $("#congrats, #trophy").show();
        }
        else{
            $("#congrats, #trophy").hide();
        }
    }

    $("#options").hide();

    // const response = fetch("data.json", {
    //     method: "GET", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, *cors, same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, *same-origin, omit
    //     headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: "follow", // manual, *follow, error
    //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     //  body: JSON.stringify(data), // body data type must match "Content-Type" header
    // });
    // console.log(response.json()); 

    //Attach API
    // $.getJSON("./jsondata/data.json",
    //     function (data) {

    //         alert(data);
    //         console.log(data);
    //     });


    // fetch('./Quiz%20App/jsondata/data.json')
    // .then(function (response) {
    //     return response.json();
    // })
    // .then(function (data) {

    //         if (count > answer.length - 1) {
    //             alert("Select Atleast 1 Option");
    //         }
    //         else {
    //             creating_result(data);
    //             clearInterval(timer);

    //         }
    //     });

    // })

    //on button click start

    $('#btn').click(function () {
       

        //alert("button clicked");
        $('#options, #mainBody').show();
        adding_Questions(myData.Questions, count);
        $('.start_page').hide();
        $('#prev').hide();
        $("#startQuiz").css("display","none");

        timer = setInterval(timer_function, 1000);

        function timer_function()
        {
            $('#time').text(time);
            if (time < 1) {
                clearInterval(timer);
                alert(" Out of time");
                creating_result(myData);
                $("#main").hide();
                $("#result").show();

            }
            time--;
        } 

    });

    //Select option
    $(".option").click(function () {

        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).siblings().attr('disabled','disabled');
        // answer[count] = $(this).html();
        let currentAnswer = $(this).html();
        
        if(myData.Questions[count].answer == currentAnswer){
            answer[count] = currentAnswer;
            $("#rightAns").show();
            $("#wrongAns").hide();
        }
        else{
            answer[count] = 0;
            $("#wrongAns").show();
            $("#rightAns").hide();
        }
    });

    // Next Questions
    $('#next').click(function () {
        $("#rightAns, #wrongAns").hide();
        let isSelected = $('.option').hasClass("active");
        $(".option").removeAttr('disabled');
        //alert(isSelected);

        // if (count > answer.length - 1) {
        //     alert("Select Atleast 1 Option")
        // }

        if (!isSelected) {
            alert("Select Atleast 1 Option")
        }
        else {
            count++;
            adding_Questions(myData.Questions, count);
            $("#prev").show();
            $(".option").removeClass("active");
            buttons_manager();
            selected_Answer();

        }
    });

    //Previous Question
    $('#prev').click(function () {
        $("#rightAns, #wrongAns").hide();
        $(".option").removeAttr('disabled');
        count--;
        adding_Questions(myData.Questions, count);
        buttons_manager();
        selected_Answer();
    });

    // //Finish Quiz  
    $('#finish').click(function () {
        let isSelected = $('.option').hasClass("active");
        // if (count > answer.length - 1) {
        //     alert("Select Atleast 1 Option");
        // }
        if (!isSelected) {
            alert("Select Atleast 1 Option");
        }
        else {
            creating_result(myData);
            clearInterval(timer); 
        }
    });

});