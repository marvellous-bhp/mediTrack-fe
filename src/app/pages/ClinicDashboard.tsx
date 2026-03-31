import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Hospital, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Plus,
  Bell,
  Settings,
  LogOut,
  User,
  Pill,
  Calendar,
  BarChart3,
  ChevronRight
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data
const mockPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 45,
    medications: 3,
    adherence: 98,
    status: "excellent",
    lastCheck: "2 hours ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 62,
    medications: 5,
    adherence: 75,
    status: "warning",
    lastCheck: "1 day ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    age: 38,
    medications: 2,
    adherence: 92,
    status: "good",
    lastCheck: "3 hours ago"
  },
  {
    id: 4,
    name: "James Williams",
    age: 55,
    medications: 4,
    adherence: 65,
    status: "critical",
    lastCheck: "5 hours ago"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    age: 51,
    medications: 3,
    adherence: 88,
    status: "good",
    lastCheck: "6 hours ago"
  },
  {
    id: 6,
    name: "David Martinez",
    age: 47,
    medications: 6,
    adherence: 95,
    status: "excellent",
    lastCheck: "1 hour ago"
  }
];

const adherenceTrendData = [
  { month: 'Jan', rate: 85 },
  { month: 'Feb', rate: 88 },
  { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 90 },
  { month: 'May', rate: 93 },
  { month: 'Jun', rate: 95 }
];

const medicationDistribution = [
  { name: 'Aspirin', count: 45 },
  { name: 'Metformin', count: 38 },
  { name: 'Lisinopril', count: 32 },
  { name: 'Atorvastatin', count: 28 },
  { name: 'Levothyroxine', count: 24 }
];

export function ClinicDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-800";
      case "good": return "bg-blue-100 text-blue-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const criticalPatients = mockPatients.filter(p => p.adherence < 80);
  const avgAdherence = Math.round(
    mockPatients.reduce((acc, p) => acc + p.adherence, 0) / mockPatients.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Hospital className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">MediTrack</span>
                <p className="text-xs text-gray-600">Clinic Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Provider Dashboard</h1>
          <p className="text-gray-600">Central City Medical Clinic</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-gray-900">{mockPatients.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">↑ 12% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Adherence</p>
                <p className="text-3xl font-bold text-gray-900">{avgAdherence}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4">↑ 3% from last week</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Critical Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{criticalPatients.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">Needs attention</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Meds</p>
                <p className="text-3xl font-bold text-gray-900">124</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">Across all patients</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Patient List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Patient Management</h2>
                <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Patient
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Patient</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>Patient Name</Label>
                        <Input placeholder="Full name" />
                      </div>
                      <div>
                        <Label>Age</Label>
                        <Input type="number" placeholder="Age" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input type="tel" placeholder="+256 XXX XXXXXX" />
                      </div>
                      <Button className="w-full">Add Patient</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    placeholder="Search patients..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Patients</TabsTrigger>
                  <TabsTrigger value="critical">Critical ({criticalPatients.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Medications</TableHead>
                          <TableHead>Adherence</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.medications}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-gray-200 rounded-full h-2 max-w-[80px]">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${patient.adherence}%` }}
                                  />
                                </div>
                                <span className="text-sm">{patient.adherence}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(patient.status)}>
                                {patient.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedPatient(patient)}
                              >
                                View
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="critical">
                  <div className="space-y-4">
                    {criticalPatients.map((patient) => (
                      <Card key={patient.id} className="p-4 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p className="text-sm text-gray-600">
                              Adherence: {patient.adherence}% • {patient.medications} medications
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Last check: {patient.lastCheck}</p>
                          </div>
                          <Button size="sm">Contact</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Analytics Charts */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Adherence Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={adherenceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Medications</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={medicationDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Right Column - Patient Details / Alerts */}
          <div className="space-y-6">
            {selectedPatient ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Patient Details</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                    Close
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-semibold">{selectedPatient.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Medications</p>
                    <p className="font-semibold">{selectedPatient.medications}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Adherence Rate</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full" 
                          style={{ width: `${selectedPatient.adherence}%` }}
                        />
                      </div>
                      <span className="font-semibold">{selectedPatient.adherence}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Check</p>
                    <p className="font-semibold">{selectedPatient.lastCheck}</p>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button className="w-full gap-2">
                      <Pill className="w-4 h-4" />
                      Assign Medication
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <Calendar className="w-4 h-4" />
                      View Full History
                    </Button>
                    <Button variant="outline" className="w-full gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Excellent Adherence</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {mockPatients.filter(p => p.adherence >= 90).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Needs Monitoring</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {mockPatients.filter(p => p.adherence >= 70 && p.adherence < 90).length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Critical</p>
                      <p className="text-2xl font-bold text-red-600">
                        {criticalPatients.length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">James Williams</p>
                      <p className="text-xs text-gray-600">Missed 3 doses this week</p>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Michael Chen</p>
                      <p className="text-xs text-gray-600">Below 80% adherence</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <h3 className="text-lg font-semibold mb-2">Upgrade Your Plan</h3>
              <p className="text-sm text-blue-100 mb-4">
                Get advanced analytics and unlimited patient slots
              </p>
              <Link to="/pricing">
                <Button variant="secondary" className="w-full">
                  View Plans
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
