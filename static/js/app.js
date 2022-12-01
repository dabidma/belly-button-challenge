function plots(id){
    d3.json("data/samples.json").then((data => {
        console.log(data)
        let samples = data.samples
        let metadata = data.metadata
    }))
    
};