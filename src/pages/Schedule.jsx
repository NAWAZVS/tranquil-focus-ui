import { useState } from "react";
import { Plus, X, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format, startOfWeek, addDays, isSameDay, isToday } from "date-fns";
import Layout from "@/components/Layout";

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    time: "",
    duration: 60,
  });

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !newEvent.time) return;

    const [hours, minutes] = newEvent.time.split(":").map(Number);
    const eventDate = new Date(selectedDate);
    eventDate.setHours(hours, minutes, 0, 0);

    const event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      date: eventDate,
      time: newEvent.time,
      duration: newEvent.duration,
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: "",
      description: "",
      time: "",
      duration: 60,
    });
    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getEventsForDate = (date) => {
    return events
      .filter(event => isSameDay(event.date, date))
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const weekDays = getWeekDays();
  const todaysEvents = getEventsForDate(selectedDate);

  return (
    <Layout>
      <div className="px-6 mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
              Schedule
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Organize your time and plan your day
            </p>
          </div>

          {/* Controls */}
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => setView("day")}
                  variant={view === "day" ? "default" : "ghost"}
                  size="sm"
                >
                  Day View
                </Button>
                <Button
                  onClick={() => setView("week")}
                  variant={view === "week" ? "default" : "ghost"}
                  size="sm"
                >
                  Week View
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedDate(prev => addDays(prev, view === "week" ? -7 : -1))}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setSelectedDate(new Date())}
                    variant="outline"
                    size="sm"
                  >
                    Today
                  </Button>
                  <Button
                    onClick={() => setSelectedDate(prev => addDays(prev, view === "week" ? 7 : 1))}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary hover:scale-105 transition-transform">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-strong border-border/20">
                    <DialogHeader>
                      <DialogTitle className="font-heading text-foreground">
                        Add Event for {format(selectedDate, "MMM dd, yyyy")}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Event title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-background/10 border-border/30"
                      />
                      <Textarea
                        placeholder="Event description (optional)"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-background/10 border-border/30"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                          className="bg-background/10 border-border/30"
                        />
                        <Input
                          type="number"
                          placeholder="Duration (minutes)"
                          value={newEvent.duration}
                          onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                          className="bg-background/10 border-border/30"
                        />
                      </div>
                      <Button onClick={handleAddEvent} className="w-full bg-gradient-primary">
                        Add Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {view === "week" ? (
            /* Week View */
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, index) => (
                <Card 
                  key={index} 
                  className={`glass p-4 cursor-pointer hover-lift ${
                    isSameDay(day, selectedDate) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-center mb-4">
                    <p className="font-body text-sm text-muted-foreground">
                      {format(day, "EEE")}
                    </p>
                    <p className={`font-heading font-bold text-xl ${
                      isToday(day) ? 'text-primary' : 'text-foreground'
                    }`}>
                      {format(day, "dd")}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {getEventsForDate(day).slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="p-2 bg-primary/10 rounded-lg text-xs"
                      >
                        <p className="font-semibold text-primary truncate">
                          {event.title}
                        </p>
                        <p className="text-muted-foreground">
                          {event.time}
                        </p>
                      </div>
                    ))}
                    {getEventsForDate(day).length > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{getEventsForDate(day).length - 3} more
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Day View */
            <div>
              <Card className="glass p-6 mb-6">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                  {format(selectedDate, "EEEE, MMMM dd, yyyy")}
                </h2>
                <p className="font-body text-muted-foreground">
                  {todaysEvents.length} event{todaysEvents.length !== 1 ? 's' : ''} scheduled
                </p>
              </Card>

              <div className="space-y-4">
                {todaysEvents.length === 0 ? (
                  <Card className="glass-strong p-8 text-center">
                    <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-body text-muted-foreground">
                      No events scheduled for this day. Add an event to get started!
                    </p>
                  </Card>
                ) : (
                  todaysEvents.map((event) => (
                    <Card key={event.id} className="glass hover-lift p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                              {event.title}
                            </h3>
                            {event.description && (
                              <p className="font-body text-sm text-muted-foreground mb-2">
                                {event.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="text-primary">
                                <Clock className="w-3 h-3 mr-1" />
                                {event.time}
                              </Badge>
                              <Badge variant="outline" className="text-muted-foreground">
                                {event.duration} min
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDeleteEvent(event.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Schedule;
