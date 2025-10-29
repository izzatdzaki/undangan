import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Heart } from 'lucide-react';

const RsvpForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    guests: '1',
    dietaryRestrictions: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store in browser localStorage for demo
    const existingRsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
    existingRsvps.push({ ...formData, id: Date.now() });
    localStorage.setItem('rsvps', JSON.stringify(existingRsvps));

    toast({
      title: "RSVP Submitted!",
      description: "Thank you for confirming your attendance. We can't wait to celebrate with you!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      attendance: 'yes',
      guests: '1',
      dietaryRestrictions: '',
      message: ''
    });
  };

  return (
    <section id="rsvp" className="py-20 px-6 bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">RSVP</h2>
          <p className="text-lg text-gray-600 font-light">Please respond by May 15, 2025</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-gray-700 mb-2 block">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                placeholder="your@email.com"
              />
            </div>

            {/* Attendance */}
            <div>
              <Label className="text-gray-700 mb-3 block">Will you be attending? *</Label>
              <RadioGroup
                value={formData.attendance}
                onValueChange={(value) => setFormData({ ...formData, attendance: value })}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" className="border-amber-400 text-amber-600" />
                  <Label htmlFor="yes" className="cursor-pointer text-gray-700">Joyfully accept</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" className="border-amber-400 text-amber-600" />
                  <Label htmlFor="no" className="cursor-pointer text-gray-700">Regretfully decline</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Number of guests */}
            <div>
              <Label htmlFor="guests" className="text-gray-700 mb-2 block">Number of Guests</Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>

            {/* Dietary restrictions */}
            <div>
              <Label htmlFor="dietaryRestrictions" className="text-gray-700 mb-2 block">Dietary Restrictions</Label>
              <Input
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                type="text"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                className="border-gray-300 focus:border-amber-400 focus:ring-amber-400"
                placeholder="Any allergies or dietary requirements"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-gray-700 mb-2 block">Message for the Couple</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border-gray-300 focus:border-amber-400 focus:ring-amber-400 min-h-24"
                placeholder="Share your wishes and blessings..."
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit RSVP
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
