import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Pill,
  Bell,
  Calendar,
  Clock,
  Plus,
  Check,
  X,
  Home,
  BarChart3,
  Settings,
  LogOut,
  User
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

// Mock data
const mockMedications = [
  {
    id: 1,
    name: "Aspirin",
    dosage: "100mg",
    times: ["08:00 AM", "08:00 PM"],
    frequency: "Twice daily",
    takenToday: [true, false],
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    times: ["09:00 AM"],
    frequency: "Once daily",
    takenToday: [true],
    color: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    name: "Lisinopril",
    dosage: "10mg",
    times: ["07:00 AM"],
    frequency: "Once daily",
    takenToday: [false],
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 4,
    name: "Vitamin D",
    dosage: "1000 IU",
    times: ["08:00 AM"],
    frequency: "Once daily",
    takenToday: [true],
    color: "bg-orange-100 text-orange-800"
  }
];

const adherenceData = [
  { day: 'Mon', rate: 100 },
  { day: 'Tue', rate: 95 },
  { day: 'Wed', rate: 100 },
  { day: 'Thu', rate: 90 },
  { day: 'Fri', rate: 100 },
  { day: 'Sat', rate: 85 },
  { day: 'Sun', rate: 95 }
];

const historyData = [
  { date: "2026-03-31", medication: "Aspirin", time: "08:00 AM", status: "taken" },
  { date: "2026-03-31", medication: "Metformin", time: "09:00 AM", status: "taken" },
  { date: "2026-03-31", medication: "Vitamin D", time: "08:00 AM", status: "taken" },
  { date: "2026-03-30", medication: "Aspirin", time: "08:00 PM", status: "missed" },
  { date: "2026-03-30", medication: "Aspirin", time: "08:00 AM", status: "taken" },
  { date: "2026-03-30", medication: "Lisinopril", time: "07:00 AM", status: "taken" },
];

export function PatientDashboard() {
  const { t } = useLanguage();
  const [medications, setMedications] = useState(mockMedications);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const totalDoses = medications.reduce((acc, med) => acc + med.times.length, 0);
  const takenDoses = medications.reduce((acc, med) => {
    return acc + med.takenToday.filter(t => t).length;
  }, 0);
  const adherenceRate = Math.round((takenDoses / totalDoses) * 100);

  const handleMarkAsTaken = (medId: number, timeIndex: number) => {
    setMedications(prev => prev.map(med => {
      if (med.id === medId) {
        const newTakenToday = [...med.takenToday];
        newTakenToday[timeIndex] = true;
        return { ...med, takenToday: newTakenToday };
      }
      return med;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MediTrack</span>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('common.logout')}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('patient.welcome')}, John!</h1>
          <p className="text-gray-600">{t('patient.today')} Tuesday, March 31, 2026</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('patient.todayProgress')}</p>
                <p className="text-3xl font-bold text-gray-900">{takenDoses}/{totalDoses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <Progress value={adherenceRate} className="mt-4" />
            <p className="text-sm text-gray-600 mt-2">{adherenceRate}% {t('patient.adherence')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('patient.activeMeds')}</p>
                <p className="text-3xl font-bold text-gray-900">{medications.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6">{t('patient.medicationsTracked')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('patient.weeklyRate')}</p>
                <p className="text-3xl font-bold text-gray-900">95%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-6">↑ 5% {t('patient.fromLastWeek')}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('patient.streak')}</p>
                <p className="text-3xl font-bold text-gray-900">7</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-6">{t('patient.daysInRow')}</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Medications */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="today" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="today">{t('patient.todaySchedule')}</TabsTrigger>
                  <TabsTrigger value="all">{t('patient.allMedications')}</TabsTrigger>
                  <TabsTrigger value="history">{t('patient.history')}</TabsTrigger>
                </TabsList>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      {t('patient.addMedication')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{t('patient.addNewMedication')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>{t('patient.medicationName')}</Label>
                        <Input placeholder={t('placeholder.medication')} />
                      </div>
                      <div>
                        <Label>{t('patient.dosage')}</Label>
                        <Input placeholder={t('placeholder.dosage')} />
                      </div>
                      <div>
                        <Label>{t('patient.frequency')}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('placeholder.selectFrequency')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once">{t('frequency.once')}</SelectItem>
                            <SelectItem value="twice">{t('frequency.twice')}</SelectItem>
                            <SelectItem value="thrice">{t('frequency.thrice')}</SelectItem>
                            <SelectItem value="custom">{t('frequency.custom')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t('patient.time')}</Label>
                        <Input type="time" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>{t('patient.startDate')}</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label>{t('patient.endDate')}</Label>
                          <Input type="date" />
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          💡 <strong>{t('patient.dateNote')}</strong>
                        </p>
                      </div>
                      <Button className="w-full">{t('patient.addMedication')}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <TabsContent value="today" className="space-y-4">
                {medications.map((med) => (
                  <Card key={med.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{med.name}</h3>
                          <Badge className={med.color}>{med.dosage}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{med.frequency}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {med.times.map((time, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{time}</span>
                          </div>
                          {med.takenToday[index] ? (
                            <Badge className="bg-green-100 text-green-800 gap-2">
                              <Check className="w-4 h-4" />
                              {t('patient.taken')}
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleMarkAsTaken(med.id, index)}
                            >
                              {t('patient.markAsTaken')}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {medications.map((med) => (
                    <Card key={med.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{med.name}</h3>
                          <Badge className={med.color}>{med.dosage}</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{med.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{med.times.join(", ")}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('patient.recentActivity')}</h3>
                  <div className="space-y-4">
                    {historyData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">{item.medication}</p>
                          <p className="text-sm text-gray-600">{item.date} at {item.time}</p>
                        </div>
                        {item.status === "taken" ? (
                          <Badge className="bg-green-100 text-green-800 gap-2">
                            <Check className="w-4 h-4" />
                            {t('patient.taken')}
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 gap-2">
                            <X className="w-4 h-4" />
                            {t('patient.missed')}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Stats & Chart */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('patient.weeklyAdherence')}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={adherenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#3b82f6"
                    fill="#93c5fd"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('patient.upcomingReminders')}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Aspirin</p>
                    <p className="text-sm text-gray-600">Today at 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Lisinopril</p>
                    <p className="text-sm text-gray-600">Tomorrow at 7:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Metformin</p>
                    <p className="text-sm text-gray-600">Tomorrow at 9:00 AM</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <h3 className="text-lg font-semibold mb-2">{t('patient.upgradeToPremium')}</h3>
              <p className="text-sm text-blue-100 mb-4">
                {t('patient.premiumDesc')}
              </p>
              <Link to="/pricing">
                <Button variant="secondary" className="w-full">
                  {t('patient.viewPlans')}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
