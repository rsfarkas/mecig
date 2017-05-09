$( document ).ready(function() {


  var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 660 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


  var svg = d3.select("#script1Here").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("../data/test.csv", function(error, data) {
    if (error) throw error;
    var dateParser = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
    var timeParser = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
    var formatDate = d3.time.format("%y-%m-%d");
    var formatTime = d3.time.format("%H:%M:%S");
    var parseBack = d3.time.format("%y-%m-%d").parse;

    data.forEach(function(d) {
      d.date = dateParser(d["Date"]);
      var today = new Date();
      var time = d.date;
      today.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
      d.time = today;
      d.formattedDate = parseBack(formatDate(d.date));
    });

    var x = d3.time.scale()
    .range([0, width]);

    var start_of_day = new Date();
    start_of_day.setHours(0,0,0,0);
    var end_of_day = new Date();
    end_of_day.setHours(23,59,59,999);

    var y = d3.time.scale()
    .domain([start_of_day, end_of_day])
    .nice(d3.time.day)
    .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.day, 1);

    var yValue = function(d) {
      return d.time;
    };
    var yMap = function(d) {
      return yScale(yValue(d));
    };

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(24)
    .tickFormat(d3.time.format("%H:%M"));

    x.domain(d3.extent(data, function(d) { return d.formattedDate; })).nice();
    y.domain(d3.extent(data, function(d) { return d.time; })).nice();

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Day of Week");

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Time of Day")

    svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 5)
    .attr("cx", function(d) { return x(d.formattedDate); })
    .attr("cy", function(d) { return y(d.time); })
    .style("fill", function(d) { return color(d.species); });
  });

  $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
});