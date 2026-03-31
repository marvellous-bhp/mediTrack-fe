import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { 
  Bell, 
  Calendar, 
  ClipboardList, 
  Hospital, 
  Pill, 
  Shield, 
  Users,
  CheckCircle,
  BarChart3,
  Smartphone,
  Menu
} from "lucide-react";
import { useState } from "react";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MediTrack</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
              <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
              <Link to="/patient">
                <Button variant="outline">Patient Login</Button>
              </Link>
              <Link to="/clinic">
                <Button>Clinic Login</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
                <Link to="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
                <Link to="/patient">
                  <Button variant="outline" className="w-full">Patient Login</Button>
                </Link>
                <Link to="/clinic">
                  <Button className="w-full">Clinic Login</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              Smart Medication Management
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Never Miss Your Medication Again
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              MediTrack helps patients take medication correctly and on time with automated reminders, 
              tracking history, and comprehensive reports for healthcare providers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/mobile">
                <Button size="lg" className="gap-2">
                  <Smartphone className="w-5 h-5" />
                  Dùng thử Mobile App
                </Button>
              </Link>
              <Link to="/clinic">
                <Button size="lg" variant="outline" className="gap-2">
                  <Hospital className="w-5 h-5" />
                  For Healthcare Providers
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Adherence Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600">Partner Clinics</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80" 
                alt="Medical professional with tablet" 
                className="rounded-2xl w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Medication Taken</div>
                  <div className="text-sm text-gray-600">Today at 9:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage medications effectively and improve patient outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">
                Automated notifications and SMS reminders ensure you never miss a dose
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Management</h3>
              <p className="text-gray-600">
                Easily add and manage multiple medications with custom schedules
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">History Tracking</h3>
              <p className="text-gray-600">
                Comprehensive history of taken and missed doses for better insights
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics & Reports</h3>
              <p className="text-gray-600">
                Weekly and monthly reports to track medication adherence patterns
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Hospital className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clinic Integration</h3>
              <p className="text-gray-600">
                Healthcare providers can monitor patient adherence in real-time
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Access</h3>
              <p className="text-gray-600">
                Share access with caregivers for better family health monitoring
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MediTrack Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up with your phone or email in less than a minute
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Medications</h3>
              <p className="text-gray-600">
                Enter your medications with dosage and custom schedules
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Reminders</h3>
              <p className="text-gray-600">
                Receive timely notifications and track your medication history
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Making a Real Impact on Healthcare
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Patient Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">75%</div>
              <div className="text-blue-100">Reduced Missed Doses</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Partner Clinics</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Improve Your Medication Adherence?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients and healthcare providers using MediTrack
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/patient">
              <Button size="lg" className="gap-2">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="gap-2">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">MediTrack</span>
              </div>
              <p className="text-gray-400">
                Smart medication reminder system for better health outcomes
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div><a href="#features">Features</a></div>
                <div><Link to="/pricing">Pricing</Link></div>
                <div><a href="#how-it-works">How It Works</a></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Contact</div>
                <div>Careers</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-gray-400">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>HIPAA Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 MediTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}