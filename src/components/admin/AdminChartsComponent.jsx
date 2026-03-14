import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { Loader2 } from "lucide-react";

function AdminChartsComponent({
  totalListings = 0,
  activeListings = 0,
  blogs = 0,
  users = 0,
  loading = false,
}) {
  const series = useMemo(
    () => [activeListings, blogs, users],
    [activeListings, blogs, users],
  );

  const options = useMemo(
    () => ({
      chart: {
        type: "donut",
        fontFamily: "Inter, sans-serif",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      colors: ["#4f46e5", "#ef4444", "#64748b"],
      stroke: {
        show: true,
        width: 2,
        colors: ["#fff"],
      },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "TOTAL LISTINGS",
                fontSize: "12px",
                fontWeight: 800,
                color: "#94a3b8",
                formatter: () => totalListings,
              },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 900,
                color: "#1e293b",
                offsetY: 5,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => val.toFixed(0) + "%",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
        dropShadow: { enabled: false },
      },
      labels: ["Active", "Blogs", "Users"],
      legend: {
        position: "right",
        fontSize: "14px",
        fontWeight: 600,
        labels: { colors: "#475569" },
        markers: {
          width: 10,
          height: 10,
          radius: 3,
          offsetX: -5,
        },
        itemMargin: { vertical: 5 },
        formatter: (seriesName, opts) => {
          return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val} Listings`,
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            legend: {
              position: "bottom",
              horizontalAlign: "center",
            },
          },
        },
      ],
    }),
    [totalListings],
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full col-span-2">
      <div className="mb-6">
        <h2 className="text-lg font-black text-slate-800 tracking-tight">
          Listing Analytics
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
          Distribution Overview
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center min-h-80">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-indigo-600" size={32} />
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
              Calculating...
            </p>
          </div>
        ) : (
          <div className="w-full max-w-112.5">
            {series.every((val) => val === 0) ? (
              <p className="text-slate-400 text-sm font-medium italic text-center">
                No data available to display
              </p>
            ) : (
              <Chart
                options={options}
                series={series}
                type="donut"
                width="100%"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChartsComponent;
