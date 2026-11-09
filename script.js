const data = [
    { continent: "Asia", places: 5 },
    { continent: "North America", places: 7 },
    { continent: "Europe", places: 9 },
    { continent: "Africa", places: 0 },
    { continent: "South America", places: 0 },
    { continent: "Antarctica", places: 0 },
    { continent: "Oceania", places: 0 }
];

// Set chart size
const width = 850;
const height = 450;

const margin = {
    top: 40,
    right: 30,
    bottom: 110,
    left: 60
};

// Create SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("width", "100%");

// X-axis: Continents
const x = d3.scaleBand()
    .domain(data.map(d => d.continent))
    .range([margin.left, width - margin.right])
    .padding(0.3);

// Y-axis: Number of places
const y = d3.scaleLinear()
    .domain([0, 14])
    .range([height - margin.bottom, margin.top]);

// Draw bars
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.continent))
    .attr("y", d => y(d.places))
    .attr("width", x.bandwidth())
    .attr("height", d =>
        height - margin.bottom - y(d.places)
    )
    .attr("fill", "#3D6A87");

// Add X-axis
svg.append("g")
    .attr("transform",
        `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "middle");

// Add Y-axis
svg.append("g")
    .attr("transform",
        `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(7));

// Add values above bars
svg.selectAll(".value-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "value-label")
    .attr("x", d =>
        x(d.continent) + x.bandwidth() / 2
    )
    .attr("y", d => y(d.places) - 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .text(d => d.places);




