function init() {
  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  d3.json(url).then(function(data) {
    // console.log(data);
    let dropdownMenu = d3.select("#selDataset");
    let names = data.names;
    names.forEach(nameId => {dropdownMenu.append("option").text(nameId).property("value")})
    console.log(names[0])
    optionChanged(names[0])
    barChart(names[0])
  })
};   

function optionChanged(id) {
    metaData(id)
}

// Function to populate demographic data
function metaData(id) {
  let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  d3.json(url).then(function(data) {
    // console.log(data);
    let demoData = d3.select("#sample-metadata");
    let meta = data.metadata;
    // console.log(meta)
    let filterData = meta.filter(meta => meta.id == id)
    // console.log(filterData)
    firstMeta = filterData[0]
    demoData.html("")
    Object.entries(firstMeta).forEach(([key, value]) => {demoData.append("p").text(`${key}:${value}`)})
  })
}

// Functionn to create horizontal bar chart
function barChart (id) {
    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url).then(function(data) {
        console.log(data);
        // let demoData = d3.select("#sample-metadata");
        let samples = data.samples;
        let filterData = samples.filter(samples => samples.id == id)
        console.log(filterData)
        let firstMeta = filterData[0]
        let sampleValues = firstMeta.sample_values.slice(0,10)
        let otuIds = firstMeta.otu_ids.slice(0,10)
        let otuLabels = firstMeta.otu_labels.slice(0,10)
        console.log(sampleValues)

        let barData = [{
            x: sampleValues,
            y: otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }];
  
        Plotly.newPlot("bar", barData);
    })
}

//Calling the init function
init();

