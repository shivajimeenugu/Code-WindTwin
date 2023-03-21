// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).
import "../css/app.css"

import ApexCharts from 'apexcharts'
const fft = require('fft-js').fft;

import "phoenix_html"
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"

  var options1 = {
    chart: {
      id: 'realtime',
      height: 200,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#FF1654"],
    series: [
      {
        name: "RPM",
        data: []
      }
    ],
    stroke: {
      width: [4]
    },
    plotOptions: {
      bar: {
        columnWidth: "100%"
      }
    },
    xaxis: {
      range:10
    },
    yaxis: [
      {
        
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FF1654"
        },
        labels: {
          style: {
            colors: "#FF1654"
          }
        },
        title: {
          text: "RPM",
          style: {
            color: "#FF1654"
          }
        }
      }
    ],
    tooltip: {
      enabled: true,
      shared: true,
      // intersect: true,
      x: {
        show: true
      },
      y: {
        show: true
      },
      marker:{
        show: true,
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  };
  
  var chart1 = new ApexCharts(document.querySelector("#myChart1"), options1);
  
  chart1.render();




  var options2 = {
    chart: {
      id: 'realtime',
      height: 200,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#1f8cdd"],
    series: [
      {
        name: "Voltage",
        data: []
      }
    ],
    stroke: {
      width: [4]
    },
    plotOptions: {
      bar: {
        columnWidth: "100%"
      }
    },
    xaxis: {
      range:10
    },
    yaxis: [
      {
        
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#1f8cdd"
        },
        labels: {
          style: {
            colors: "#1f8cdd"
          }
        },
        title: {
          text: "Voltage",
          style: {
            color: "#1f8cdd"
          }
        }
      }
    ],
    tooltip: {
      enabled: true,
      shared: true,
      // intersect: true,
      x: {
        show: true
      },
      y: {
        show: true
      },
      marker:{
        show: true,
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  };
  
  var chart2 = new ApexCharts(document.querySelector("#myChart2"), options2);
  
  chart2.render();



  var options3 = {
    chart: {
      id: 'realtime',
      height: 200,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#FF1654"],
    series: [
      {
        name: "Vibration",
        data: []
      }
    ],
    stroke: {
      width: [4]
    },
    plotOptions: {
      bar: {
        columnWidth: "100%"
      }
    },
    xaxis: {
      range:10
    },
    yaxis: [
      {
        
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FF1654"
        },
        labels: {
          style: {
            colors: "#FF1654"
          }
        },
        title: {
          text: "Vibration",
          style: {
            color: "#FF1654"
          }
        }
      }
    ],
    tooltip: {
      enabled: true,
      shared: true,
      // intersect: true,
      x: {
        show: true
      },
      y: {
        show: true
      },
      marker:{
        show: true,
      }
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40
    }
  };
  
  var chart3 = new ApexCharts(document.querySelector("#myChart3"), options3);
  
  chart3.render();
  

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")

let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}})

topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())
liveSocket.connect()


  function convertToVibration(x, y, z) {
    return Math.sqrt((x * x + y * y + z * z) / 3);
  
  }


  
  

  window.addEventListener(`phx:updatereal`, (e) => {
    var data=e.detail.data;
    if(data!="")
    {
      var jdata =JSON.parse(data);
      var rpm = jdata.M;
      var voltage=jdata.V;
      var x_y_z=jdata.X_Y_Z.split('_').map(parseFloat);
      var vib=convertToVibration(x_y_z[0],x_y_z[1],x_y_z[2])

      document.getElementById("rpm_tag").innerText=rpm+" RPM";
      document.getElementById("voltage_tag").innerText=voltage+" Voltage";
      document.getElementById("vibration_tag").innerText=vib.toFixed(2)+" Vibration";

      changeSpeed(parseInt(rpm))
      chart1.appendData([{
          name: "RPM",
          data: [parseFloat(rpm)]
        }
      
      ])
  
  
      chart2.appendData([{
        name: "Voltage",
        data: [parseFloat(voltage)]
      }
    
    ])
  
  
    chart3.appendData([{
      name: "Vibration",
      data: [vib]
    }
  
  ])
    }
    
    
  })

window.liveSocket = liveSocket

