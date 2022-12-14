//provided url path
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"; 

function grabData_createCharts(id){
    d3.json(url).then(function (data) {
        //seperate the data into variables
        let metadata = data.metadata;
        let samples = data.samples;

        //create a filter for each test id
        let first_md = metadata.filter(info => info.id == id)[0];
        let first_sample = samples.filter(info => info.id == id)[0];
        
        //bar and bubble chart variables from sample
        let sample_values = first_sample.sample_values;
        // console.log(sample_values);
        let otu_ids = first_sample.otu_ids;
        // console.log(otu_ids);
        let otu_labels = first_sample.otu_labels;
        // console.log(otu_labels);

        //wash frequency variable from metadata
        let wash_frequency = first_md.wfreq;
        // console.log(wash_frequency);

        //creating the bar chart
        //bar chart trace
        let bar_data = [{
            //grab top 10 OTU's
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).reverse().map(otu_id => `OTU ${otu_id}`),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            //make horizontal
            orientation: 'h'
        }];

        //creating the layout
        let bar_layout = {
            title: "Top 10 OTU's",
            xaxis: {title: 'Sample Values'}
        };
        
        Plotly.newPlot('bar', bar_data, bar_layout);

        //creating the bubble chart data
        //bubble chart trace
        let bubble_data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            //marker size and color
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }];
        //bubble chart layout
        let bubble_layout = {
            title: 'Belly Button Samples by OTU ID',
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Sample Values'}
        };

        Plotly.newPlot('bubble', bubble_data, bubble_layout);

        //Creating the guage chart
        //gauge chart trace
        let gauge_data = [{
            domain: {x: [0,1], y: [0,1]},
            value: wash_frequency,
            title: {text: 'Belly Button Washing Frequency (Scrubs per Week)'},
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                axis: {range: [0,9]},
                steps: [
                    {range: [0, 1], color: '#f7f2ec'},
                    {range: [1, 2], color: '#f3f0e5'},
                    {range: [2, 3], color: '#e9e7c9'},
                    {range: [3, 4], color: '#e5e9b0'},
                    {range: [4, 5], color: '#d5e595'},
                    {range: [5, 6], color: '#b7cd8b'},
                    {range: [6, 7], color: '#87c080'},
                    {range: [7, 8], color: '#85bc8b'},
                    {range: [8, 9], color: '#80b586'}
                ]
            }
        }];

        //gauge chart layout
        let gauge_layout = {
            width: 400,
            height: 300,
            margin: { t: 0, b: 0 } 
        };

        Plotly.newPlot('gauge', gauge_data, gauge_layout);
    });

};
//function to fill in demo box
function demographic_info(id){
    //grab metadata
    d3.json(url).then(function (data) {
        let metadata = data.metadata;
        
        //filter the meta data
        let first_md =  metadata.filter(info => info.id == id)[0];
        console.log(first_md)

        //select the demographic box
        let demo_data = d3.select('#sample-metadata');

        //delete anything in the box
        demo_data.html('');

        Object.entries(first_md).forEach(([key, value]) => {
            demo_data.append('p').text(`${key}: ${value}`)
        });
    });
};
//function to update all the charts
function optionChanged(id){
    console.log(`Updated for test subject ${id}`);
    grabData_createCharts(id);
    demographic_info(id)
};
function init(){
    //dropdown menu variable
    let dropwdown = d3.select('#selDataset');

    //preload all data
    d3.json(url).then(function (data){
        let names = data.names;
        //input variables for the dropdown menu
        names.forEach(name => {
            dropwdown.append('option').text(name).property('value', name)
        });
        grabData_createCharts(names[0]);
        demographic_info(names[0]);
    });
};
init();