var svg = d3.select("svg"),
margin = {top: 20, right: 20, bottom: 30, left: 50},
width = 890,
height = 450,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

var x = d3.scaleTime()
.rangeRound([0, width]);

var y = d3.scaleLinear()
.rangeRound([height, 0]);
var dataAll = [];


if (window.workflowData != undefined) {
  var line = d3.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.sales); });
  var data = [];

  for (var i = 0; i < workflowData.length; i++) {
    data.push({
      date: parseTime(workflowData[i].date),
      sales: workflowData[i].sales
    });
  }

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.sales; }));

  g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .select(".domain")
  .remove();

  g.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Sales");

  g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line);

}
if (window.workflowData2 != undefined){
  var y = d3.scalePow().exponent(0.6)
  .rangeRound([height, 0]);

  var lines = [];
  for (var i = 0; i < workflowData2.length; i++) {
    var data = [];
    for (var j = 0; j < workflowData2[i].salesObjs.length; j++) {
      data.push({
        date: parseTime(workflowData2[i].salesObjs[j].date),
        sales: workflowData2[i].salesObjs[j].sales
      });
    }
    dataAll.push(data);
    var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.sales); });
    lines.push(line);
  }


  x.domain(d3.extent([new Date(2017, 8, 18), new Date(2018, 2, 28)]));
  y.domain(d3.extent([0, workflowMax]));

  g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .select(".domain")
  .remove();

  g.append("g")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")
  .text("Sales");

  for (var i = 0; i < dataAll.length; i++) {
    g.append("path")
    .datum(dataAll[i])
    .attr("fill", "none")
    .attr("stroke", d3.interpolateRainbow(i/dataAll.length) )
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", lines[i]);
  }


}
