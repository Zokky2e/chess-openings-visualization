import * as d3 from "d3";
import { ChessOpening } from "../models/ChessOpening";
import { useEffect, useState } from "react";
interface ChessBoardProps {
	chessOpening: ChessOpening;
}
interface WinRate {
	percent: number;
	person: string;
}

function PieChart(chessBoardProps: ChessBoardProps) {
	const chartSize = 400;
	const [winRates, setWinRates] = useState<WinRate[]>([]);
	const colors = ["white", "black", "gray"];
	useEffect(() => {
		const tiePercent =
			chessBoardProps.chessOpening.perc_white_win +
			chessBoardProps.chessOpening.perc_black_win;
		setWinRates([
			{
				percent: chessBoardProps.chessOpening.perc_white_win,
				person: "White wins",
			},
			{
				percent: chessBoardProps.chessOpening.perc_black_win,
				person: "Black wins",
			},
			{
				percent: 100 - tiePercent,
				person: "Tied",
			},
		]);
	}, []);
	function createPieChart() {
		d3.select("#pie-chart").remove();
		const svg = d3
			.select("#main")
			.append("svg")
			.attr("id", "pie-chart")
			.attr("width", chartSize)
			.attr("height", chartSize);

		const pie = d3.pie<WinRate>().value((d) => d.percent);
		const arc = d3
			.arc<d3.PieArcDatum<WinRate>>()
			.innerRadius(0)
			.outerRadius(200);
		const arcs = pie(winRates);
		const pieArcs = svg
			.selectAll("path")
			.data(arcs)
			.enter()
			.append("g")
			.attr("transform", "translate(" + 200 + "," + 200 + ")");

		pieArcs
			.append("path")
			.attr("fill", (_, i) => {
				return colors[i];
			})
			.attr("d", arc);

		pieArcs
			.append("text")
			.attr("transform", (d) => {
				const c = arc.centroid(d);
				const x = c[0];
				const y = c[1];
				const angleRad = Math.atan2(y, x);
				const textRadius = 100;
				const labelX = textRadius * Math.cos(angleRad);
				const labelY = textRadius * Math.sin(angleRad);
				return "translate(" + labelX + "," + labelY + ")";
			})
			.attr("text-anchor", "middle")
			.attr("fill", (_, i) => {
				return colors[i] === "black" ? "white" : "black";
			})
			.text((d) => {
				return d.data.person + "(" + d.data.percent.toFixed(2) + "%)";
			});
	}
	useEffect(() => {
		createPieChart();
	}, [winRates]);
	return <div></div>;
}

export default PieChart;
