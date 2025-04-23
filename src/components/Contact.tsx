
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
    
    // Here you would normally send the data to a server
    console.log("Form submitted:", formData);
    
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
    <section id="contact" className="py-20 bg-chocolate-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-4">Get in Touch</h2>
          <p className="text-cream/80 max-w-2xl mx-auto">
            Have a special request or want to order a custom cake? Contact us today!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-delay-2 opacity-0 animate-fade-in">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-lg">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-cream mb-2">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-chocolate-light/50 border-gold/20 text-cream"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-cream mb-2">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-chocolate-light/50 border-gold/20 text-cream"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-cream mb-2">Phone (Optional)</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-chocolate-light/50 border-gold/20 text-cream"
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-cream mb-2">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-chocolate-light/50 border-gold/20 text-cream min-h-[120px]"
                    placeholder="Tell us about your cake requirements or special requests"
                    required
                  />
                </div>
                
                <Button type="submit" className="button-gold">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          
          <div className="fade-in-delay-3 opacity-0 animate-fade-in">
            <div className="glass-card p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gold mb-6">Visit Our Bakery</h3>
              
              <div className="mb-6">
                <p className="text-cream font-bold mb-2">Address</p>
                <p className="text-cream/80">123 Chocolate Lane</p>
                <p className="text-cream/80">Sweet City, SC 12345</p>
              </div>
              
              <div className="mb-6">
                <p className="text-cream font-bold mb-2">Hours</p>
                <div className="flex justify-between text-cream/80">
                  <p>Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
                <div className="flex justify-between text-cream/80">
                  <p>Saturday</p>
                  <p>10:00 AM - 4:00 PM</p>
                </div>
                <div className="flex justify-between text-cream/80">
                  <p>Sunday</p>
                  <p>Closed</p>
                </div>
              </div>
              
              <div>
                <p className="text-cream font-bold mb-2">Contact</p>
                <p className="text-cream/80">Phone: (555) 123-4567</p>
                <p className="text-cream/80">Email: info@chocodripdreams.com</p>
              </div>
              
              <div className="mt-8 bg-chocolate rounded-lg overflow-hidden h-48">
                <div className="w-full h-full bg-chocolate-light/30 flex items-center justify-center text-gold">
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
