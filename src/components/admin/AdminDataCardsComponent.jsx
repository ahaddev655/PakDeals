import { LayoutGrid, LockOpen, MessageSquareQuote, Users2 } from "lucide-react";

function AdminDataCardsComponent({
  totalListings,
  activeListings,
  blogs,
  users,
  loading,
}) {
  const dataCards = [
    {
      text: "Total Listings",
      value: totalListings,
      icon: LayoutGrid,
      color: "#343a40",
    },
    {
      text: "Active Listings",
      value: activeListings,
      icon: LockOpen,
      color: "#4f46e5",
    },
    {
      text: "Total Blogs",
      value: blogs,
      icon: MessageSquareQuote,
      color: "#dc3545",
    },
    {
      text: "Total User",
      value: users,
      icon: Users2,
      color: "#6c757d",
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {dataCards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="p-6 flex items-center justify-between bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div>
              <p className="uppercase text-[13px] font-medium text-gray-400 tracking-wide">
                {card.text}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-gray-700">
                {loading ? (
                  <p className="text-center font-semibold text-xl text-gray-600">
                    Loading...
                  </p>
                ) : (
                  (card.value || 0).toLocaleString()
                )}
              </h3>
            </div>

            <div
              className="w-15 h-15 text-white grid place-items-center rounded-xl"
              style={{ backgroundColor: card.color }}
            >
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminDataCardsComponent;
