function drawdraw(ddd) {
  var svg = d3.select("#drawingFunction"),
  margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = 890,
  height = 450,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
  var x = d3.scaleTime()
  .rangeRound([0, width]);
  var names = [];

  for (var i = 0; i < biz2data.length; i++) {
    for (var j = 0; j < biz2data[i].children.length; j++) {
      for (var k = 0; k< ddd.length; k++) {
        if (biz2data[i].children[j].store_id == ddd[k].store_id ) {
          names.push(biz2data[i].children[j].name);
        }
      }
    }
  }
  var y = d3.scaleLinear()
  .rangeRound([height, 0]);
  var dataAll = [];

  if (ddd != undefined){
    var y = d3.scalePow().exponent(0.6)
    .rangeRound([height, 0]);

    var lines = [];
    for (var i = 0; i < ddd.length; i++) {
      var data = [];
      for (var j = 0; j < ddd[i].salesObjs.length; j++) {
        data.push({
          id: ddd[i].store_id,
          date: parseTime(ddd[i].salesObjs[j].date),
          sales: ddd[i].salesObjs[j].sales
        });
      }
      dataAll.push(data);
      var line = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.sales); });
      lines.push(line);
    }

    var tempMax = 0;
    for (var i = 0; i < ddd.length; i++) {
      if (ddd[i].salesmax>tempMax){
        tempMax = ddd[i].salesmax;
      }
    }
    x.domain(d3.extent([new Date(2017, 8, 18), new Date(2018, 2, 28)]));
    y.domain(d3.extent([0, tempMax]));

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
}
