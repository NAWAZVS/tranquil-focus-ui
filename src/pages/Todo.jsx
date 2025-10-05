import { useState } from "react";
import { Plus, X, Check, Calendar, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import Layout from "@/components/Layout";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Personal",
    priority: "Medium",
    dueDate: undefined,
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      completed: false,
      createdAt: new Date(),
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: "",
      description: "",
      category: "Personal",
      priority: "Medium",
      dueDate: undefined,
    });
    setIsDialogOpen(false);
  };

  const handleToggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-400 bg-red-400/10";
      case "Medium": return "text-nature-sunset bg-nature-sunset/10";
      case "Low": return "text-nature-forest bg-nature-forest/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Work": return "text-nature-ocean bg-nature-ocean/10";
      case "Study": return "text-nature-mountain bg-nature-mountain/10";
      case "Personal": return "text-nature-forest bg-nature-forest/10";
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
              To-Do List
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Organize your tasks and stay productive
            </p>
          </div>

          {/* Filters */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {["All", "Pending", "Completed"].map((filterOption) => (
                  <Button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    variant={filter === filterOption ? "default" : "ghost"}
                    size="sm"
                    className={filter === filterOption ? "bg-primary text-primary-foreground" : ""}
                  >
                    {filterOption}
                  </Button>
                ))}
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:scale-105 transition-transform">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-strong border-border/20">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-foreground">Add New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-background/10 border-border/30"
                    />
                    <Textarea
                      placeholder="Task description (optional)"
                      value={newTask.description}
                      onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-background/10 border-border/30"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Select
                        value={newTask.category}
                        onValueChange={(value) => setNewTask(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="bg-background/10 border-border/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Work">Work</SelectItem>
                          <SelectItem value="Study">Study</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className="bg-background/10 border-border/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low Priority</SelectItem>
                          <SelectItem value="Medium">Medium Priority</SelectItem>
                          <SelectItem value="High">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddTask} className="w-full bg-gradient-primary">
                      Add Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <Card className="glass-strong p-8 text-center">
                <p className="font-body text-muted-foreground">
                  {filter === "All" ? "No tasks yet. Add your first task to get started!" :
                   filter === "Completed" ? "No completed tasks yet." :
                   "No pending tasks. Great job!"}
                </p>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id} className="glass hover-lift p-6">
                  <div className="flex items-start gap-4">
                    <Button
                      onClick={() => handleToggleComplete(task.id)}
                      variant="ghost"
                      size="sm"
                      className={`p-2 rounded-full ${task.completed ? 'text-nature-forest' : 'text-muted-foreground'}`}
                    >
                      <Check className={`w-5 h-5 ${task.completed ? 'opacity-100' : 'opacity-30'}`} />
                    </Button>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className={`font-heading font-semibold text-lg ${
                          task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}>
                          {task.title}
                        </h3>
                        <Button
                          onClick={() => handleDeleteTask(task.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {task.description && (
                        <p className="font-body text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getCategoryColor(task.category)}>
                          {task.category}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          <Flag className="w-3 h-3 mr-1" />
                          {task.priority}
                        </Badge>
                        {task.dueDate && (
                          <Badge variant="outline" className="text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {format(task.dueDate, "MMM dd")}
                          </Badge>
                        )}
                      </div>
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

export default Todo;
