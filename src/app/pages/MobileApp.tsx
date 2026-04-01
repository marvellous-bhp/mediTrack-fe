import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Home,
  Pill,
  Calendar,
  User,
  Plus,
  Bell,
  Clock,
  Check,
  X,
  TrendingUp,
  Settings,
  ChevronRight,
  Search,
  AlertCircle,
  Languages
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

// Mock data
const mockMedications = [
  {
    id: 1,
    name: "Aspirin",
    dosage: "100mg",
    time: "08:00",
    taken: true,
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    time: "09:00",
    taken: true,
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "Vitamin D",
    dosage: "500 IU",
    time: "15:30",
    taken: false,
    color: "bg-orange-500"
  },
  {
    id: 4,
    name: "Aspirin",
    dosage: "100mg",
    time: "20:00",
    taken: false,
    color: "bg-blue-500"
  }
];

type Screen = "home" | "medications" | "calendar" | "profile";

type Medication = {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  color: string;
};

const REMINDER_WINDOW_MINUTES = 120;

const parseTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export function MobileApp() {
  const { t, language, setLanguage } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [dismissedReminderIds, setDismissedReminderIds] = useState<number[]>([]);
  const [now, setNow] = useState(() => new Date());

  const takenToday = medications.filter(m => m.taken).length;
  const totalToday = medications.length;
  const adherenceRate = Math.round((takenToday / totalToday) * 100);

  const handleMarkAsTaken = (id: number) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    setDismissedReminderIds(prev => prev.filter(reminderId => reminderId !== id));
  };

  const handleDismissReminder = (id: number) => {
    setDismissedReminderIds(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const overdueMedications = useMemo(() => {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return medications.filter((medication) => {
      if (medication.taken || dismissedReminderIds.includes(medication.id)) {
        return false;
      }

      const scheduledMinutes = parseTimeToMinutes(medication.time);
      const minutesLate = currentMinutes - scheduledMinutes;
      return minutesLate >= 0 && minutesLate <= REMINDER_WINDOW_MINUTES;
    });
  }, [dismissedReminderIds, medications, now]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20 max-w-md mx-auto">
      {/* Status Bar */}
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>9:41</span>
        <span>MediTrack</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 border border-white rounded-sm" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('mobile.hello')}, John!</h1>
            <p className="text-blue-100 text-sm">Thứ Ba, 31 Tháng 3, 2026</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Languages className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsReminderDialogOpen(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative"
            >
              <Bell className="w-5 h-5" />
              {overdueMedications.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                  {overdueMedications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Today's Progress Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-blue-100">{t('mobile.todayProgress')}</span>
            <span className="text-xl font-bold">{takenToday}/{totalToday}</span>
          </div>
          <Progress value={adherenceRate} className="bg-white/20 h-2" />
          <div className="mt-3 flex flex-col gap-1 text-sm text-blue-100">
            <span>{adherenceRate}% {t('mobile.completed')}</span>
            <span>{t('patient.streak')}: 7 {t('mobile.daysStreak')} 🔥</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-4">
        {currentScreen === "home" && (
          <div className="space-y-4">
            {overdueMedications.length > 0 && (
              <Card className="p-4 border-amber-200 bg-amber-50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-amber-900 mb-2">
                      {t("mobile.missedReminderTitle")}
                    </p>
                    <div className="space-y-2">
                      {overdueMedications.map((med) => (
                        <div key={med.id} className="rounded-lg border border-amber-200 bg-white p-3">
                          <p className="text-sm font-medium text-gray-900">
                            {med.name} ({med.dosage}) - {med.time}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">
                            {t("mobile.missedReminderMessage")}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleMarkAsTaken(med.id)}
                            >
                              {t("mobile.markTaken")}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => handleDismissReminder(med.id)}
                            >
                              {t("mobile.dismissReminder")}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-xs text-gray-600">{t('mobile.medications')}</p>
              </Card>

              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs text-gray-600">{t('mobile.thisWeek')}</p>
              </Card>

              <Card className="p-4 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-xs text-gray-600">{t('mobile.daysStreak')}</p>
              </Card>
            </div>

            {/* Today's Medications */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-900">{t('mobile.todaySchedule')}</h2>
                <Button
                  size="sm"
                  className="gap-1 h-8"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  {t('mobile.addMedication')}
                </Button>
              </div>

              <div className="space-y-3">
                {medications.map((med) => (
                  <Card key={med.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 ${med.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-900">{med.name}</h3>
                            <p className="text-sm text-gray-600">{med.dosage}</p>
                          </div>
                          {med.taken ? (
                            <Badge className="bg-green-100 text-green-800 gap-1 flex-shrink-0">
                              <Check className="w-3 h-3" />
                              {t('mobile.taken')}
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              className="h-7 text-xs flex-shrink-0"
                              onClick={() => handleMarkAsTaken(med.id)}
                            >
                              {t('mobile.markTaken')}
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{med.time}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{t('mobile.healthTip')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('mobile.healthTipText')}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {currentScreen === "medications" && (
          <div className="space-y-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold text-gray-900">{t('mobile.allMedications')}</h2>
              <Button
                size="sm"
                className="h-9 gap-1 whitespace-nowrap"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4" />
                {t('patient.addMedication')}
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder={t('mobile.searchMedication')} className="pl-10" />
            </div>

            {/* Medication List */}
            <div className="space-y-3">
              {["Aspirin", "Metformin", "Lisinopril", "Vitamin D"].map((name, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"][index]} rounded-xl flex items-center justify-center shadow-md`}>
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-600">
                          {index === 0 ? `2 ${t('mobile.timesPerDay')}` : `1 ${t('mobile.timesPerDay')}`}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentScreen === "calendar" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('mobile.history')}</h2>

            {/* Week View */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{t('mobile.thisWeekCal')}</h3>
              <div className="grid grid-cols-7 gap-2">
                {[
                  t('day.mon'),
                  t('day.tue'),
                  t('day.wed'),
                  t('day.thu'),
                  t('day.fri'),
                  t('day.sat'),
                  t('day.sun')
                ].map((day, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 ${
                      index === 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}>
                      <span className="text-xs font-medium">{day}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full mx-auto ${
                      index < 6 ? "bg-green-500" : index === 6 ? "bg-yellow-500" : "bg-gray-300"
                    }`} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent History */}
            <div>
              <h3 className="font-semibold mb-3">{t('mobile.recentActivity')}</h3>
              <div className="space-y-3">
                {[
                  { med: "Aspirin", time: "08:00 SA", status: "taken", date: t('mobile.today') },
                  { med: "Metformin", time: "09:00 SA", status: "taken", date: t('mobile.today') },
                  { med: "Vitamin D", time: "08:00 SA", status: "taken", date: t('mobile.today') },
                  { med: "Aspirin", time: "08:00 CH", status: "missed", date: t('mobile.yesterday') }
                ].map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.status === "taken" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {item.status === "taken" ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <X className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.med}</h3>
                          <p className="text-sm text-gray-600">{item.date} • {item.time}</p>
                        </div>
                      </div>
                      <Badge className={item.status === "taken" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {item.status === "taken" ? t('mobile.taken') : t('patient.missed')}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentScreen === "profile" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('mobile.profile')}</h2>

            {/* User Info */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  J
                </div>
                <div>
                  <h3 className="font-semibold text-lg">John Doe</h3>
                  <p className="text-sm text-gray-600">john.doe@email.com</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('mobile.currentPlan')}</span>
                  <Badge className="bg-blue-100 text-blue-800 whitespace-nowrap">{t('mobile.free')}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('mobile.memberSince')}</span>
                  <span className="font-medium whitespace-nowrap">01/01/2026</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600">
                {t('mobile.upgradePremium')}
              </Button>
            </Card>

            {/* Settings Options */}
            <div className="space-y-2">
              <Card className="p-4">
                <button className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium">{t('mobile.notifications')}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </Card>

              <Card className="p-4">
                <button className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-medium">{t('common.settings')}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </Card>

              <Card className="p-4">
                <button className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-medium">{t('mobile.personalInfo')}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </Card>
            </div>

            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
              {t('common.logout')}
            </Button>
          </div>
        )}
      </div>

      {/* Add Medication Dialog */}
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent className="max-w-sm mx-4 max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("mobile.notificationCenter")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            {overdueMedications.length === 0 ? (
              <Card className="p-4 text-center bg-slate-50">
                <p className="text-sm text-gray-700">{t("mobile.noNotifications")}</p>
              </Card>
            ) : (
              overdueMedications.map((med) => (
                <Card key={med.id} className="p-4 border-amber-200 bg-amber-50">
                  <p className="text-sm font-semibold text-gray-900">
                    {med.name} ({med.dosage}) - {med.time}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 mb-3">
                    {t("mobile.missedReminderMessage")}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleMarkAsTaken(med.id)}
                    >
                      {t("mobile.markTaken")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => handleDismissReminder(med.id)}
                    >
                      {t("mobile.dismissReminder")}
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-sm mx-4 max-h-[85vh] overflow-y-auto">
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
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t('patient.time')}</Label>
              <Input type="time" />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <p className="text-xs text-blue-800">
                💡 {t('patient.dateNote')}
              </p>
            </div>
            <Button className="w-full">{t('patient.addMedication')}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              currentScreen === "home" ? "bg-blue-50 text-blue-600" : "text-gray-600"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">{t('mobile.home')}</span>
          </button>

          <button
            onClick={() => setCurrentScreen("medications")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              currentScreen === "medications" ? "bg-blue-50 text-blue-600" : "text-gray-600"
            }`}
          >
            <Pill className="w-6 h-6" />
            <span className="text-xs font-medium">{t('mobile.medications')}</span>
          </button>

          <button
            onClick={() => setCurrentScreen("calendar")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              currentScreen === "calendar" ? "bg-blue-50 text-blue-600" : "text-gray-600"
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-medium">{t('mobile.calendar')}</span>
          </button>

          <button
            onClick={() => setCurrentScreen("profile")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              currentScreen === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">{t('mobile.profile')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
