raw=`Dog
    Parrot
    Cat
    Mouse
    Hamster
    elephant
    horse
    rhino
    all might
    shibe
    dragon
    tiger
    lion
    batman
    superman
    deadpool
    spiderman`
animals=raw.split("\n")
for(i in animals){
    bMaker(animals[i])
}
console.log(animals)
var svalue = document.getElementById("bar")
$("#go").on("click", function(){
    bMaker(svalue.value)
})

$(document).on("click",".button",function(){
    search($(this).data("word"))
})

function search(inp){
    console.log("poop")
    $("#gifs").empty()
    $.ajax({
    url:`https://api.giphy.com/v1/gifs/search?api_key=1uG6Q49h6GKW2HdYLcKsjeYrWTt4hcEG&q=${inp}&limit=25&offset=0&rating=G&lang=en`,
    method:"GET"
    }).then(function(res){
        for(i=0;i<res.data.length;i++){
            console.log(res)

            image = res.data[i].images.fixed_width_still.url
            still = res.data[i].images.fixed_width_still.url
            animate = res.data[i].images.fixed_width.url
            rating = res.data[i].rating
            download = res.data[i].embed_url
            
            holder = $("<div>")
            r = $("<img>")
            rate = $("<p>")
            a = $("<a>")
            
            r.attr("src",image)
            r.attr("data-still", still)
            r.attr("data-animate",animate)
            r.attr("data-state","still")
            r.addClass("gif")

            rate.text(rating)

            // this would be a download link but I can't find the raw gif file
            // a.attr("href","")
            // a.attr("download",download)
            // a.text("download")

            $(holder).append(r)
            $(holder).append(rate)
            holder.addClass("col-lg-3")
            $("#gifs").append(holder)

        }
    })
}

function bMaker(input){
    button = $("<button>")
    button.data("word",input)
    button.text(input)
    button.addClass("button")
    
    button.attr("data-word",input)
    button.data("state","still")
    console.log(button.data("word"))
    $("#buttons").append(button)
}
$(document).on("click",".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    console.log(this)
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    
  });