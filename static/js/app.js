function plots(id){
    d3.json("samples.json").then((data => {
        console.log(data)
        let samples = data.samples
        let metadata = data.metadata
    }))
    
};