let meterData = [];
let reviewedModels = [];
let analysisIndex;
let replaceData = [];
let d = new Date();
let endTime = new Date().toISOString().slice(0, 10);
let startTime = new Date(d.getFullYear() - 2, d.getMonth() - 1, 1)
  .toISOString()
  .slice(0, 10);
let updateModelStart;
let updateModelEnd;

$(document).ready(() => {
  const dateInput_1 = $(".datepicker");

  dateInput_1.datepicker({
    changeYear: true,
    dateFormat: "yy-mm-dd",
  });

  $(".load").on("click", function() {
    $("#overlay").fadeIn();
  });

  let lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 1);

  if (d === lastDay) {
    $.ajax({
      url: "/deleteModels",
      type: "DELETE",
    });
  }

  const getMeterAlarm = () => {
    $.when(
      $.ajax({
        url: "/getAlarm",
        type: "POST",
        data: {
          startTimestamp: new Date(d.getFullYear(), d.getMonth() - 1, 1)
            .toISOString()
            .slice(0, 10),
          endTimestamp: new Date(d.getFullYear(), d.getMonth(), 0)
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
      } else {
        console.log(response2);
        $(".ring").hide();
        $(".apply").html("Apply");
        let meter = response[0].body.meter;
        let flagCount = response[0].body.flag_count;
        let building = response[0].body.building_abbreviation;
        let building_number = response[0].body.building_number;
        let commodity = response[0].body.commodity_tag;
        meter.map((meter, index) => {
          $(".meterList").append(`
            <tr>
            <td style="width: 10px;" class='position text-center'><input class="form-check-input" type="radio" name="meterSelect" id="radioNoLabel1" aria-label="Select a meter"></td>
            <td>${building[index]}</td>
            <td>${meter}</td>
            <td>${flagCount[index]}</td>
            <td id=${meter}>No</td>
            <td style="display: none">${building_number[index]}</td>
            <td style="display: none">${commodity[index]}</td>
            </tr>`);
        });
        response2[0].map((item) => {
          $(`#${item.meter}`).text("Yes");
          $(`#${item.meter}`)
            .parent("tr")
            .css("background-color", "#00b74a");
          reviewedModels.push(item.meter);
        });
        const t = (tr, i) => tr.cells[i].textContent;
        $(".meterList tr")
          .get()
          .sort(
            (a, b) =>
              t(a, 1).localeCompare(t(b, 1)) || t(a, 2).localeCompare(t(b, 2))
          )
          .map((tr) => $(".meterList").append(tr));
        $("#search").on("keyup", function() {
          let value = $(this)
            .val()
          $(".meterList tr").each(function() {
            $row = $(this);

            $row.find("td").each(function() {
              var id = $(this).text().toLowerCase();
              if (id.indexOf(value) !== 0) {
                $row.hide();
              } else {
                $row.show();
                return false;
              }
            });
          });
        });
      }
    });
  };

  getMeterAlarm();

  $(".apply").on("click", function() {
    $(".ring").show();
    $(".meterData").load(location.href + " .meterData");
    getMeterAlarm();
  });

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
      $(`#${$(".currentMeter").text()}`).text("Yes");
      $(`#${$(".currentMeter").text()}`)
        .closest("tr")
        .css("background-color", "#00b74a");
    });
  };

  $(".modelStart").on("change", function() {
    let date2 = $(this).datepicker("getDate");
    date2.setDate(date2.getDate() + 364);
    $(".modelEnd").datepicker("setDate", date2);
  });
$(function() {
  $(".meterData").on("change", $('input[name="meterSelect"]'), function() {
    meterData = [];
  });
  $(".confirmMeter").click(function() {
    $(".modelStart").datepicker(
      "setDate",
      new Date(d.getFullYear() - 1, d.getMonth() - 1, 1)
    );
    $(".modelEnd").datepicker(
      "setDate",
      new Date(d.getFullYear() - 1, d.getMonth() - 1, +364)
    );
    $(".analysisStart").datepicker(
      "setDate",
      new Date(d.getFullYear(), d.getMonth() - 1, 1)
    );
    $(".analysisEnd").datepicker(
      "setDate",
      new Date(d.getFullYear(), d.getMonth(), 0)
    );
  })
    $('input[name="meterSelect"]:checked', $(".meterData")).each(function() {
      meterData.push({
        meter: $(this)
          .closest("tr")
          .children("td:eq(2)")
          .text(),
        building_number: $(this)
          .closest("tr")
          .children("td:eq(5)")
          .text(),
        commodity_tag: $(this)
          .closest("tr")
          .children("td:eq(6)")
          .text(),
      });
    });
    $(".meterSelection").text(meterData[0].meter);
  });

  $(".apiGateway").on("click", function(e) {
    e.preventDefault();
    if (meterData.length === 0) {
      alert(
        'No meter selected. Please click "Confirm Meter Selection" to confirm your selected meter'
      );
      $("#overlay").hide();
    } else {
      $("#chartData").load(location.href + " #chartData");
      $("#chartData2").load(location.href + " #chartData2");
      $("#chartData3").load(location.href + " #chartData3");
      $(".tableData").load(location.href + " .tableData");
      $("#collapseRow").load(location.href + " #collapseRow");
      modelApi();
    }
  });

  const modelApi = function() {
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
            modelApi();
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
        modelApi();
        $(".overlayMessage").text(
          "Server not responding, trying your search again. Please do not refresh the page"
        );
      } else {
        $(".displayData").show();
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

        console.log(response3);
        const analysisIndex = response[0].body.model.data.timestamp.indexOf(
          $(".analysisStart").val()
        );
        let lowLimit = response[0].body.model.data.predicted_value_lower_bound.slice(
          analysisIndex
        );
        let xTemp = response[0].body.model.data.average_dry_bulb_temperature.slice(
          analysisIndex
        );
        let highLimit = response[0].body.model.data.predicted_value_upper_bound.slice(
          analysisIndex
        );
        let rawValue = response[0].body.model.data.raw_value.slice(
          analysisIndex
        );
        let xtimestamp = response[0].body.model.data.timestamp.slice(
          analysisIndex
        );
        let result = {};
        let result2 = {};
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
        xTemp.forEach((key, i) => (result[key] = lowLimit[i]));

        var lowLimitArr = Object.keys(result).map(function(key) {
          return [Number(key), result[key]];
        });
        lowLimitArr.sort(function(a, b) {
          return a[0] - b[0];
        });

        xTemp.forEach((key, i) => (result[key] = highLimit[i]));

        let highLimitArr = Object.keys(result).map(function(key) {
          return [Number(key), result[key]];
        });

        highLimitArr.sort(function(a, b) {
          return a[0] - b[0];
        });

        xTemp.forEach((key, i) => {
          result[key] = rawValue[i];
        });

        let RawValueArr = Object.keys(result).map(function(key) {
          return [Number(key), result[key]];
        });

        RawValueArr.sort(function(a, b) {
          return a[0] - b[0];
        });

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
                data: RawValueArr.map((a) => {
                  return { x: a[0], y: Math.trunc(a[1]) };
                }),
                backgroundColor: "#00FFFF",
                pointRadius: 5,
              },
              {
                type: "line",
                label: "High Limit",
                data: highLimitArr.map((a) => {
                  return { x: a[0], y: a[1] };
                }),
                fill: false,
                pointRadius: 0,
                tension: 0.1,
                borderColor: "#d9534f",
              },
              {
                type: "line",
                label: "Low Limit",
                data: lowLimitArr.map((a) => {
                  return { x: a[0], y: a[1] };
                }),
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
            onClick(e) {
              const activePoints = myChart.getElementsAtEventForMode(
                e,
                "nearest",
                {
                  intersect: true,
                },
                false
              );
              const [{ index }] = activePoints;

              var $container = $(".scroll"),
                $scrollTo = $("#" + config.data.datasets[0].data[index].y);
              $container.animate({
                scrollTop:
                  $scrollTo.offset().top -
                  $container.offset().top +
                  $container.scrollTop() -
                  $container.height() / 2,
              });
              $scrollTo.parent("tr").effect("highlight", {}, 3000);
            },
          },
        };
        let ctx = document.getElementById("myChart").getContext("2d");
        let myChart = new Chart(ctx, config);

        xtimestamp.forEach((key, i) => (result2[key] = rawValue[i]));

        let rawValueArr2 = Object.keys(result2).map(function(key) {
          return [String(key), result2[key]];
        });

        rawValueArr2.sort(function(a, b) {
          return a[0] - b[0];
        });

        xtimestamp.forEach((key, i) => (result2[key] = highLimit[i]));
        let highLimitArr2 = Object.keys(result2).map(function(key) {
          return [String(key), result2[key]];
        });
        highLimitArr2.sort(function(a, b) {
          return a[0] - b[0];
        });

        xtimestamp.forEach((key, i) => (result2[key] = lowLimit[i]));
        var lowLimitArr2 = Object.keys(result2).map(function(key) {
          return [String(key), result2[key]];
        });
        lowLimitArr2.sort(function(a, b) {
          return a[0] - b[0];
        });
        const config2 = {
          data: {
            datasets: [
              {
                type: "scatter",
                label: "Meter VS. Dates",
                data: rawValueArr2.map((a) => {
                  return { x: a[0], y: Math.trunc(a[1]) };
                }),
                pointRadius: 5,
                backgroundColor: "#00FFFF",
              },
              {
                type: "line",
                label: "High Limit",
                data: highLimitArr2.map((a) => {
                  return { x: a[0], y: a[1] };
                }),
                fill: false,
                pointRadius: 0,
                borderColor: "#d9534f",
                tension: 0.1,
              },
              {
                type: "line",
                label: "Low Limit",
                data: lowLimitArr2.map((a) => {
                  return { x: a[0], y: a[1] };
                }),
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
            onClick(e) {
              const activePoints = myChart2.getElementsAtEventForMode(
                e,
                "nearest",
                {
                  intersect: true,
                },
                false
              );
              const [{ index }] = activePoints;

              var $container = $(".scroll"),
                $scrollTo = $("#" + config2.data.datasets[0].data[index].y);
              $container.animate({
                scrollTop:
                  $scrollTo.offset().top -
                  $container.offset().top +
                  $container.scrollTop() -
                  $container.height() / 2,
              });
              $scrollTo.parent("tr").effect("highlight", {}, 3000);
            },
          },
        };
        let ctx2 = document.getElementById("myChart2").getContext("2d");
        let myChart2 = new Chart(ctx2, config2);

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
                        <td class='expected'>${parseFloat(
                          expected[index]
                        ).toFixed(0)}</td>
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
            let meterReading = $(this)
              .find(".meterReading")
              .html();
            let lowerBound = $(this)
              .find(".lowerBound")
              .html();
            let upperBound = $(this)
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
              $(this).css("background-color", "#0275d8");
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

        const result3 = {};
        const xTimestamp2 = response2[0].body.timestamp;
        const yValue = response2[0].body.value;
        xTimestamp2.forEach((key, i) => (result3[key] = yValue[i]));

        const newArr = Object.keys(result3).map(function(key) {
          return [String(key), result3[key]];
        });

        google.load("visualization", "1", {
          packages: ["controls", "charteditor"],
        });
        google.setOnLoadCallback(drawChart);

        function drawChart() {
          var data = new google.visualization.DataTable();
          data.addColumn("date");
          data.addColumn("number");

          newArr.forEach((item) => {
            data.addRow([new Date(item[0]), item[1]]);
          });

          var dash = new google.visualization.Dashboard(
            document.getElementById("dashboard")
          );

          var control = new google.visualization.ControlWrapper({
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

          var chart = new google.visualization.ChartWrapper({
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
              var v = control.getState();
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
      }
    });
  };

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

    let checked = $("#replace").is(":checked");
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
        url: "/postModel",
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
    let str = $(".autoIgnored").text();
    let newStr = str.substring(0, str.length - 1);
    const building_number = $(".currentBuildingName").text();
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
    }).then(() => {
      $(".saveAttributes").html(
        `<i style="margin: 0 auto" class="far fa-check-circle fa-2x text-center"></i>`
      );
      setTimeout(() => {
        $(".saveAttributes").html("Save");
      }, 4000);
    });
  };
});
