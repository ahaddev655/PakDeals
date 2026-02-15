function PricingPage() {
  const discountedPrice = (price, discount) => {
    if (!discount) return price;
    return (price - (price * discount) / 100).toFixed(0);
  };
  const offers = [
    {
      id: 1,
      title: "Feature 1 Ad for 7 days",
      reach: "Reach up to 4 times more buyers",
      price: discountedPrice(1999, null),
      originalPrice: null,
      discount: null,
      recommended: false,
    },
    {
      id: 2,
      title: "Feature 1 Ad for 15 days",
      reach: "Reach up to 7 times more buyers",
      price: discountedPrice(3999, 38),
      originalPrice: 3999,
      discount: 38,
      recommended: true,
    },
    {
      id: 3,
      title: "Feature 1 Ad for 30 days",
      reach: "Reach up to 10 times more buyers",
      price: discountedPrice(5999, 33),
      originalPrice: 5999,
      discount: 33,
      recommended: true,
    },
    {
      id: 4,
      title: "Feature 1 Ad for 60 days",
      reach: "Reach up to 15 times more buyers",
      price: discountedPrice(6999, 30),
      originalPrice: 9999,
      discount: 30,
      recommended: false,
    },
  ];
  return (
    <div className="page max-w-2xl mx-auto">
      <div className="space-y-6"> 
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Pricing Plans
        </h2>
        {offers.map((offer) => (
          <label
            key={offer.id}
            htmlFor={`pricing${offer.id}`}
            className={`block transition-shadow ${
              offer.recommended
                ? "border-blue-600 shadow-lg"
                : "border-gray-300"
            } bg-white rounded-lg p-4 border hover:border-blue-400 hover:shadow-md cursor-pointer`}
          >
            <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="pricing"
                  id={`pricing${offer.id}`}
                  className="accent-blue-600"
                />
                <div>
                  <div className="sm:flex items-center gap-2">
                    <span className="text-lg font-semibold text-black">
                      {offer.title}
                    </span>
                    {offer.recommended && (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full ml-2">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {offer.reach}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-700">
                  PKR{offer.price}
                  {offer.discount && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      PKR{offer.originalPrice}
                    </span>
                  )}
                </div>
                {offer.discount && (
                  <div className="text-sm text-green-600 font-medium">
                    Save {offer.discount}%
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PricingPage;
