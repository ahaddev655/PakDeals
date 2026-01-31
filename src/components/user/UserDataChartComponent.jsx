import React, { useState } from "react";
import Chart from "react-apexcharts";

function UserDataChartComponent({
  activeListings,
  expiredListings,
  pendingListings,
  totalListings,
}) {
  // ==================== AUTH CHECK ====================

  // ==================== CHART OPTIONS ====================
  const options = {
    chart: {
      type: "pie",
    },
    colors: ["#343a40", "#4f46e5", "#dc3545", "#6c757d"],
    plotOptions: {
      pie: {
        expandOnClick: true,
        size: "100%",
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
      <div className="w-full h-87.5 md:h-112.5 flex justify-center items-center shadow-sm rounded-lg">
        <Chart
          options={options}
          series={series}
          type="pie"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default UserDataChartComponent;
