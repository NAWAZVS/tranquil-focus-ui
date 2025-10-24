import { useState } from "react";
import { Plus, X, Heart, Search, BookOpen, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Layout from "@/components/Layout";

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral",
  });

  const handleAddEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date(),
      isFavorite: false,
      mood: newEntry.mood,
    };

    setEntries(prev => [...prev, entry]);
    setNewEntry({
      title: "",
      content: "",
      mood: "neutral",
    });
    setIsDialogOpen(false);
  };

  const handleEditEntry = () => {
    if (!editingEntry || !newEntry.title.trim() || !newEntry.content.trim()) return;

    setEntries(prev => prev.map(entry => 
      entry.id === editingEntry.id 
        ? { ...entry, title: newEntry.title, content: newEntry.content, mood: newEntry.mood }
        : entry
    ));
    setEditingEntry(null);
    setNewEntry({
      title: "",
      content: "",
      mood: "neutral",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    ));
  };

  const openEditDialog = (entry) => {
    setEditingEntry(entry);
    setNewEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood || "neutral",
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingEntry(null);
    setNewEntry({
      title: "",
      content: "",
      mood: "neutral",
    });
    setIsDialogOpen(true);
  };

  const filteredEntries = entries
    .filter(entry => 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "happy": return "😊";
      case "excited": return "🎉";
      case "sad": return "😢";
      case "stressed": return "😰";
      default: return "😐";
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case "happy": return "text-nature-forest bg-nature-forest/10";
      case "excited": return "text-nature-sunset bg-nature-sunset/10";
      case "sad": return "text-blue-400 bg-blue-400/10";
      case "stressed": return "text-red-400 bg-red-400/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <Layout>
      <div className="px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
              Personal Diary
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Capture your thoughts and daily reflections
            </p>
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/10 border-border/30"
                />
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={openNewDialog}
                    className="bg-gradient-primary hover:scale-105 transition-transform"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-strong border-border/20 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-foreground">
                      {editingEntry ? "Edit Entry" : "New Diary Entry"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Entry title"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-background/10 border-border/30"
                    />
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        How are you feeling?
                      </label>
                      <div className="flex gap-2">
                        {[
                          { mood: "happy", emoji: "😊", label: "Happy" },
                          { mood: "excited", emoji: "🎉", label: "Excited" },
                          { mood: "neutral", emoji: "😐", label: "Neutral" },
                          { mood: "sad", emoji: "😢", label: "Sad" },
                          { mood: "stressed", emoji: "😰", label: "Stressed" },
                        ].map(({ mood, emoji, label }) => (
                          <Button
                            key={mood}
                            onClick={() => setNewEntry(prev => ({ ...prev, mood: mood }))}
                            variant={newEntry.mood === mood ? "default" : "outline"}
                            size="sm"
                          >
                            {emoji} {label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Textarea
                      placeholder="Write your thoughts here..."
                      value={newEntry.content}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                      className="bg-background/10 border-border/30 min-h-[200px]"
                    />
                    
                    <Button 
                      onClick={editingEntry ? handleEditEntry : handleAddEntry} 
                      className="w-full bg-gradient-primary"
                    >
                      {editingEntry ? "Update Entry" : "Save Entry"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Total Entries</p>
                  <p className="font-heading font-bold text-2xl text-foreground">
                    {entries.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-400/10 rounded-lg">
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Favorites</p>
                  <p className="font-heading font-bold text-2xl text-red-400">
                    {entries.filter(e => e.isFavorite).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-nature-forest/10 rounded-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">This Month</p>
                  <p className="font-heading font-bold text-2xl text-nature-forest">
                    {entries.filter(e => 
                      e.date.getMonth() === new Date().getMonth() &&
                      e.date.getFullYear() === new Date().getFullYear()
                    ).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Entries List */}
          <div className="space-y-6">
            {filteredEntries.length === 0 ? (
              <Card className="glass-strong p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-body text-muted-foreground">
                  {searchTerm ? "No entries found matching your search." : "No diary entries yet. Start writing your first entry!"}
                </p>
              </Card>
            ) : (
              filteredEntries.map((entry) => (
                <Card key={entry.id} className="glass hover-lift p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading font-semibold text-xl text-foreground">
                        {entry.title}
                      </h3>
                      <Badge className={getMoodColor(entry.mood)}>
                        {getMoodEmoji(entry.mood)} {entry.mood}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleToggleFavorite(entry.id)}
                        variant="ghost"
                        size="sm"
                        className={entry.isFavorite ? "text-red-400 hover:text-red-300" : "text-muted-foreground hover:text-red-400"}
                      >
                        <Heart className={`w-4 h-4 ${entry.isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        onClick={() => openEditDialog(entry)}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteEntry(entry.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    {format(entry.date, "EEEE, MMMM dd, yyyy 'at' HH:mm")}
                  </p>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="font-body text-foreground leading-relaxed whitespace-pre-wrap">
                      {entry.content.length > 300 
                        ? `${entry.content.substring(0, 300)}...` 
                        : entry.content
                      }
                    </p>
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

export default Diary;
