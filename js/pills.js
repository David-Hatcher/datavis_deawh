let firedOnce = false;
const printVals = (data) =>{
    for(let i = 0; i < data.length; i++){
        console.log(data[i]);
    }
}

const buildVis = (data,svg_name) => {
    let chart = d3.select(svg_name);
    let chart_width = $(svg_name).width();
    let chart_height = $(svg_name).height();
    margin = {
        left: 90,
        right: 40,
        bottom: 20,
        top: 20
    }
    let xDomain = [];
    for(let i = 0; i < data.length; i++){
        xDomain[i] = data[i].countyName;
    }
    let flatData = flattenData(data);
    let y = d3.scaleLog()
                .domain([1,d3.max(flatData, (d) => {return d.count;})]).nice()
                .range([chart_height - margin.bottom,margin.top]);
    let x = d3.scaleBand()
                .domain(xDomain)
                .range([margin.left + 20, chart_width - margin.right])
    let y_axis = d3.axisLeft().scale(y);
    let x_axis = d3.axisBottom().scale(x);
    chart.append("g").call(y_axis).attr("transform","translate(" + margin.left + ",0)")
    let xAxisTranslate = chart_height - margin.bottom;
    chart.append("g").call(x_axis).attr("transform","translate(0," + xAxisTranslate + ")");

    let colorArr = ["#0008A8","#8086F5"];
    let colorGroups = ["oxyCount","hydCount"];
    let color = d3.scaleOrdinal()
                    .domain(colorGroups)
                    .range(colorArr);
    let stackedData = d3.stack().keys(colorGroups)(data);
    let rect = chart.selectAll('rect')
                    .data(flatData)
                    .enter().append('rect')
                    .attr('x',(d,i) =>{
                        return x(d.countyName);
                    })
                    .attr('y', (d) =>{
                        return y(d.count);
                    })
                    .attr('width',(chart_width/flatData.length) - 10)
                    .attr('height',(d) =>{
                        return chart_height - margin.bottom - y(d.count);
                    })
                    .attr('fill','#0008a8')

    chart.append("text")
        .attr("transform","rotate(-90)")
        .attr("y",0)
        .attr("x",0 - (chart_height/2))
        .attr("dy","1em")
        .attr("class","y-label")
        .style("text-anchor", "middle")
        .style("font-weight","bold")
        .text("Quantity Purchased");

}

const flattenData = (data) => {
    let arr = [];
    for(i of data){
        let j = {
            countyName : i.countyName,
            count : i.oxyCount + i.hydCount
        }
        arr.push(j);
    }
    return arr;
}