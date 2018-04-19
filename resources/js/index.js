$(document).ready(function () {

    function SetSwipePicture(parkIndex, pictureIndex) {
        $(".parkImage").css("background-image", "url(resources/images/park-pictures/" + RawParkList[0].images[pictureIndex] + ".png)");

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



    $("#find #right-arrow").click(function () {
        currentParkPicIndex++;
        SetSwipePicture(currentParkIndex, currentParkPicIndex);

    })

    $("#find #left-arrow").click(function () {
        currentParkPicIndex--;
        SetSwipePicture(currentParkIndex, currentParkPicIndex);
    })

    $("#yes").click(function () {
        currentParkPicIndex = 0;
        console.log(currentParkPicIndex)
        YesList.push(RawParkList[currentParkIndex]);
        (RawParkList.splice(currentParkIndex, 1));

        currentParkPicIndex = 0;
        SetSwipePicture(0, currentParkPicIndex);

        // currentPark Index Never Changes?
        $("#myParkNum").html(YesList.length);
        $("#newParkNum").html(RawParkList.length)

        console.log(RawParkList)
        $("#parkName").html(RawParkList[0].name)
        $("#parkName").html(RawParkList[0].name)



        if ($("#yesParkName").html() == "") {
            $("#yesParkName").html(YesList[0].name)
            $("#openTime").html(YesList[0].open_hour)
            $("#closingTime").html(YesList[0].close_hour);
            $("#location").html(YesList[0].address + ", " + YesList[0].city + ", " + YesList[0].state + " " + YesList[0].zip)
            $("#price").html(YesList[0].price);
            $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + YesList[0].images[0] + ".png)");
        }


    })

    $("#no").click(function () {
        NoList.push(RawParkList[currentParkIndex]);
        (RawParkList.splice(currentParkIndex, 1));

        currentParkPicIndex = 0;
        SetSwipePicture(0, currentParkPicIndex);

        // currentPark Index Never Changes?
        $("#myParkNum").html(YesList.length);
        $("#newParkNum").html(RawParkList.length)
        console.log(RawParkList)
        console.log(currentParkIndex)

        $("#parkName").html(RawParkList[0].name)

        // get rid of current park index, always 0

    })

    $("#myParks #right-arrow").click(function () {
        yesParkIndex++;

        $("#yesParkName").html(YesList[yesParkIndex].name)
        $("#openTime").html(YesList[yesParkIndex].open_hour)
        $("#closingTime").html(YesList[yesParkIndex].close_hour);
        $("#location").html(YesList[yesParkIndex].address + ", " + YesList[yesParkIndex].city + ", " + YesList[yesParkIndex].state + " " + YesList[yesParkIndex].zip)
        $("#price").html(YesList[yesParkIndex].price);
        $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + YesList[yesParkIndex].images[0] + ".png)");
    })

    $("#myParks #left-arrow").click(function () {
        yesParkIndex--;

        $("#yesParkName").html(YesList[yesParkIndex].name)
        $("#openTime").html(YesList[yesParkIndex].open_hour)
        $("#closingTime").html(YesList[yesParkIndex].close_hour);
        $("#location").html(YesList[yesParkIndex].address + ", " + YesList[yesParkIndex].city + ", " + YesList[yesParkIndex].state + " " + YesList[yesParkIndex].zip)
        $("#price").html(YesList[yesParkIndex].price);
        $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + YesList[yesParkIndex].images[0] + ".png)");
    })
})