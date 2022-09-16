const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "2368c73193msh6744a705232e88ap13e1bfjsndb3ae68e75b2",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
};
//hide coin data card
$("#coin-card").hide();
//hide button until loading finished
$(".button").click(btnClick);
$(".button").hide();
var coinData;
var selected;

//declare function to build list
function updateCoins() {
    for (i = 0; i < coinData.length; i++) {
        var newOption = $(
            `<option class="` + i + `">` + coinData[i].name + "</option>"
        );
        $("#coin-list").append(newOption);
    }
}
//button function
function btnClick(event) {
    event.preventDefault();
    selected = coinData[$("#coin-list").find(":selected").attr("class")];
    console.log(selected);
    addRow();
    $("#coin-card").show();

}
// render table function
function addRow(){
  newRow = $(`<tr id="` + selected.uuid +`">
  <th scope="row">`+selected.symbol+`</th>
    <td>`+selected.name+`</td>
    <td>`+selected.price+`</td>
    <td>`+selected.marketCap+`</td>
    <td><img src="`+selected.iconUrl+`" width="25" height="25"></td>
    <td><btn class="`+selected.symbol+`btn btn">Battle It</btn></td>
    </tr>`)
  $("#tbod").append(newRow);
}

//get data, write to CoinData, and show button
fetch(
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0",
    options
)
    .then((response) => response.json())
    .then(function (response) {
        coinData = response.data.coins;
        updateCoins();
        $(".button").show();
    })
    .catch((err) => console.error(err));
