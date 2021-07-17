// defining SVG area dimensions
var svgHeight = 850;
var svgWidth= 1000;
// defining the margins 
var margins = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 60
};
//defining dimensions of chart area
var chartWidth = svgWidth-margins.left-margins.right;
var chartHeight = svgHeight - margins.bottom-margins.top ;
console.log(chartHeight)
//selecting body to append svg and setting dimensions 
var svg = d3.select("#scatter").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//creating <g> element and translating to adhere to the margins 
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);




// read in CSV data
d3.csv("../data/data.csv").then(function(data){
    console.log(data)

    
    // cast relevant datasets to integers 
    var poverty = [];
    var smokes = [];
    var income = [];
    var obesity = [];
    data.forEach(function(data){
        //console.log(data.poverty)
        poverty.push(data.poverty); 
        smokes.push(data.smokes);
        income.push(data.income);
        obesity.push(data.obesity);
        
        data.income = +data.income; 
        data.smokes = +data.smokes;

        
        console.log(data.abbr)
    }) ;
    var pov = poverty.map((i)=>Number(i));
    var cigs = smokes.map((i)=>Number(i));
    var dollars = income.map((i)=>Number(i));
    var carbs = obesity.map((i)=>Number(i));
    
    
    console.log(pov)
    console.log(cigs)
    console.log(dollars)
    console.log(carbs)
    console.log(d3.max(cigs))
    console.log(d3.extent(dollars))
    
    //set scales 
    var xscale = d3.scaleLinear().domain([0, d3.max(cigs)])
        .range([0,chartWidth]);
    var yscale = d3.scaleLinear().domain([200, d3.max(dollars)])
        .range([svgHeight, 50]);
    // axesight,
    var xAxis= d3.axisBottom(xscale);
    var yAxis = d3.axisLeft(yscale);
    console.log(xscale)

    // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(xAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(yAxis);
// create data point bubble 
  var circles = chartGroup.selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  
  .attr("cx",d => xscale(d.smokes))
  .attr("cy",d => yscale(d.income))
  
  .attr("r", "6")
  .attr("fill", "pink")
  .attr("opacity", ".6")
  
    ;
// create state abbreviations in data point bubble 
 chartGroup.append("g")
 .selectAll("text")
 .data(data)
 .enter()
 .append("text")
 .attr("x", d => xscale(d.smokes) - 5)
 .attr("y", d => yscale(d.income) + 2)
 .style("font", "8px times")
 .text( d => d.abbr);
// create Axis labels 
 chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margins.left -3)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Income");

 chartGroup.append("text")
    .attr("transform", `translate(${chartWidth /2}, ${chartHeight + margins.top })`)
    .attr("class", "axisText")
    .text("Smoking rate");
 // Step 1: Initialize Tooltip
 var toolTip = d3.tip()
 .attr("class", "d3-tip")
 
 .html(function(d) {
   
   return (d.abbr);
 });

// Step 2: Create the tooltip in chartGroup.
chartGroup.call(toolTip);

// Step 3: Create "mouseover" event listener to display tooltip
circles.on("mouseover", function(d) {
 toolTip.show(d, this);
 
});
// Step 4: Create "mouseout" event listener to hide tooltip
 circles.on("mouseout", function(d) {
   toolTip.hide(d);
 });
});
