function RetrieveParkInformation() {
    var fileInforamtion = "";
    var pathToParkInfo = "resources/data/park-info.json"

    $.ajax({
        url: pathToParkInfo,
        dataType: 'json',
        async: false,
        success: function (data) {
            fileInforamtion = data;
        }
    });

    return fileInforamtion
}

function CreateRawParkList() {
    var ParkList = new Array();
    var fileInformation = RetrieveParkInformation();

    fileInformation.forEach(function (park) {
        ParkList.push(park);
    });

    return ParkList;
}

function SetHeaderInfo(yesList, rawParkList) {
    $("#myParkNum").html(yesList.length);
    $("#newParkNum").html(rawParkList.length)
}

function SetSwipePicture(parkList, pictureIndex) {
    var pathToParkPictures = "resources/images/park-pictures/";
    var thisPark = parkList[0];
    $(".parkImage").css("background-image", "url(" + pathToParkPictures + thisPark.images[pictureIndex] + ")");
}

function SetEmptyContainer(container, textField) {
    $(container).css("background-image", "url(resources/images/frown.png)");
    if (textField == null) {
        $(container).after("<p id='emptyMessage'>No Parks To Show</p>")

    } else {
        $("#parkName").html("No Parks Left To Show")
        $("#parkName").css("color", "red");
    }

}

function SetMyParksContainerInfo(parkList, index) {
    var thisPark = parkList[index]
    var nextPark = [parkList[index + 1]]
    console.log(thisPark)

    $("#yesParkName").html(thisPark.name)
    $("#openTime").html(thisPark.open_hour)
    $("#closingTime").html(thisPark.close_hour);
    $("#location").html(thisPark.address + ", " + thisPark.city + ", " + thisPark.state + " " + thisPark.zip)
    $("#price").html(thisPark.price);
    $(".yesParkImage").css("background-image", "url(resources/images/park-pictures/" + thisPark.images[0] + ")");
}

function AddToList(parkList, rawParkList) {
    $("#emptyMessage").remove();
    parkList.push(rawParkList[0]);
    (rawParkList.splice(0, 1));
    $("#parkName").html(rawParkList[0].name)
}

$(document).ready(function () {

    var YesList = new Array();
    var NoList = new Array();
    var currentParkPicIndex = 0
    var yesParkIndex = 0;

    var RawParkList = CreateRawParkList();

    SetEmptyContainer($(".yesParkImage"))
    SetHeaderInfo(YesList, RawParkList);
    SetSwipePicture(RawParkList, currentParkPicIndex);

    $("#parkName").html(RawParkList[0].name)

    $("#yes").click(function () {
        if (RawParkList.length > 1) {
            currentParkPicIndex = 0;
            AddToList(YesList, RawParkList)

            SetSwipePicture(RawParkList, currentParkPicIndex);
            SetHeaderInfo(YesList, RawParkList);
            if ($("#yesParkName").html() == "") {
                SetMyParksContainerInfo(YesList, 0)
            }
        } else {
            currentParkPicIndex = 0;
            YesList.push(RawParkList[0]);
            (RawParkList.splice(0, 1));
            SetEmptyContainer($(".parkImage"), $("#parkName"))
            SetHeaderInfo(YesList, RawParkList);
        }
    })

    $("#no").click(function () {
        if (RawParkList.length > 1) {
            currentParkPicIndex = 0;
            AddToList(NoList, RawParkList)
            SetSwipePicture(RawParkList, currentParkPicIndex);
            SetHeaderInfo(YesList, RawParkList);
        } else {
            SetEmptyContainer($(".parkImage"), $("#parkName"))
            SetHeaderInfo(YesList, RawParkList);
        }
    })

    $(".myParkArrows#right-arrow").click(function () {
        yesParkIndex++;
        SetMyParksContainerInfo(YesList, yesParkIndex);
    })

    $(".myParkArrows#left-arrow").click(function () {
        yesParkIndex--;
        SetMyParksContainerInfo(YesList, yesParkIndex);
    })

    $(".findArrows#right-arrow").click(function () {
        currentParkPicIndex++;
        SetSwipePicture(RawParkList, currentParkPicIndex);

    })

    $(".findArrows#left-arrow").click(function () {
        currentParkPicIndex--;
        SetSwipePicture(RawParkList, currentParkPicIndex);
    })
})