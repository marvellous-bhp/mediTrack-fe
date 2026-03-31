import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Check, 
  Pill, 
  Users,
  Building,
  ArrowLeft
} from "lucide-react";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MediTrack</span>
            </Link>
            
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you or your healthcare facility
          </p>
        </div>

        {/* Individual Plans */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-4">
              <Users className="w-5 h-5" />
              <span className="font-medium">For Individuals</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Up to 3 medications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Basic reminders</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Medication tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Daily notifications</span>
                </li>
              </ul>

              <Link to="/patient">
                <Button variant="outline" className="w-full" size="lg">
                  Get Started Free
                </Button>
              </Link>
            </Card>

            {/* Premium Plan */}
            <Card className="p-8 border-2 border-blue-600 hover:shadow-xl transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$3</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">or $30/year (save $6)</p>
                <p className="text-gray-600 mt-2">Everything you need</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Unlimited medications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">SMS reminders</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Weekly & monthly reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Caregiver access (family monitoring)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Priority support</span>
                </li>
              </ul>

              <Link to="/patient">
                <Button className="w-full" size="lg">
                  Start 30-Day Free Trial
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Clinic/Hospital Plans */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full mb-4">
              <Building className="w-5 h-5" />
              <span className="font-medium">For Healthcare Providers</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Small Clinic */}
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Small Clinic</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$50</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Up to 50 patients</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Patient management system</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Adherence tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>2 provider accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Email support</span>
                </li>
              </ul>

              <Link to="/clinic">
                <Button variant="outline" className="w-full" size="lg">
                  Start Free Trial
                </Button>
              </Link>
            </Card>

            {/* Medium Clinic */}
            <Card className="p-8 border-2 border-purple-600 hover:shadow-xl transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                Best Value
              </Badge>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Medium Clinic</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$120</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Up to 200 patients</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Everything in Small Clinic</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">5 provider accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Custom reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">API access</span>
                </li>
              </ul>

              <Link to="/clinic">
                <Button className="w-full" size="lg">
                  Start Free Trial
                </Button>
              </Link>
            </Card>

            {/* Large Hospital */}
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Large Hospital</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$250</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mt-2">Unlimited patients</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Everything in Medium Clinic</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Unlimited provider accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">White-label option</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">24/7 phone support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">Custom integrations</span>
                </li>
              </ul>

              <Link to="/clinic">
                <Button variant="outline" className="w-full" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Accepted Payment Methods
          </h2>
          <p className="text-gray-600 mb-8">We support multiple payment options for your convenience</p>
          
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <p className="font-semibold">Mobile Money</p>
              <p className="text-sm text-gray-600">MTN & Airtel</p>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <p className="font-semibold">Credit Cards</p>
              <p className="text-sm text-gray-600">Visa & MasterCard</p>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <p className="font-semibold">Bank Transfer</p>
              <p className="text-sm text-gray-600">For clinics</p>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <p className="font-semibold">PayPal</p>
              <p className="text-sm text-gray-600">International</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! Premium users get a 30-day free trial, and clinic plans include a free trial period as well.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my patient limit?</h3>
              <p className="text-gray-600">We'll notify you when you're approaching your limit. You can upgrade to a higher tier at any time.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Absolutely. We use industry-standard encryption and are HIPAA compliant to protect your health information.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users improving their medication adherence with MediTrack
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/patient">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/clinic">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                For Healthcare Providers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
