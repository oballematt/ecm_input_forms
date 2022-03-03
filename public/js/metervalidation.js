let meterData = []; //the data that is pushed into this array is used for the getModel function 
let reviewedModels = []; //the data that is pushed to this array is used to determine if a meter has been reviewed when the page first loads or when a model is run
let replaceData = []; //the data that is pushed to this array is used to send the replace data back to s3 using the user input from the replace data table that is below the charts.
const d = new Date();
let updateModelStart;//These two variables are used for the google slider chart. These two are global variables so that copyModelDate function has access
let updateModelEnd;//to these variables outside of the getModel function

$(document).ready(() => {
  //Initialize Datepicker for model start and end and analysis start and end
  const dateInput_1 = $(".datepicker");

  dateInput_1.datepicker({
    changeYear: true,
    dateFormat: "yy-mm-dd",
  });

  //initializes the overlay and loading spinner when searching for a model. This class is attached to the RUN MODEL button as well as the SUBMIT button on the replace data table
  $(".load").on("click", function() {
    $("#overlay").fadeIn();
  });

 //This is supposed to delete the records in the table reviewed_model at the end of the month. I didnt take into account that someone needs to visit the
 //metervalidation app in order for this script to run. This would be best implemented using a trigger function in pgAdmin to delete records at the end of the month.
  // const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

  // if (d === lastDay) {
  //   $.ajax({
  //     url: "/deleteModels",
  //     type: "DELETE",
  //   });
  // }

  //this function is responsible for using the ajax call on page load to populate the meter selection table.
  //it also pulls data from the reviewed_models table in postgres to indicate if a meter was previously reviewed.
  const getMeterAlarm = () => {
    $.when(
      $.ajax({
        url: "/getAlarm",
        type: "POST",
        data: {
          startTimestamp: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
            .toISOString()
            .slice(0, 10),
          endTimestamp: new Date(new Date().getFullYear(), new Date().getMonth(), 0)
            .toISOString()
            .slice(0, 10),
          steward: $("#filter-steward").val(),
        },
      }),
      $.ajax({
        url: "/reviewedModels",
        type: "GET",
      })
    ).then((response, response2) => {
      if (
        response[0] === "Request failed with status code 504" ||
        response[0] === "Request failed with status code 500"
      ) {
        getMeterAlarm();
        //this else statement extends all the way to the $('.remove0) function
      } else {
        console.log(response);
        $(".meterSelectionSpinner").hide();
        $(".apply").html("Apply");
        const meter = response[0].body.meter;
        const flagCount = response[0].body.flag_count;
        const building = response[0].body.building_abbreviation;
        const building_number = response[0].body.building_number;
        const commodity = response[0].body.commodity_tag;
        const notes = response[0].body.notes;
        //This maps through the meter variable which is set to the response[0].body.meter. It will then populate the empty tablebody for the meter selection list.
        meter.map((meter, index) => {
          $(".meterList").append(`
            <tr>
              <td style="width: 10px;" class='position text-center'><input class="form-check-input" type="radio" name="meterSelect" id="radioNoLabel1" aria-label="Select a meter"></td>
              <td>${building[index]}</td>
              <td>${meter}</td>
              <td>${flagCount[index]}</td>
              <td id=${meter}>No</td>
              <td style="display: none">${notes[index]}</td>
              <td style="display: none">${building_number[index]}</td>
              <td style="display: none">${commodity[index]}</td>
            </tr>
            `);
        });

        //This click event displays the notes underneath the confirm meter selection button that are associated with the meter when a radio button is clicked.
        $('input[name="meterSelect"]').on("click", function() {
          const notes = $(this)
            .closest("tr")
            .children("td:eq(5)")
            .text();
          const meter = $(this)
            .closest("tr")
            .children("td:eq(2)")
            .text();
          const buildingNumber = $(this)
            .closest("tr")
            .children("td:eq(6)")
            .text();
          $("#modelNotes").show();
          $(".notesLabel").html(meter);
          $(".notesLabelBuildingNumber").html(buildingNumber);
          if (notes === "null") {
            $(".modelNotes").val("No Notes");
          } else {
            $(".modelNotes").val(notes);
          }
        });

        //maps through the reviewed_model table data in the combined ajax calls.
        //each cell in the third index position in the table above has a unqiue id containing the meter name.
        //if the meter in response2 matches any of the id's in the table cell, it applies the modifications below.
        response2[0].map((item) => {
          $(`#${item.meter}`).text("Yes");
          $(`#${item.meter}`)
            .parent("tr")
            .css("background-color", "#00b74a");
          reviewedModels.push(item.meter);
        });

        //This function automatically sorts the meter selection table by building and meter ASC every time the table loads.
        const t = (tr, i) => tr.cells[i].textContent;
        $(".meterList tr")
          .get()
          .sort(
            (a, b) =>
              t(a, 1).localeCompare(t(b, 1)) || t(a, 2).localeCompare(t(b, 2))
          )
          .map((tr) => $(".meterList").append(tr));

        //initialize the search box above the meter selection table.
        //the value of the search box is transformed to uppercase so the user doesnt have to do it themselves.
        $("#search").on("keyup", function() {
          const value = $(this)
            .val()
            .toUpperCase();
          $(".meterList tr").each(function() {
            $row = $(this);

            $row.find("td").each(function() {
              const id = $(this).text();
              if (id.indexOf(value) !== 0) {
                $row.hide();
              } else {
                $row.show();
                return false;
              }
            });
          });
        });
        //This on change event filters for meters that have or havent been reviewed using the reviewed select input above the meter selection table.
        //If the value of the select input is "No" then all meters that havent been reviewed will be displayed and all the meters that have been reviewed will be hidden.
        //If the value of the select input is "Yes" then all meters that have been reviewed will be displayed and all the meters that havent been reviewed will be hidden.
        //If the value of the select input is "All"  then all meters will be displayed
        $(".reviewedFilter").on("change", function() {
          const value = $(this).val();
          $(".meterData tbody tr").each(function() {
            if (value === "No") {
              $(this)
                .find("td:eq(4):contains(No)")
                .closest("tr")
                .show();
              $(this)
                .find("td:eq(4):contains(Yes)")
                .closest("tr")
                .hide();
            } else if (value === "Yes") {
              $(this)
                .find("td:eq(4):contains(No)")
                .closest("tr")
                .hide();
              $(this)
                .find("td:eq(4):contains(Yes)")
                .closest("tr")
                .show();
            } else {
              $(this)
                .find("td:eq(4):contains(No)")
                .closest("tr")
                .show();
              $(this)
                .find("td:eq(4):contains(Yes)")
                .closest("tr")
                .show();
            }
          });
        });
        //this on change function hides rows where # flagged days is equal to 0 if the value of the select input is "Yes"
        $(".remove0").on("change", function() {
          const value = $(this).val();
          $(".meterData tbody tr").each(function() {
            if (value === "Yes") {
              $(this)
                .find("td:eq(3):contains(0)")
                .closest("tr")
                .hide();
            } else {
              $(this)
                .find("td:eq(3):contains(0)")
                .closest("tr")
                .show();
            }
          });
        });
      }
    });
  };
//getMeterAlarm is called on page load
  getMeterAlarm();

  //Calls the getMeterAlarm function only if the user wants to filter by a specific steward.
  //This activates after the user has selected a steward to filter by and then has press the apply button that is appended to the steward select input
  //Also everytime the apply button is clicked the meter selection table is refreshed using the load() function to refresh the meter selection table to display the stewards meters
  $(".filterBySteward").on("click", function() {
    $(".meterSelectionSpinner").show();
    $(".meterData").load(location.href + " .meterData");
    getMeterAlarm();
  });

  //this function is used to review models. When the reviewed button is clicked the building and meter are sent to the reviewed_model table in postgres.
  //then the reviewed model button is disabled and a checkmark is appended to the button to indicate that the model has been reviewed.
  const postModel = () => {
    $.ajax({
      url: "/postModels",
      type: "POST",
      data: {
        building: $(".currentBuildingName").text(),
        meter: $(".currentMeter").text(),
      },
    }).then(() => {
      $(".reviewed").html(`Reviewed <i class="far fa-check-circle"></i>`);
      $(".reviewed").attr("disabled", true);
      $(".reviewed").addClass("btn-success");
      //Each table cell in the Reviewed column has an id of whatever the meter is in that row. When the reviewed button is clicked on the model, it takes the 
      //value of the currentMeter class and uses that as an id selector for the table cell for the Reviewed column in the meter selection table.
      //It will then change the html output from 'No' to 'Yes' and then change the background color of the entire row to green. This is the indicate to the user that they
      //have successfully reviewed that model
      $(`#${$(".currentMeter").text()}`).text("Yes");
      $(`#${$(".currentMeter").text()}`)
        .closest("tr")
        .css("background-color", "#00b74a");
    });
  };

  //This on change function will always set the model end date to 364 days ahead of the model start date
  $(".modelStart").on("change", function() {
    const modelStartDate = $(this).datepicker("getDate");
    modelStartDate.setDate(modelStartDate.getDate() + 364);
    $(".modelEnd").datepicker("setDate", modelStartDate);
  });

  //This on change function will empty the global array variable meterData whenever a new radio button is selected in the meter selection table 
  //This is necessary so that only the meter you select is used to search for the model, and not evey meter you may click.
  $(".meterData").on("change", $('input[name="meterSelect"]'), function() {
    meterData = [];
  });

  //This is the on click event for the confirm meter selection button
  $(".confirmMeter").click(function() {
    //when the confirm meter selection button is clicked, the model dates will automatically be determined.
    //model start will be defaulted to the first day of the previous month of the previous year
    $(".modelStart").datepicker(
      "setDate",
      new Date(new Date().getFullYear() - 1, new Date().getMonth() - 1, 1)
    );
    //model end will be defaulted to the default model start date + 364 days
    $(".modelEnd").datepicker(
      "setDate",
      new Date(new Date().getFullYear() - 1, new Date().getMonth() - 1, +364)
    );
    //analysis start date will be defaulted to the first day of the previous month of the current year
    $(".analysisStart").datepicker(
      "setDate",
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
    );
    //analysis end date will be defaulted to the last day of the previous month of the current year
    $(".analysisEnd").datepicker(
      "setDate",
      new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    );

    //When the confirm meter selection button is clicked, the data for that specific row will be pushed into the global array variable meterData
    $('input[name="meterSelect"]:checked', $(".meterData")).each(function() {
      meterData.push({
        meter: $(this)
          .closest("tr")
          .children("td:eq(2)")
          .text(),
        building_number: $(this)
          .closest("tr")
          .children("td:eq(6)")
          .text(),
        commodity_tag: $(this)
          .closest("tr")
          .children("td:eq(7)")
          .text(),
        note: $(this)
          .closest("tr")
          .children("td:eq(5)")
          .text(),
      });
    });
    //This populates the Current Meter Selection element with the confirmed meter
    $(".meterSelection").text(meterData[0].meter);
  });

  //This on click event is bound to the RUN MODEL button. If no meter has been selected in the meter selection table and the global array variable meterData is empty
  //then an alert will popup indicating to the user that they havent selected a meter
  $(".loadModel").on("click", function(e) {
    e.preventDefault();
    if (meterData.length === 0) {
      alert(
        'No meter selected. Please click "Confirm Meter Selection" to confirm your selected meter'
      );
      $("#overlay").hide();
    } else {
      //everytime the RUN MODEL button is clicked, the divs that contain the chart data, the google chart data that contains consumption data, and the replace data table
      //will be refreshed so that the new data will be displayed when a new model is run
      $("#chartData").load(location.href + " #chartData");
      $(".tableData").load(location.href + " .tableData");
      $("#consumptionRow").load(location.href + " #consumptionRow");
      //calls the getModel function on click
      getModel();
    }
  });

  const getModel = function() {
    const endTime = new Date().toISOString().slice(0, 10);
    const startTime = new Date(new Date().getFullYear() - 3, new Date().getMonth() - 1, 1)
      .toISOString()
      .slice(0, 10);
    const modelStart = $(".modelStart").val();
    const modelEnd = $(".modelEnd").val();
    const analysisStart = $(".analysisStart").val();
    const analysisEnd = $(".analysisEnd").val();
    const buildingNumber = meterData[0].building_number;
    const commodity = meterData[0].commodity_tag;
    const meter = meterData[0].meter;
  
    $.when(
      $.ajax({
        url: "/getModel",
        method: "GET",
        data: {
          buildingNumber: buildingNumber,
          commodity: commodity,
          meter: meter,
          trainStart: modelStart,
          trainEnd: modelEnd,
          analysisStart: analysisStart,
          analysisEnd: analysisEnd,
        },
        error: function(xhr, status, error, response) {
          if (xhr.status === 503) {
            getModel();
            $(".overlayMessage").text(
              "Server not responding, trying your search again. Please do not refresh the page"
            );
          }
          if (xhr.status === 502) {
            $("#overlay").fadeOut();
            alert(
              "No data was returned for your current search criteria. Please try selecting a different meter or date range"
            );
          }
        },
      }),
      $.ajax({
        url: "/getConsumption",
        method: "GET",
        data: {
          buildingNumber: buildingNumber,
          commodity: commodity,
          meter: meter,
          startTimestamp: startTime,
          endTimestamp: endTime,
        },
      }),
      $.ajax({
        type: "POST",
        url: "/getAttributes",
        data: {
          meter: meterData[0].meter,
        },
      })
    ).then((response, response2, response3) => {
      console.log(response);
      if (
        response[0] === "Request failed with status code 504" ||
        response[0] === "Request failed with status code 500" ||
        response[0] === "Request failed with status code 503" ||
        response2[0] === "Request failed with status code 504"
      ) {
        getModel();
        $(".overlayMessage").text(
          "Server not responding, trying your search again. Please do not refresh the page"
        );
      } else if (response[0] === "{\n    \"statusCode\": ,\n    \"body\": ,\n    \"headers\": {\n            }\n}") {
        $("#overlay").fadeOut();
        alert('No data has been returned for this model')
      } else {
        $('.saveAttributes').attr('disabled', false)
        $(".displayData").show();
        $(".modelNotes").attr("disabled", false);
        $(".editModelNote").show();
        if (response3[0].length === 0) {
          $(".savedAttributes").hide();
        } else {
          $(".savedAttributes").show();
          $(".savedBaseTemp").html(
            response3[0][0].base_temperature === null
              ? "--"
              : response3[0][0].base_temperature
          );
          $(".savedAutoIgnored").html(
            response3[0][0].auto_ignored_percentage + "%"
          );
          $(".savedSlope").html(response3[0][0].slope);
          $(".savedIntercept").html(response3[0][0].intercept);
          $(".savedR2").html(response3[0][0].r2);
          $(".savedStdDev").html(response3[0][0].std);
          $(".savedStart").html(response3[0][0].train_start);
          $(".savedEnd").html(response3[0][0].train_end);
        }
        $(".reviewedButton")
          .html(` <button style='margin-bottom: 20px;' type="button"
        class="btn btn-primary reviewed text-center">Reviewed</button>`);
        $(".reviewed").on("click", function() {
          reviewedModels.push(response[0].body.meter);
          postModel();
        });
        if (reviewedModels.includes(response[0].body.meter)) {
          $(".reviewed").attr("disabled", true);
          $(".reviewed").addClass("btn-success");
          $(".reviewed").html('Reviewed <i class="far fa-check-circle"></i>');
        }

        const analysisIndex = response[0].body.model.data.timestamp.indexOf(
          $(".analysisStart").val()
        );
        const lowLimit = response[0].body.model.data.predicted_value_lower_bound.slice(
          analysisIndex
        );
        const xTemp = response[0].body.model.data.average_dry_bulb_temperature.slice(
          analysisIndex
        );
        const highLimit = response[0].body.model.data.predicted_value_upper_bound.slice(
          analysisIndex
        );
        const rawValue = response[0].body.model.data.raw_value.slice(
          analysisIndex
        );
        const xTimestamp = response[0].body.model.data.timestamp.slice(
          analysisIndex
        );
        $(".overlayMessage").text("Getting data, this will take a few seconds");
        $("#overlay").fadeOut();
        $(".baseTemp").html(
          response[0].body.model.base_temperature === null
            ? "--"
            : response[0].body.model.base_temperature
        );
        $(".autoIgnored").html(
          parseFloat(
            response[0].body.model.missing_value.auto_ignored_percentage
          ).toFixed(0) + "%"
        );
        $(".slope").html(parseFloat(response[0].body.model.slope).toFixed(2));
        $(".intercept").html(
          parseFloat(response[0].body.model.intercept).toFixed(2)
        );
        $(".r2").html(
          parseFloat(response[0].body.model.max_train_r2).toFixed(2)
        );
        $(".stdDev").html(
          parseFloat(response[0].body.model.std.train).toFixed(2)
        );
        $(".start").html(modelStart);
        $(".end").html(modelEnd);
        $(".meterVariable").html(response[0].body.model.x.toUpperCase());
        $(".currentBuildingName").text(
          response[0].body.building.building_abbreviation
        );
        $(".currentMeter").text(response[0].body.meter);
        $(".currentCommodity").text(response[0].body.commodity.tag);
        $(".headerButton").show();

        const chartData = (x, y, type) => {
          let result = {};

          x.forEach((key, i) => (result[key] = y[i]));

          const dataPoints = Object.keys(result).map(function(key) {
            return [type(key), result[key]];
          });

          dataPoints.sort(function(a, b) {
            return a[0] - b[0];
          });

          return dataPoints.map((a) => {
            return { x: a[0], y: a[1] };
          });
        };

        if (meterData[0].commodity_tag === "W") {
          $("#hideIfWater").hide();
          $("#fullWidth").attr("class", "col-xxl-12");
        }
        const config = {
          data: {
            datasets: [
              {
                type: "scatter",
                label: "Meter VS. Temp",
                data: chartData(xTemp, rawValue, Number),
                backgroundColor: "#00FFFF",
                pointRadius: 5,
              },
              {
                type: "line",
                label: "High Limit",
                data: chartData(xTemp, highLimit, Number),
                fill: false,
                pointRadius: 0,
                tension: 0.1,
                borderColor: "#d9534f",
              },
              {
                type: "line",
                label: "Low Limit",
                data: chartData(xTemp, lowLimit, Number),
                fill: false,
                pointRadius: 0,
                tension: 0.1,
                borderColor: "#ffcc66",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "black",
                },
              },
              x: {
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "black",
                },
              },
            },
          },
        };
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, config);

        const config2 = {
          data: {
            datasets: [
              {
                type: "scatter",
                label: "Meter VS. Dates",
                data: chartData(xTimestamp, rawValue, String),
                pointRadius: 5,
                backgroundColor: "#00FFFF",
              },
              {
                type: "line",
                label: "High Limit",
                data: chartData(xTimestamp, highLimit, String),
                fill: false,
                pointRadius: 0,
                borderColor: "#d9534f",
                tension: 0.1,
              },
              {
                type: "line",
                label: "Low Limit",
                data: chartData(xTimestamp, lowLimit, String),
                fill: false,
                pointRadius: 0,
                borderColor: "#ffcc66",
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  tooltipFormat: "MMM dd, yyyy",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "black",
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "black",
                },
              },
            },
          },
        };
        const ctx2 = document.getElementById("myChart2").getContext("2d");
        const myChart2 = new Chart(ctx2, config2);

        const consumptionResult = {};
        const consumptionTimestamp = response2[0].body.timestamp;
        const consumptionValue = response2[0].body.value;
        consumptionTimestamp.forEach(
          (key, i) => (consumptionResult[key] = consumptionValue[i])
        );

        const newConsumptionArr = Object.keys(consumptionResult).map(function(
          key
        ) {
          return [String(key), consumptionResult[key]];
        });

        google.load("visualization", "1", {
          packages: ["controls", "charteditor"],
        });
        google.setOnLoadCallback(drawChart);

        function drawChart() {
          const data = new google.visualization.DataTable();
          data.addColumn("date");
          data.addColumn("number");

          newConsumptionArr.forEach((item) => {
            data.addRow([new Date(item[0]), item[1]]);
          });

          const dash = new google.visualization.Dashboard(
            document.getElementById("dashboard")
          );

          const control = new google.visualization.ControlWrapper({
            controlType: "ChartRangeFilter",
            containerId: "control_div",
            state: {
              range: {
                start: new Date($(".modelStart").val()),
                end: new Date($(".modelEnd").val()),
              },
            },
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: "ScatterChart",
                chartOptions: {
                  height: "100",
                  width: "90%",
                  colors: ["#15A0C8"],
                  backgroundColor: {
                    fill: "#48555F",
                  },
                  chartArea: {
                    height: "100",
                    width: "90%",
                  },
                  hAxis: {
                    baselineColor: "#FFFFFF",
                    gridlineColor: "#FFFFFF",
                    textStyle: { color: "#FFF" },
                  },
                },
              },
            },
          });
          const chartOptions = {
            legend: "none",
            tooltip: {
              isHtml: true,
              trigger: "hover",
            },
            pointSize: 10,
            dataOpacity: 1,
            colors: ["#15A0C8"],
            vAxis: {
              baselineColor: "#000000",
              gridlineColor: "#000000",
              textStyle: { color: "#FFF" },
            },
            hAxis: {
              baselineColor: "#000000",
              gridlineColor: "#000000",
              textStyle: { color: "#FFF" },
            },
            height: 600,
            width: 1000,
            backgroundColor: {
              fill: "#48555F",
            },
          };

          const chart = new google.visualization.ChartWrapper({
            chartType: "ScatterChart",
            containerId: "chart_div",
            options: chartOptions,
          });

          function setOptions(wrapper) {
            wrapper.setOption("width", "90%");
            wrapper.setOption("chartArea.width", "90%");
          }

          setOptions(chart);

          dash.bind([control], [chart]);
          $(".show-hide").on("click", function() {
            const icon = this.querySelector("i");
            const text = this.querySelector("span");
            dash.draw(data);
            if (icon.classList.contains("fa-eye")) {
              icon.classList.remove("fa-eye");
              icon.classList.add("fa-eye-slash");
              text.innerHTML = "Hide Historic";
            } else {
              icon.classList.remove("fa-eye-slash");
              icon.classList.add("fa-eye");
              text.innerHTML = "Show Historic";
            }
          });

          google.visualization.events.addListener(
            control,
            "statechange",
            function() {
              const v = control.getState();
              document.getElementById("dbgchart").innerHTML =
                v.range.start.toISOString().slice(0, 10) +
                " to " +
                v.range.end.toISOString().slice(0, 10);
              updateModelStart = v.range.start.toISOString().slice(0, 10);
              updateModelEnd = v.range.end.toISOString().slice(0, 10);
              return 0;
            }
          );
        }

        $(".copyModelDates").on("click", () => {
          $(".modelStart").val(updateModelStart);
          $(".modelEnd").val(updateModelEnd);
        });

        $(function() {
          const dates = response[0].body.model.data.timestamp.slice(
            analysisIndex
          );
          const temperature = response[0].body.model.data.average_dry_bulb_temperature.slice(
            analysisIndex
          );
          const x = response[0].body.model.data.degree_day.slice(analysisIndex);
          const occ = response[0].body.model.data.is_occupied.slice(
            analysisIndex
          );
          const meter = response[0].body.model.data.raw_value.slice(
            analysisIndex
          );
          const expected = response[0].body.model.data.predicted_value.slice(
            analysisIndex
          );
          const replacement = response[0].body.model.data.replacement_value.slice(
            analysisIndex
          );
          const reason = response[0].body.model.data.replacement_reason.slice(
            analysisIndex
          );
          const notes = response[0].body.model.data.replacement_notes.slice(
            analysisIndex
          );
          const lowerBound = response[0].body.model.data.predicted_value_lower_bound.slice(
            analysisIndex
          );
          const upperBound = response[0].body.model.data.predicted_value_upper_bound.slice(
            analysisIndex
          );

          dates.map((date, index) => {
            $(".tableBody").append(`
              <tr>
                <td class='position'><input class="form-check-input edit" name='edit' type="checkbox"></td>
                <td class='date'>${date}</td>
                <td>${temperature[index]}</td>
                <td>${
                  $(".meterVariable").text() === "OCC"
                    ? occ[index]
                    : parseFloat(x[index]).toFixed(0)
                }</td>
                <td id=${Math.trunc(
                  meter[index]
                )} class='meterReading'>${Math.trunc(meter[index])}</td>
                <td class='expected'>${parseFloat(expected[index]).toFixed(
                  0
                )}</td>
                <td >${
                  replacement[index] === null
                    ? "-"
                    : parseFloat(replacement[index]).toFixed(0)
                }</td>
                <td>${reason[index] === null ? "-" : reason[index]}</td>
                <td>${notes[index] === null ? "-" : notes[index]}</td>
                <td class="upperBound" style='display: none'>${parseFloat(
                  upperBound[index]
                ).toFixed(0)}</td>
                <td class="lowerBound" style='display: none'>${parseFloat(
                  lowerBound[index]
                ).toFixed(0)}</td>
              </tr>`);
          });
          $(".x").html(response[0].body.model.x.toUpperCase());
          $(".tableData tbody tr").each(function() {
            const meterReading = $(this)
              .find(".meterReading")
              .html();
            const lowerBound = $(this)
              .find(".lowerBound")
              .html();
            const upperBound = $(this)
              .find(".upperBound")
              .html();
            if (
              parseInt(meterReading, 10) < parseInt(lowerBound, 10) ||
              parseInt(meterReading, 10) === parseInt(lowerBound, 10)
            ) {
              $(this).css("background-color", "#F0AD4E");
              if ($(this).index() === 0) {
                $(this)
                  .children("td:eq(0)")
                  .append(
                    `<a  href="#" class="warning firstRow" data-tool-tip="Low Limit: ${lowerBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`
                  );
              } else {
                $(this)
                  .children("td:eq(0)")
                  .append(
                    `<a  href="#" class="warning" data-tool-tip="Low Limit: ${lowerBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`
                  );
              }
            }

            if (
              parseInt(meterReading, 10) > parseInt(upperBound, 10) ||
              parseInt(meterReading, 10) === parseInt(upperBound, 10)
            ) {
              $(this).css("background-color", "#d9534f");
              if ($(this).index() === 0) {
                $(this)
                  .children("td:eq(0)")
                  .append(
                    `<a  href="#" class="warning firstRow" data-tool-tip="High Limit: ${upperBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`
                  );
              } else {
                $(this)
                  .children("td:eq(0)")
                  .append(
                    `<a  href="#" class="warning" data-tool-tip="High Limit: ${upperBound}"><i class="fas fa-exclamation-circle fa-2x"></i></a>`
                  );
              }
            }

            if (
              $(this)
                .children("td:eq(4)")
                .text() ===
              $(this)
                .next()
                .children("td:eq(4)")
                .text()
            ) {
              $(this)
                .next()
                .css("background-color", "#0275d8");
            }
          });
          const checkboxes = document.querySelectorAll(
            '.tableData input[type="checkbox"]'
          );
          let lastChecked;

          function handleCheck(e) {
            let inBetween = false;
            if (e.shiftKey && this.checked) {
              checkboxes.forEach((checkbox) => {
                if (checkbox === this || checkbox === lastChecked) {
                  inBetween = !inBetween;
                }
                if (inBetween) {
                  checkbox.checked = true;
                }
              });
            }
            lastChecked = this;
          }

          checkboxes.forEach((checkbox) =>
            checkbox.addEventListener("click", handleCheck)
          );
        });
      }
    });
  };

  const submitModelNotes = () => {
    $.ajax({
      url: "/postModelNotes",
      type: "POST",
      data: {
        building_number: JSON.stringify([
          $(".notesLabelBuildingNumber").html(),
        ]),
        meter: JSON.stringify([$(".notesLabel").html()]),
        notes: JSON.stringify([$(".modelNotes").val()]),
      },
    }).then(() => {
      $(`#${$(".notesLabel").html()}`)
        .siblings("td:eq(5)")
        .text($(".modelNotes").val());
      $(".editModelNote").html(
        `<i style="margin: 0 auto" class="far fa-check-circle fa-2x text-center"></i>`
      );
      setTimeout(() => {
        $(".editModelNote").html("Submit Note");
      }, 4000);
    });
  };

  $(".editModelNote").on("click", () => {
    $(this)
      .html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>`);
    submitModelNotes();
  });

  $(".copyAttributeDates").on("click", () => {
    $(".modelStart").val($(".savedStart").html());
    $(".modelEnd").val($(".savedEnd").html());
  });

  $("#reason").on("change", function() {
    $("#submitReplacement").removeAttr("disabled");
  });

  $("#submitReplacement").click(function() {
    $("input:checkbox:checked", $(".tableData"))
      .each(function() {
        replaceData.push({
          Date: $(this)
            .closest("tr")
            .find(".date")
            .text(),
          Expected: $(this)
            .closest("tr")
            .find(".expected")
            .text(),
          index: $(this)
            .closest("tr")
            .index(),
        });
      })
      .get();

    const checked = $("#replace").is(":checked");
    let notes = [];
    let reason = [];
    let values = [];
    let timestamp = [];
    const building_number = meterData[0].building_number;
    const commodity_tag = meterData[0].commodity_tag;
    const meter = meterData[0].meter;
    if (replaceData.length === 0) {
      alert("Please select at least one date");
      $("#overlay").hide();
    } else {
      if (checked === true) {
        replaceData.forEach(function(item) {
          if ($("#notes").val() === "") {
            notes.push(null);
          } else {
            notes.push($("#notes").val());
          }
          reason.push($("#reason").val());
          values.push(parseFloat(item.Expected));
          timestamp.push(item.Date);
        });
      } else {
        replaceData.forEach(function(item) {
          if ($("#notes").val() === "") {
            notes.push(null);
          } else {
            notes.push($("#notes").val());
          }
          reason.push($("#reason").val());
          values.push(null);
          timestamp.push(item.Date);
        });
      }

      $(".overlayMessage").text("Submitting Data. Please wait...");
      $.ajax({
        url: "/postReplacement",
        method: "POST",
        data: {
          building_number: building_number,
          commodity_tag: commodity_tag,
          meter: meter,
          timestamp: JSON.stringify(timestamp),
          values: JSON.stringify(values),
          reason: JSON.stringify(reason),
          notes: JSON.stringify(notes),
        },
        error: function(jqXhr, textStatus, errorThrown) {
          if (jqXhr.status === 400) {
            alert("Invalid Request. Please try again.");
            $("#overlay").fadeOut();
          }
          if (jqXhr.status === 504) {
            $("#overlay").fadeOut();
            $(".edit").prop("checked", false);
            alert(
              "Server Error. Your data has been saved. Please hit the submit button again."
            );
          }
        },
      }).then(() => {
        replaceData.forEach((item, i) => {
          const row = $(`.tableData tbody tr:eq(${item.index})`);
          const R = (c) => row.children(`td:eq(${c})`);
          R(6).text(values[i] === null ? "-" : values[i]);
          R(7).text(reason[i]);
          R(8).text(notes[i] === null ? "-" : notes[i]);
        });
        $("#overlay").fadeOut();
        $(".overlayMessage").text("Getting data, this will take a few seconds");
        notes = [];
        timestamp = [];
        values = [];
        reason = [];
        replaceData = [];
        $(".edit").prop("checked", false);
        $("#replace").prop("checked", false);
        $("#notes").val("");
        $("#reason").val("Choose...");
        $(".successAlert")
          .html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Your data has been successfully uploaded!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`);

        setTimeout(() => {
          $(".successAlert").empty();
        }, 3000);
      });
    }
  });

  $(".logout").click(function() {
    submitAttributes();
  });

  $(".saveAttributes").on("click", function() {
    $(
      this
    ).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>`);
    submitAttributes();
  });

  const submitAttributes = () => {
    const str = $(".autoIgnored").text();
    let newStr = str.substring(0, str.length - 1);
    const building_number = meterData[0].building_number;
    const meter = $(".currentMeter").text();
    const commodity_tag = $(".currentCommodity").text();
    const x = $(".meterVariable").text();
    const base_temperature = $(".baseTemp").text();
    const auto_ignored_percentage = Number(newStr);
    const slope = Number($(".slope").text());
    const intercept = Number($(".intercept").text());
    const r2 = Number($(".r2").text());
    const std = Number($(".stdDev").text());
    const train_start = $(".start").text();
    const train_end = $(".end").text();

    $.ajax({
      type: "POST",
      url: "/postAttributes",
      data: {
        building_number: building_number,
        meter: meter,
        commodity_tag: commodity_tag,
        train_start: train_start,
        train_end: train_end,
        x: x,
        auto_ignored_percentage: auto_ignored_percentage,
        base_temperature: base_temperature,
        r2: r2,
        slope: slope,
        intercept: intercept,
        std: std,
      },
    }).then((response) => {
      console.log(response);
      $(".saveAttributes").html(
        `<i style="margin: 0 auto" class="far fa-check-circle fa-2x text-center"></i>`
      );
      setTimeout(() => {
        $(".saveAttributes").html("Saved");
        $('.saveAttributes').attr('disabled', true)
      }, 4000);
    });
  };
});
