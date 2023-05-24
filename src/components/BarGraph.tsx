import * as d3 from "d3";
import { ChessOpening } from "../models/ChessOpening";
import { useEffect, useState } from "react";
interface ChessBoardProps {
	chessOpenings: ChessOpening[];
}
interface WinRate {
	opening_name: string;
	black_wins: number;
	white_wins: number;
	tied: number;
}

function BarGraph(chessBoardProps: ChessBoardProps) {
	function getSubString(name: string) {
		return name.substring(name.indexOf(",") + 1).trim();
	}

	function getMaxHeight(data: WinRate[]) {
		const maxValues = [
			data[0].black_wins,
			data[0].white_wins,
			data[0].tied,
		];
		data.forEach((opening) => {
			if (opening.black_wins > maxValues[0]) {
				maxValues[0] = opening.black_wins;
			}
			if (opening.white_wins > maxValues[1]) {
				maxValues[1] = opening.white_wins;
			}
			if (opening.tied > maxValues[2]) {
				maxValues[2] = opening.tied;
			}
		});
		return Math.max(...maxValues);
	}

	function drawBarGraph() {
		d3.select("#bar-chart").remove();
		const data: WinRate[] = [];
		chessBoardProps.chessOpenings.forEach((op) => {
			const tied = op.num_games - (op.black_wins + op.white_wins);
			data.push({
				opening_name: op.opening_name,
				black_wins: op.black_wins,
				white_wins: op.white_wins,
				tied: tied,
			});
		});
		const bigSelect = data.length > 5;
		const additionalSize = bigSelect
			? (data.length - 1) * 100
			: (data.length - 1) * 200;
		const defaultSize = 400 + additionalSize;
		const margin = {
			top: 20,
			bottom: bigSelect ? 200 : 100,
			left: 70,
			right: 20,
		};
		const width = defaultSize - margin.left - margin.right;
		const height = bigSelect ? 600 : 400 - margin.top - margin.bottom;
		const barPadding = 2;
		const barWidth = width / data.length - barPadding;

		const xScale = d3
			.scaleBand()
			.domain(
				data.map(function (d) {
					return getSubString(d.opening_name);
				})
			)
			.range([0, width]);
		const yScale = d3
			.scaleLinear()
			.domain([0, getMaxHeight(data)])
			.range([height, 0]);

		const svg = d3
			.select("#main")
			.append("svg")
			.attr("id", "bar-chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.bottom + margin.top)
			.style("background-color", "transparent")
			.append("g")
			.attr(
				"transform",
				"translate(" + margin.left + "," + margin.top + ")"
			);

		const xAxis = d3.axisBottom(xScale).tickFormat(function (d, i) {
			const opening = data[i].opening_name;
			return getSubString(opening);
		});
		const yAxis = d3
			.axisLeft(yScale)
			.ticks(10)
			.tickFormat(d3.format(".0f"));

		svg.append("g")
			.attr("class", "yaxis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Percentage of win");

		svg.append("g")
			.attr("class", "xaxis")
			.attr("transform", `translate(0,${height})`)
			.call(xAxis)
			.selectAll("text")
			.attr("max-width", "50px")
			.style("text-anchor", "middle")
			.attr("transform", () => {
				return data.length > 5
					? `translate(0, ${60}) rotate(-45)`
					: `translate(0, ${40}) rotate(-15)`;
			});

		const colors = d3
			.scaleOrdinal()
			.domain(["Black", "White", "Tied"])
			.range(["black", "white", "grey"]);

		const barchartBlack = svg
			.selectAll(".barChartRectBlack")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return xScale(getSubString(d.opening_name));
			})
			.attr("y", function (d) {
				return yScale(d.black_wins);
			})
			.attr("height", function (d) {
				return height - yScale(d.black_wins);
			})
			.attr("width", barWidth / 3)
			.attr("fill", function (d) {
				return colors("black");
			});
		const barchartWhite = svg
			.selectAll(".barChartRectWhite")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function (d) {
				const position = xScale(getSubString(d.opening_name));
				if (position) return position + barWidth / 3;
				else return barWidth / 3;
			})
			.attr("y", function (d) {
				return yScale(d.white_wins);
			})
			.attr("height", function (d) {
				return height - yScale(d.white_wins);
			})
			.attr("width", barWidth / 3)
			.attr("fill", function (d) {
				return colors("white");
			});
		const barchartTie = svg
			.selectAll(".barChartRectTie")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function (d) {
				const position = xScale(getSubString(d.opening_name));
				if (position) return position + (barWidth / 3) * 2;
				else return (barWidth / 3) * 2;
			})
			.attr("y", function (d) {
				console.log(d.tied);
				return yScale(d.tied);
			})
			.attr("height", function (d) {
				return height - yScale(d.tied);
			})
			.attr("width", barWidth / 3)
			.attr("fill", function (d) {
				return colors("grey");
			});
	}

	useEffect(() => {
		drawBarGraph();
	}, [chessBoardProps.chessOpenings]);

	return <div></div>;
}

export default BarGraph;
