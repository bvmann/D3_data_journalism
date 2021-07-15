// defining SVG area dimensions
var svgHeight = 1000;
var svgWidth= 900;
// defining the margins 
var margins = {
    top: 30,
    right: 30,
    bottom: 30,
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

  var circles = chartGroup.selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  
  .attr("cx",d => xscale(d.smokes))
  .attr("cy",d => yscale(d.income))
  
  .attr("r", "10")
  .attr("fill", "pink")
  .attr("opacity", ".6")
  
    ;
});