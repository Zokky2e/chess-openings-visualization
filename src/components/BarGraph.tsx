// @ts-nocheck

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
			top: 60,
			bottom: bigSelect ? 200 : 120,
			left: 40,
			right: 20,
		};
		const width = defaultSize - margin.left - margin.right;
		const height = bigSelect ? 640 : 440 - margin.top - margin.bottom;
		const barPadding = 10;
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
			.select("#graphs-container")
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
			.attr("y", -30)
			.attr("x", width / 2)
			.style("font-size", "32px")
			.style("text-anchor", "middle")
			.style("fill", "white")
			.text("Number of games");

		svg.append("g")
			.attr("class", "xaxis")
			.attr("transform", `translate(0,${height})`)
			.call(xAxis)
			.selectAll(".tick")
			.selectAll("text")
			.style("font-size", data.length === 1 ? "24px" : "16px")
			.style("text-anchor", "middle")
			.attr("transform", () => {
				return data.length > 5
					? `translate(0, ${60}) rotate(-45)`
					: `translate(0, ${20})`;
			})
			.text("");

		svg.selectAll(".xaxis .tick text")
			.selectAll("tspan")
			.data(function (d) {
				return d.split(",");
			})
			.enter()
			.append("tspan")
			.attr("x", 0)
			.attr("dy", "1em")
			.text(function (d) {
				return d;
			});

		const colors = d3
			.scaleOrdinal()
			.domain(["Black", "White", "Tied"])
			.range(["#000040", "#FFFDD0", "#C0C0C0"]);

		const barchartBlack = svg
			.selectAll(".barChartRectBlack")
			.data(data)
			.enter()
			.append("g");

		barchartBlack
			.append("rect")
			.attr("x", function (d) {
				return xScale(getSubString(d.opening_name));
			})
			.attr("y", height)
			.attr("height", 0)
			.attr("width", barWidth / 3)
			.attr("fill", function (d) {
				return colors("black");
			})
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yScale(d.black_wins);
			})
			.attr("height", function (d) {
				return height - yScale(d.black_wins);
			});
		barchartBlack
			.append("text")
			.attr("x", function (d) {
				return xScale(getSubString(d.opening_name));
			})
			.attr("y", height)
			.attr("text-anchor", "middle")
			.attr(
				"transform",
				"translate(" + barWidth / 3 / 2 + "," + -10 + ")"
			)
			.style("fill", "white")
			.text(function (d) {
				return d.black_wins.toFixed(0);
			})
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yScale(d.black_wins);
			});

		const barchartWhite = svg
			.selectAll(".barChartRectWhite")
			.data(data)
			.enter()
			.append("g");
		barchartWhite
			.append("rect")
			.attr("x", function (d) {
				const position = xScale(getSubString(d.opening_name));
				if (position) return position + barWidth / 3;
				else return barWidth / 3;
			})
			.attr("y", height)
			.attr("height", 0)
			.attr("width", barWidth / 3)
			.attr("fill", function (d) {
				return colors("white");
			})
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yScale(d.white_wins);
			})
			.attr("height", function (d) {
				return height - yScale(d.white_wins);
			});
		barchartWhite
			.append("text")
			.attr("x", function (d) {
				return xScale(getSubString(d.opening_name));
			})
			.attr("y", height)
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + barWidth / 2 + "," + -10 + ")")
			.style("fill", "white")
			.text(function (d) {
				return d.white_wins.toFixed(0);
			})
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yScale(d.white_wins);
			});

		const barchartTie = svg
			.selectAll(".barChartRectTie")
			.data(data)
			.enter()
			.append("g");
		barchartTie
			.append("rect")
			.attr("x", function (d) {
				const position = xScale(getSubString(d.opening_name));
				if (position) return position + (barWidth / 3) * 2;
				else return (barWidth / 3) * 2;
			})
			.attr("y", height)
			.attr("height", 0)
			.attr("width", barWidth / 3)
			.attr("fill", function (d) {
				return colors("grey");
			})
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yScale(d.tied);
			})
			.attr("height", function (d) {
				return height - yScale(d.tied);
			});
		barchartTie
			.append("text")
			.attr("x", function (d) {
				return xScale(getSubString(d.opening_name));
			})
			.attr("y", height)
			.attr("text-anchor", "middle")
			.style("fill", "white")
			.attr(
				"transform",
				"translate(" + (barWidth - barWidth / 3 / 2) + "," + -10 + ")"
			)
			.text(function (d) {
				return d.tied.toFixed(0);
			})
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yScale(d.tied);
			});
	}

	useEffect(() => {
		drawBarGraph();
	}, [chessBoardProps.chessOpenings]);

	return <div></div>;
}

export default BarGraph;
