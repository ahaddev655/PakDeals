import React from "react";
import Chart from "react-apexcharts";

function UserDataChartComponent({
  activeListings,
  expiredListings,
  pendingListings,
  totalListings,
  loading,
}) {
  const options = {
    chart: {
      type: "pie",
    },
    colors: ["#343a40", "#4f46e5", "#dc3545", "#6c757d"],
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "18px",
        fontWeight: "700",
        colors: ["#f8f8f8"],
      },
      dropShadow: {
        enabled: false,
      },
    },

    labels: ["Total", "Active", "Expired", "Pending"],
    legend: {
      position: "right",
      fontSize: "15px",
      fontFamily: "Inter, sans-serif",
      fontWeight: 600,
      labels: {
        colors: "#374151",
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 4,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      formatter: function (seriesName, opts) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName} : ${value}`;
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
            fontSize: "13px",
          },
        },
      },
    ],
  };

  const series = [
    totalListings,
    activeListings,
    expiredListings,
    pendingListings,
  ];

  return (
    <div className="col-span-2 bg-white p-6 shadow-lg rounded-lg border border-gray-300">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Listing Analytics
        </h1>
      </div>
      <div className="relative w-full h-112.5 flex justify-center items-center shadow-sm rounded-lg overflow-hidden">
        <div className="absolute inset-0 w-auto h-auto overflow-hidden">
          {loading ? (
            <p className="text-center font-semibold text-xl text-gray-600">
              Loading...
            </p>
          ) : (
            <Chart
              options={options}
              series={series}
              type="pie"
              width="100%"
              height="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDataChartComponent;
