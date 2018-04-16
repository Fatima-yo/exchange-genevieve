 			// var chart;
    //         var chartData = [
    //             {
    //                 "year": 'Jan',
    //                 "GXVC": 0.11,
    //                 "stock": 0
    //             },
    //             {
    //                 "year": 'Feb',
    //                 "GXVC": 0.09,
    //                 "stock": .02
    //             },
    //             {
    //                 "year": 'Mar',
    //                 "GXVC": .02,
    //                 "stock": .04
    //             },
    //             {
    //                 "year": 'Apr',
    //                 "GXVC": .025,
    //                 "stock": 0.07
    //             },
    //             {
    //                 "year": 'May',
    //                 "GXVC": .01,
    //                 "stock": 0.065
    //             },
    //             {
    //                 "year": 'Jun',
    //                 "GXVC": 0.03,
    //                 "stock": 0.082
    //             },
    //             {
    //                 "year": 'Jul',
    //                 "GXVC":0.01,
    //                 "stock": 0.12
    //             },
    //             {
    //                 "year": 'Aug',
    //                 "GXVC": 0.056,
    //                 "stock": 0.062
    //             },
    //             {
    //                 "year": 'Sep',
    //                 "GXVC": 0.05,
    //                 "stock": 0.01
    //             },
    //             {
    //                 "year": 'Oct',
    //                 "GXVC": .07,
    //                 "stock": 0.02
    //             },
    //             {
    //                 "year": 'Nov',
    //                 "GXVC": .11,
    //                 "stock": 0.03
    //             },
				// {
    //                 "year": 'Dec',
    //                 "GXVC":.12,
    //                 "stock": 0
    //             }
    //         ];

    //         AmCharts.ready(function () {
    //             // SERIAL CHART
    //             chart = new AmCharts.AmSerialChart();
    //             chart.dataProvider = chartData;
    //             chart.categoryField = "year";
    //             chart.startDuration = 0;
    //             chart.balloon.color = "#000000";
                                                 
    //             // AXES
    //             // category
    //             var categoryAxis = chart.categoryAxis;
    //             categoryAxis.fillAlpha = 0;
    //             categoryAxis.fillColor = "";
    //             categoryAxis.gridAlpha = 0;
    //             categoryAxis.axisAlpha = 0;
    //             categoryAxis.labelColor = "#fff";
    //             categoryAxis.gridPosition = "start";
    //             categoryAxis.position = "bottom";

    //             // value
    //             var valueAxis = new AmCharts.ValueAxis();
    //             valueAxis.title = "";
    //             valueAxis.dashLength = 0;
    //             valueAxis.axisAlpha = 0;
    //             valueAxis.minimum = 0.12;
    //             valueAxis.maximum = 0;
    //             valueAxis.integersOnly = false;
    //             valueAxis.gridCount = 0;
    //             valueAxis.reversed = false; // this line makes the value axis reversed
    //             chart.addValueAxis(valueAxis);

    //             // GRAPHS             

    //             // GXVC graph
    //             var graph = new AmCharts.AmGraph();
    //             graph.title = "GXVC";
    //             graph.valueField = "GXVC";
    //             graph.balloonText = "place taken by GXVC in [[category]]: [[value]]";
    //             graph.bullet = "round";
    //             graph.lineThickness= 3;
    //             graph.lineColor= "#bd9852";
				// graph.bulletBorderColor= "#313131";
    //             graph.bulletBorderAlpha= 1;
    //             chart.addGraph(graph);

    //             // United Kingdom graph
    //             var graph = new AmCharts.AmGraph();
    //             graph.title = "United Kingdom";
    //             graph.valueField = "stock";
    //             graph.balloonText = "place taken by stock in [[category]]: [[value]]";
    //             graph.bullet = "round";
				// graph.lineThickness= 3;
				// graph.lineColor= "#474747";
				// graph.bulletBorderColor= "#313131";
    //             graph.bulletBorderAlpha= 1;
    //             chart.addGraph(graph);
				          

    //             // CURSOR
    //             var chartCursor = new AmCharts.ChartCursor();
    //             chartCursor.cursorPosition = "mouse";
    //             chartCursor.zoomable = false;
    //             chartCursor.cursorAlpha = 0;
    //             chart.addChartCursor(chartCursor);

    //             // LEGEND
    //             //var legend = new AmCharts.AmLegend();
    //             //legend.useGraphSettings = true;
    //             //chart.addLegend(legend);

    //             // WRITE
    //             chart.write("chartdiv");
    //         });
 			// var chart;
    //         var chartData = [
    //             {
    //                 "year": 'Jan',
    //                 "GXVC": 0.11,
    //                 "stock": 0
    //             },
    //             {
    //                 "year": 'Feb',
    //                 "GXVC": 0.09,
    //                 "stock": .02
    //             },
    //             {
    //                 "year": 'Mar',
    //                 "GXVC": .02,
    //                 "stock": .04
    //             },
    //             {
    //                 "year": 'Apr',
    //                 "GXVC": .025,
    //                 "stock": 0.07
    //             },
    //             {
    //                 "year": 'May',
    //                 "GXVC": .01,
    //                 "stock": 0.065
    //             },
    //             {
    //                 "year": 'Jun',
    //                 "GXVC": 0.03,
    //                 "stock": 0.082
    //             },
    //             {
    //                 "year": 'Jul',
    //                 "GXVC":0.01,
    //                 "stock": 0.12
    //             },
    //             {
    //                 "year": 'Aug',
    //                 "GXVC": 0.056,
    //                 "stock": 0.062
    //             },
    //             {
    //                 "year": 'Sep',
    //                 "GXVC": 0.05,
    //                 "stock": 0.01
    //             },
    //             {
    //                 "year": 'Oct',
    //                 "GXVC": .07,
    //                 "stock": 0.02
    //             },
    //             {
    //                 "year": 'Nov',
    //                 "GXVC": .11,
    //                 "stock": 0.03
    //             },
				// {
    //                 "year": 'Dec',
    //                 "GXVC":.12,
    //                 "stock": 0
    //             }
    //         ];

    //         AmCharts.ready(function () {
    //             // SERIAL CHART
    //             chart = new AmCharts.AmSerialChart();
    //             chart.dataProvider = chartData;
    //             chart.categoryField = "year";
    //             chart.startDuration = 0;
    //             chart.balloon.color = "#000000";
                                                 
    //             // AXES
    //             // category
    //             var categoryAxis = chart.categoryAxis;
    //             categoryAxis.fillAlpha = 0;
    //             categoryAxis.fillColor = "";
    //             categoryAxis.gridAlpha = 0;
    //             categoryAxis.axisAlpha = 0;
    //             categoryAxis.labelColor = "#fff";
    //             categoryAxis.gridPosition = "start";
    //             categoryAxis.position = "bottom";

    //             // value
    //             var valueAxis = new AmCharts.ValueAxis();
    //             valueAxis.title = "";
    //             valueAxis.dashLength = 0;
    //             valueAxis.axisAlpha = 0;
    //             valueAxis.minimum = 0.12;
    //             valueAxis.maximum = 0;
    //             valueAxis.integersOnly = false;
    //             valueAxis.gridCount = 0;
    //             valueAxis.reversed = false; // this line makes the value axis reversed
    //             chart.addValueAxis(valueAxis);

    //             // GRAPHS             

    //             // GXVC graph
    //             var graph = new AmCharts.AmGraph();
    //             graph.title = "GXVC";
    //             graph.valueField = "GXVC";
    //             graph.balloonText = "place taken by GXVC in [[category]]: [[value]]";
    //             graph.bullet = "round";
    //             graph.lineThickness= 3;
    //             graph.lineColor= "#bd9852";
				// graph.bulletBorderColor= "#313131";
    //             graph.bulletBorderAlpha= 1;
    //             chart.addGraph(graph);

    //             // United Kingdom graph
    //             var graph = new AmCharts.AmGraph();
    //             graph.title = "United Kingdom";
    //             graph.valueField = "stock";
    //             graph.balloonText = "place taken by stock in [[category]]: [[value]]";
    //             graph.bullet = "round";
				// graph.lineThickness= 3;
				// graph.lineColor= "#474747";
				// graph.bulletBorderColor= "#313131";
    //             graph.bulletBorderAlpha= 1;
    //             chart.addGraph(graph);
				          

    //             // CURSOR
    //             var chartCursor = new AmCharts.ChartCursor();
    //             chartCursor.cursorPosition = "mouse";
    //             chartCursor.zoomable = false;
    //             chartCursor.cursorAlpha = 0;
    //             chart.addChartCursor(chartCursor);

    //             // LEGEND
    //             //var legend = new AmCharts.AmLegend();
    //             //legend.useGraphSettings = true;
    //             //chart.addLegend(legend);

    //             // WRITE
    //             chart.write("chartdiv1");
    //         });
 			var chart;
            var chartData = [
                {
                    "year": 'Jan',
                    "GXVC": 0.11,
                    "stock": 0
                },
                {
                    "year": 'Feb',
                    "GXVC": 0.09,
                    "stock": .02
                },
                {
                    "year": 'Mar',
                    "GXVC": .02,
                    "stock": .04
                },
                {
                    "year": 'Apr',
                    "GXVC": .025,
                    "stock": 0.07
                },
                {
                    "year": 'May',
                    "GXVC": .01,
                    "stock": 0.065
                },
                {
                    "year": 'Jun',
                    "GXVC": 0.03,
                    "stock": 0.082
                },
                {
                    "year": 'Jul',
                    "GXVC":0.01,
                    "stock": 0.12
                },
                {
                    "year": 'Aug',
                    "GXVC": 0.056,
                    "stock": 0.062
                },
                {
                    "year": 'Sep',
                    "GXVC": 0.05,
                    "stock": 0.01
                },
                {
                    "year": 'Oct',
                    "GXVC": .07,
                    "stock": 0.02
                },
                {
                    "year": 'Nov',
                    "GXVC": .11,
                    "stock": 0.03
                },
				{
                    "year": 'Dec',
                    "GXVC":.12,
                    "stock": 0
                }
            ];

            AmCharts.ready(function () {
                // SERIAL CHART
                chart = new AmCharts.AmSerialChart();
                chart.dataProvider = chartData;
                chart.categoryField = "year";
                chart.startDuration = 0;
                chart.balloon.color = "#000000";
                                                 
                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.fillAlpha = 0;
                categoryAxis.fillColor = "";
                categoryAxis.gridAlpha = 0;
                categoryAxis.axisAlpha = 0;
                categoryAxis.labelColor = "#fff";
                categoryAxis.gridPosition = "start";
                categoryAxis.position = "bottom";

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.title = "";
                valueAxis.dashLength = 0;
                valueAxis.axisAlpha = 0;
                valueAxis.minimum = 0.12;
                valueAxis.maximum = 0;
                valueAxis.integersOnly = false;
                valueAxis.gridCount = 0;
                valueAxis.reversed = false; // this line makes the value axis reversed
                chart.addValueAxis(valueAxis);

                // GRAPHS             

                // GXVC graph
                var graph = new AmCharts.AmGraph();
                graph.title = "GXVC";
                graph.valueField = "GXVC";
                graph.balloonText = "place taken by GXVC in [[category]]: [[value]]";
                graph.bullet = "round";
                graph.lineThickness= 3;
                graph.lineColor= "#bd9852";
				graph.bulletBorderColor= "#313131";
                graph.bulletBorderAlpha= 1;
                chart.addGraph(graph);

                // United Kingdom graph
                var graph = new AmCharts.AmGraph();
                graph.title = "United Kingdom";
                graph.valueField = "stock";
                graph.balloonText = "place taken by stock in [[category]]: [[value]]";
                graph.bullet = "round";
				graph.lineThickness= 3;
				graph.lineColor= "#474747";
				graph.bulletBorderColor= "#313131";
                graph.bulletBorderAlpha= 1;
                chart.addGraph(graph);
				          

                // CURSOR
                var chartCursor = new AmCharts.ChartCursor();
                chartCursor.cursorPosition = "mouse";
                chartCursor.zoomable = false;
                chartCursor.cursorAlpha = 0;
                chart.addChartCursor(chartCursor);

                // LEGEND
                //var legend = new AmCharts.AmLegend();
                //legend.useGraphSettings = true;
                //chart.addLegend(legend);

                // WRITE
                chart.write("chartdiv2");
            });
 			// var chart;
    //         var chartData = [
    //             {
    //                 "year": 'Jan',
    //                 "GXVC": 0.11,
    //                 "stock": 0
    //             },
    //             {
    //                 "year": 'Feb',
    //                 "GXVC": 0.09,
    //                 "stock": .02
    //             },
    //             {
    //                 "year": 'Mar',
    //                 "GXVC": .02,
    //                 "stock": .04
    //             },
    //             {
    //                 "year": 'Apr',
    //                 "GXVC": .025,
    //                 "stock": 0.07
    //             },
    //             {
    //                 "year": 'May',
    //                 "GXVC": .01,
    //                 "stock": 0.065
    //             },
    //             {
    //                 "year": 'Jun',
    //                 "GXVC": 0.03,
    //                 "stock": 0.082
    //             },
    //             {
    //                 "year": 'Jul',
    //                 "GXVC":0.01,
    //                 "stock": 0.12
    //             },
    //             {
    //                 "year": 'Aug',
    //                 "GXVC": 0.056,
    //                 "stock": 0.062
    //             },
    //             {
    //                 "year": 'Sep',
    //                 "GXVC": 0.05,
    //                 "stock": 0.01
    //             },
    //             {
    //                 "year": 'Oct',
    //                 "GXVC": .07,
    //                 "stock": 0.02
    //             },
    //             {
    //                 "year": 'Nov',
    //                 "GXVC": .11,
    //                 "stock": 0.03
    //             },
				// {
    //                 "year": 'Dec',
    //                 "GXVC":.12,
    //                 "stock": 0
    //             }
    //         ];

    //         AmCharts.ready(function () {
    //             // SERIAL CHART
    //             chart = new AmCharts.AmSerialChart();
    //             chart.dataProvider = chartData;
    //             chart.categoryField = "year";
    //             chart.startDuration = 0;
    //             chart.balloon.color = "#000000";
                                                 
    //             // AXES
    //             // category
    //             var categoryAxis = chart.categoryAxis;
    //             categoryAxis.fillAlpha = 0;
    //             categoryAxis.fillColor = "";
    //             categoryAxis.gridAlpha = 0;
    //             categoryAxis.axisAlpha = 0;
    //             categoryAxis.labelColor = "#fff";
    //             categoryAxis.gridPosition = "start";
    //             categoryAxis.position = "bottom";

    //             // value
    //             var valueAxis = new AmCharts.ValueAxis();
    //             valueAxis.title = "";
    //             valueAxis.dashLength = 0;
    //             valueAxis.axisAlpha = 0;
    //             valueAxis.minimum = 0.12;
    //             valueAxis.maximum = 0;
    //             valueAxis.integersOnly = false;
    //             valueAxis.gridCount = 0;
    //             valueAxis.reversed = false; // this line makes the value axis reversed
    //             chart.addValueAxis(valueAxis);

    //             // GRAPHS             

    //             // GXVC graph
    //             var graph = new AmCharts.AmGraph();
    //             graph.title = "GXVC";
    //             graph.valueField = "GXVC";
    //             graph.balloonText = "place taken by GXVC in [[category]]: [[value]]";
    //             graph.bullet = "round";
    //             graph.lineThickness= 3;
    //             graph.lineColor= "#bd9852";
				// graph.bulletBorderColor= "#313131";
    //             graph.bulletBorderAlpha= 1;
    //             chart.addGraph(graph);

    //             // United Kingdom graph
    //             var graph = new AmCharts.AmGraph();
    //             graph.title = "United Kingdom";
    //             graph.valueField = "stock";
    //             graph.balloonText = "place taken by stock in [[category]]: [[value]]";
    //             graph.bullet = "round";
				// graph.lineThickness= 3;
				// graph.lineColor= "#474747";
				// graph.bulletBorderColor= "#313131";
    //             graph.bulletBorderAlpha= 1;
    //             chart.addGraph(graph);
				          

    //             // CURSOR
    //             var chartCursor = new AmCharts.ChartCursor();
    //             chartCursor.cursorPosition = "mouse";
    //             chartCursor.zoomable = false;
    //             chartCursor.cursorAlpha = 0;
    //             chart.addChartCursor(chartCursor);

    //             // LEGEND
    //             //var legend = new AmCharts.AmLegend();
    //             //legend.useGraphSettings = true;
    //             //chart.addLegend(legend);

    //             // WRITE
    //             chart.write("chartdiv3");
    //         });
