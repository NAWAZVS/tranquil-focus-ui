import { useState } from "react";
import { Plus, X, TrendingUp, TrendingDown, PieChart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Layout from "@/components/Layout";

const Finances = () => {
  const [transactions, setTransactions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
  });

  const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Other"];
  const expenseCategories = ["Food", "Travel", "Subscriptions", "Shopping", "Bills", "Entertainment", "Health", "Other"];

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) return;

    const transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      category: newTransaction.category,
      description: newTransaction.description,
      date: new Date(),
    };

    setTransactions(prev => [...prev, transaction]);
    setNewTransaction({
      type: "expense",
      amount: "",
      category: "",
      description: "",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const getCategoryColor = (category, type) => {
    if (type === "income") return "text-nature-forest bg-nature-forest/10";
    
    const colorMap = {
      "Food": "text-nature-sunset bg-nature-sunset/10",
      "Travel": "text-nature-ocean bg-nature-ocean/10",
      "Subscriptions": "text-nature-mountain bg-nature-mountain/10",
      "Shopping": "text-purple-400 bg-purple-400/10",
      "Bills": "text-red-400 bg-red-400/10",
      "Entertainment": "text-pink-400 bg-pink-400/10",
      "Health": "text-green-400 bg-green-400/10",
    };
    
    return colorMap[category] || "text-muted-foreground bg-muted/10";
  };

  return (
    <Layout>
      <div className="px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
              Finance Tracker
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Track your income and expenses
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-nature-forest/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-nature-forest" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Total Income</p>
                  <p className="font-heading font-bold text-2xl text-nature-forest">
                    ₹{totalIncome.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-400/10 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Total Expenses</p>
                  <p className="font-heading font-bold text-2xl text-red-400">
                    ₹{totalExpenses.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${balance >= 0 ? 'bg-nature-ocean/10' : 'bg-red-400/10'}`}>
                  <DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-nature-ocean' : 'text-red-400'}`} />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Balance</p>
                  <p className={`font-heading font-bold text-2xl ${balance >= 0 ? 'text-nature-ocean' : 'text-red-400'}`}>
                    ₹{balance.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Add Transaction Button */}
          <div className="glass rounded-2xl p-6 mb-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-strong border-border/20">
                <DialogHeader>
                  <DialogTitle className="font-heading text-foreground">Add Transaction</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => setNewTransaction(prev => ({ ...prev, type: "income", category: "" }))}
                      variant={newTransaction.type === "income" ? "default" : "outline"}
                      className={newTransaction.type === "income" ? "bg-nature-forest text-white" : ""}
                    >
                      Income
                    </Button>
                    <Button
                      onClick={() => setNewTransaction(prev => ({ ...prev, type: "expense", category: "" }))}
                      variant={newTransaction.type === "expense" ? "default" : "outline"}
                      className={newTransaction.type === "expense" ? "bg-red-400 text-white" : ""}
                    >
                      Expense
                    </Button>
                  </div>
                  
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                    className="bg-background/10 border-border/30"
                  />
                  
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-background/10 border-border/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(newTransaction.type === "income" ? incomeCategories : expenseCategories).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    placeholder="Description (optional)"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-background/10 border-border/30"
                  />
                  
                  <Button onClick={handleAddTransaction} className="w-full bg-gradient-primary">
                    Add Transaction
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <Card className="glass-strong p-8 text-center">
                <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-body text-muted-foreground">
                  No transactions yet. Add your first transaction to get started!
                </p>
              </Card>
            ) : (
              transactions
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((transaction) => (
                  <Card key={transaction.id} className="glass hover-lift p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${transaction.type === "income" ? 'bg-nature-forest/10' : 'bg-red-400/10'}`}>
                          {transaction.type === "income" ? 
                            <TrendingUp className="w-5 h-5 text-nature-forest" /> :
                            <TrendingDown className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-heading font-semibold text-foreground">
                              {transaction.description || transaction.category}
                            </p>
                            <Badge className={getCategoryColor(transaction.category, transaction.type)}>
                              {transaction.category}
                            </Badge>
                          </div>
                          <p className="font-body text-sm text-muted-foreground">
                            {format(transaction.date, "MMM dd, yyyy 'at' HH:mm")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <p className={`font-heading font-bold text-xl ${
                          transaction.type === "income" ? 'text-nature-forest' : 'text-red-400'
                        }`}>
                          {transaction.type === "income" ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <Button
                          onClick={() => handleDeleteTransaction(transaction.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Finances;
