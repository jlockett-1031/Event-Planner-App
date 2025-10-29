import PotluckList from "../PotluckList";

export default function PotluckListExample() {
  const items = [
    { id: "1", item: "Appetizers", claimedBy: "John Doe" },
    { id: "2", item: "Main Dish" },
    { id: "3", item: "Dessert", claimedBy: "Jane Smith" },
    { id: "4", item: "Drinks" },
  ];

  return (
    <div className="p-4 max-w-md">
      <PotluckList
        items={items}
        onClaim={(id) => console.log("Claim", id)}
        onUnclaim={(id) => console.log("Unclaim", id)}
      />
    </div>
  );
}
