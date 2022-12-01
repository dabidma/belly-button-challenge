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

        //creating the bar chart
        //trace
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
    })
    
};
function init(){
    d3.json(url).then(function (data){
        let names = data.names;
        grabData_createCharts(names[0]);
    });
};
init();