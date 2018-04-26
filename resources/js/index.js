$(document).ready(function () {
    $(".yesParkImage").css("background-image", "url(resources/images/frown.png)");
    $(".yesParkImage").after("<p id='emptyMessage'>No Parks To Show</p>")

    function SetSwipePicture(parkIndex, pictureIndex) {
        $(".parkImage").css("background-image", "url(resources/images/park-pictures/" + RawParkList[0].images[pictureIndex] + ")");

    }

    var RawParkList = new Array();
    var YesList = new Array();
    var NoList = new Array();
    var fileInforamtion = "";
    var parkInfoFileLocation = "resources/data/park-info.json"
    var currentParkIndex = 0;
    var currentParkPicIndex = 0
    var yesParkIndex = 0;

    $.ajax({
        url: parkInfoFileLocation,
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data)
            fileInforamtion = data;
        }
    });

    fileInforamtion.forEach(function (park) {
        RawParkList.push(park);
    });

    $("#myParkNum").html(YesList.length);
    $("#newParkNum").html(RawParkList.length)

    SetSwipePicture(currentParkIndex, currentParkPicIndex);
    $("#parkName").html(RawParkList[0].name)

    $("#yes").click(function () {
        if (RawParkList.length > 1) {
            $("#emptyMessage").remove();
            currentParkPicIndex = 0;
            YesList.push(RawParkList[currentParkIndex]);
            (RawParkList.splice(currentParkIndex, 1));

            currentParkPicIndex = 0;
            SetSwipePicture(0, currentParkPicIndex);

            // currentPark Index Never Changes?
            $("#myParkNum").html(YesList.length);
            $("#newParkNum").html(RawParkList.length)

            $("#parkName").html(RawParkList[0].name)

            if ($("#yesParkName").html() == "") {
                $("#openTime").html(YesList[0].open_hour)
                $("#closingTime").html(YesList[0].close_hour);
                $("#location").html(YesList[0].address + ", " + YesList[0].city + ", " + YesList[0].state + " " + YesList[0].zip)
                $("#price").html(YesList[0].price);
                $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + YesList[0].images[0] + ")");
            }
        } else {
            currentParkPicIndex = 0;
            YesList.push(RawParkList[currentParkIndex]);
            (RawParkList.splice(currentParkIndex, 1));
            $(".parkImage").css("background-image", "url(resources/images/frown.png)");
            $("#parkName").html("No Parks Left To Show")
            $("#parkName").css("color", "red");
            $("#myParkNum").html(YesList.length);
            $("#newParkNum").html(RawParkList.length)
            
        }
        console.log(RawParkList)
    })

    $("#no").click(function () {
        if (RawParkList.length > 1) {
            $("#emptyMessage").remove();
            NoList.push(RawParkList[currentParkIndex]);
            (RawParkList.splice(currentParkIndex, 1));

            currentParkPicIndex = 0;
            SetSwipePicture(0, currentParkPicIndex);

            $("#myParkNum").html(YesList.length);
            $("#newParkNum").html(RawParkList.length)
   

            $("#parkName").html(RawParkList[0].name)

        } else {
            $(".parkImage").css("background-image", "url(resources/images/frown.png)");
            $("#parkName").html("No Parks Left To Show")
            $("#parkName").css("color", "red");
            $("#myParkNum").html(YesList.length);
            $("#newParkNum").html(RawParkList.length)
        }
    })

    $(".myParkArrows#right-arrow").click(function () {
        try {
            yesParkIndex++;
            $("#yesParkName").html(YesList[yesParkIndex].name)
            $("#openTime").html(YesList[yesParkIndex].open_hour)
            $("#closingTime").html(YesList[yesParkIndex].close_hour);
            $("#location").html(YesList[yesParkIndex].address + ", " + YesList[yesParkIndex].city + ", " + YesList[yesParkIndex].state + " " + YesList[yesParkIndex].zip)
            $("#price").html(YesList[yesParkIndex].price);
            $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + YesList[yesParkIndex].images[0] + ")");
        } catch (error) {
            yesParkIndex--;
        }
    })

    $(".myParkArrows#left-arrow").click(function () {
        try {
            yesParkIndex--;
            $("#yesParkName").html(YesList[yesParkIndex].name)
            $("#openTime").html(YesList[yesParkIndex].open_hour)
            $("#closingTime").html(YesList[yesParkIndex].close_hour);
            $("#location").html(YesList[yesParkIndex].address + ", " + YesList[yesParkIndex].city + ", " + YesList[yesParkIndex].state + " " + YesList[yesParkIndex].zip)
            $("#price").html(YesList[yesParkIndex].price);
            $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + YesList[yesParkIndex].images[0] + ")");
        } catch (error) {
            yesParkIndex++;
        }
    })

    $(".findArrows#right-arrow").click(function () {
        currentParkPicIndex++;
        SetSwipePicture(currentParkIndex, currentParkPicIndex);

    })

    $(".findArrows#left-arrow").click(function () {
        currentParkPicIndex--;
        SetSwipePicture(currentParkIndex, currentParkPicIndex);
    })
})