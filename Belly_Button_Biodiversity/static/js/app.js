function buildMetadataNoJutsu(sample) {
  // @TODO: Complete the following function that builds the metadata panel
    console.log(sample);
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Use `d3.json` to fetch the metadata for a sample
    d3.json("static/samples.json").then((samplesData) => {
      samplesData.metadata.forEach((metadatum) => {
        if (sample.id == metadatum.id) {
          // Use `Object.entries` to add each key and value pair to the panel
          Object.entries(metadatum).forEach(([key,value]) => {
            panel
              .append("h6")
              .text(`${key}: ${value}`);
              console.log(key, value);
          });
        }
      });
    });
}

function buildChartsNoJutsu(sample) {
// @TODO: Build a Bubble Chart using the sample data  
  var bubbleLayout = {
    margin: {t: 0},
    hovermode: "closest",
    xaxis: {title: "OTU ID"}
  };
  
    var bubbleData = [
      {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: "markers",
        marker: {
          size: sample.sample_values,
          color: sample.otu_ids,
          colorscale: "Earth"
        }
      }
    ];
  
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  sample_values = sample.sample_values.slice(0,10);
  otu_ids = sample.otu_ids.slice(0,10);
  otu_labels = sample.otu_labels.slice(0,10);
  var trace1 = {
    labels: otu_ids,
    hovertext: otu_labels,
    hoverinfo: "hovertext",
    values: sample_values,
    type: 'pie'
  };
  var data = [trace1];
  var layout = {
    title: "'Pie' Chart",
  };
  Plotly.newPlot("pie", data, layout);
}

function initNoJutsu() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("static/samples.json").then((samplesData) => {
    samplesData.samples.forEach((sample) => {
      selector
        .append("option")
        .text(sample.id)
        .property("value", JSON.stringify(sample));
    });
    // Use the first sample from the list to build the initial plots
    const firstSample = samplesData.samples[0];
    buildChartsNoJutsu(firstSample);
    buildMetadataNoJutsu(firstSample);
  });
}
function optionChangedNoJutsu(newSample) {
  // Fetch new data each time a new sample is selected
  var Sample = JSON.parse(newSample);
  buildChartsNoJutsu(Sample);
  buildMetadataNoJutsu(Sample);
}
// Initialize the dashboard
initNoJutsu();