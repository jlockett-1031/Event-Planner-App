import { useState } from "react";
import { ArrowLeft, QrCode, DollarSign, Cloud, Car, Accessibility, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface AdvancedFeaturesProps {
  onBack?: () => void;
}

export default function AdvancedFeatures({ onBack }: AdvancedFeaturesProps) {
  const [budgetItems, setBudgetItems] = useState([
    { id: "1", name: "Venue Rental", amount: 500, paid: true },
    { id: "2", name: "Catering", amount: 800, paid: false },
    { id: "3", name: "Decorations", amount: 150, paid: true },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [transportation, setTransportation] = useState("Free street parking available on Main St and Oak Ave. Uber/Lyft drop-off at main entrance.");
  const [accessibility, setAccessibility] = useState("Wheelchair accessible entrance and restrooms. Elevator available to reach 2nd floor event space.");

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = budgetItems.filter(item => item.paid).reduce((sum, item) => sum + item.amount, 0);

  const handleGenerateQR = () => {
    console.log("Generating QR code");
    alert("QR code generated! Guests can scan this to check in at the event.");
  };

  const handleDownloadQR = () => {
    console.log("Downloading QR code");
    alert("Downloading QR code...");
  };

  const handleAddBudgetItem = () => {
    if (newItemName && newItemAmount) {
      setBudgetItems([
        ...budgetItems,
        {
          id: Date.now().toString(),
          name: newItemName,
          amount: parseFloat(newItemAmount),
          paid: false,
        },
      ]);
      setNewItemName("");
      setNewItemAmount("");
    }
  };

  const handleTogglePaid = (id: string) => {
    setBudgetItems(budgetItems.map(item =>
      item.id === id ? { ...item, paid: !item.paid } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const handleSaveTransportation = () => {
    console.log("Saving transportation info:", transportation);
    alert("Transportation information saved!");
  };

  const handleSaveAccessibility = () => {
    console.log("Saving accessibility info:", accessibility);
    alert("Accessibility information saved!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] text-white py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center">Advanced Features</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </button>

        <div className="space-y-6">
          {/* QR Code Check-in */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <QrCode className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">QR Code for Check-in</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Generate a unique QR code for easy guest check-in at your event. Guests can scan the code to confirm their arrival.
            </p>

            <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg mb-4">
              <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="secondary"
                onClick={handleGenerateQR}
                data-testid="button-generate-qr"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
              <Button
                variant="secondary"
                onClick={handleDownloadQR}
                data-testid="button-download-qr"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </div>
          </div>

          {/* Budget Tracker */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Budget Tracker</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Keep track of all event expenses in one place.
            </p>

            {/* Budget Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Total Budget</div>
                <div className="text-2xl font-bold">${totalBudget}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Paid</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">${paidAmount}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Remaining</div>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">${totalBudget - paidAmount}</div>
              </div>
            </div>

            {/* Budget Items */}
            <div className="space-y-2 mb-4">
              {budgetItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  data-testid={`budget-item-${item.id}`}
                >
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-muted-foreground">${item.amount}</div>
                  </div>
                  <Badge variant={item.paid ? "default" : "secondary"}>
                    {item.paid ? "Paid" : "Unpaid"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleTogglePaid(item.id)}
                    data-testid={`button-toggle-${item.id}`}
                  >
                    {item.paid ? "Mark Unpaid" : "Mark Paid"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteItem(item.id)}
                    data-testid={`button-delete-${item.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add New Item */}
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., Photography"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    data-testid="input-budget-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemAmount">Amount ($)</Label>
                  <Input
                    id="itemAmount"
                    type="number"
                    placeholder="0.00"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(e.target.value)}
                    data-testid="input-budget-amount"
                  />
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={handleAddBudgetItem}
                disabled={!newItemName || !newItemAmount}
                data-testid="button-add-budget-item"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Budget Item
              </Button>
            </div>
          </div>

          {/* Weather Forecast */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <Cloud className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Weather Forecast</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Check the weather forecast for your event date.
            </p>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">☀️</div>
                <div className="text-2xl font-bold">72°F</div>
                <div className="text-sm text-muted-foreground">December 15, 2025</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold">High</div>
                  <div>75°F</div>
                </div>
                <div>
                  <div className="font-semibold">Low</div>
                  <div>68°F</div>
                </div>
                <div>
                  <div className="font-semibold">Rain</div>
                  <div>10%</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Forecast will be more accurate closer to the event date
            </p>
          </div>

          {/* Transportation/Parking */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Transportation & Parking</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Provide parking and transportation details for your guests.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transportation">Parking & Transportation Instructions</Label>
                <Textarea
                  id="transportation"
                  value={transportation}
                  onChange={(e) => setTransportation(e.target.value)}
                  className="min-h-24"
                  data-testid="textarea-transportation"
                />
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={handleSaveTransportation}
                data-testid="button-save-transportation"
              >
                Save Transportation Info
              </Button>
            </div>
          </div>

          {/* Accessibility Information */}
          <div className="bg-card rounded-xl p-6 border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <Accessibility className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">Accessibility Information</h2>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Help guests with accessibility needs plan their visit.
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessibility">Accessibility Details</Label>
                <Textarea
                  id="accessibility"
                  value={accessibility}
                  onChange={(e) => setAccessibility(e.target.value)}
                  className="min-h-24"
                  data-testid="textarea-accessibility"
                />
                <p className="text-sm text-muted-foreground">
                  Include information about wheelchair access, elevators, ramps, accessible parking, and restrooms.
                </p>
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={handleSaveAccessibility}
                data-testid="button-save-accessibility"
              >
                Save Accessibility Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
