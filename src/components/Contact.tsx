import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible!",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-off-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-chocolate mb-4 font-cormorant">Get in Touch</h2>
          <p className="text-chocolate/80 max-w-2xl mx-auto font-lora text-base sm:text-lg">
            Have a special request or want to order a custom cake? Contact us today!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form */}
          <div className="fade-in-delay-2 opacity-0 animate-fade-in order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="bg-cream p-6 sm:p-8 rounded-lg border border-chocolate/20">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-chocolate mb-2 font-dm font-medium text-sm sm:text-base">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-off-white border-chocolate/20 text-chocolate text-sm sm:text-base"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-chocolate mb-2 font-dm font-medium text-sm sm:text-base">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-off-white border-chocolate/20 text-chocolate text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-chocolate mb-2 font-dm font-medium text-sm sm:text-base">Phone (Optional)</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-off-white border-chocolate/20 text-chocolate text-sm sm:text-base"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-chocolate mb-2 font-dm font-medium text-sm sm:text-base">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-off-white border-chocolate/20 text-chocolate min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                    placeholder="Tell us about your cake requirements or special requests"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-chocolate text-off-white hover:bg-chocolate-dark font-dm text-sm sm:text-base py-2.5 sm:py-3 mt-2"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          
          {/* Business Information */}
          <div className="fade-in-delay-3 opacity-0 animate-fade-in order-1 lg:order-2">
            <div className="bg-cream p-6 sm:p-8 rounded-lg border border-chocolate/20">
              <h3 className="text-xl sm:text-2xl font-bold text-chocolate mb-4 sm:mb-6 font-cormorant">Visit Our Bakery</h3>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-chocolate font-bold mb-2 font-dm text-sm sm:text-base">Address</p>
                <p className="text-chocolate/80 font-lora text-sm sm:text-base">123 Chocolate Lane</p>
                <p className="text-chocolate/80 font-lora text-sm sm:text-base">Sweet City, SC 12345</p>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <p className="text-chocolate font-bold mb-2 font-dm text-sm sm:text-base">Hours</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-chocolate/80 font-lora text-sm sm:text-base">
                    <p>Monday - Friday</p>
                    <p>9:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex justify-between text-chocolate/80 font-lora text-sm sm:text-base">
                    <p>Saturday</p>
                    <p>10:00 AM - 4:00 PM</p>
                  </div>
                  <div className="flex justify-between text-chocolate/80 font-lora text-sm sm:text-base">
                    <p>Sunday</p>
                    <p>Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <p className="text-chocolate font-bold mb-2 font-dm text-sm sm:text-base">Contact</p>
                <p className="text-chocolate/80 font-lora text-sm sm:text-base">Phone: (555) 123-4567</p>
                <p className="text-chocolate/80 font-lora text-sm sm:text-base">Email: info@chocodripdreams.com</p>
              </div>
              
              <div className="bg-chocolate rounded-lg overflow-hidden h-40 sm:h-48">
                <div className="w-full h-full bg-chocolate-light/30 flex items-center justify-center text-off-white font-lora">
                  Map will be displayed here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
