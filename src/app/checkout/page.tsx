"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { ShieldCheck, MapPin, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import html2canvas from "html2canvas";
import { createOrder } from "@/actions/orders";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    deliveryNotes: "",
    googleLocation: "",
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const shippingFee = 350;
  const discount = 0;
  // Free delivery promotion applied
  const grandTotal = subtotal - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    
    setIsGettingLocation(true);
    setLocationError("");
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        setFormData(prev => ({ ...prev, googleLocation: mapsUrl }));
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Unable to retrieve your location. Please check browser permissions.");
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Validate form (basic)
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.district) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Capture the invoice as an image
    try {
      const invoiceElement = document.getElementById("invoice-capture");
      const itemsContainer = document.getElementById("invoice-items-container");
      if (invoiceElement && itemsContainer) {
        // Temporarily remove max height for full screenshot
        itemsContainer.classList.remove("max-h-[40vh]", "overflow-y-auto");
        
        // Hide the button during screenshot
        const orderButton = document.getElementById("place-order-btn");
        if (orderButton) orderButton.style.display = "none";
        
        await new Promise(resolve => setTimeout(resolve, 100)); // wait for layout shift
        const canvas = await html2canvas(invoiceElement, { backgroundColor: '#ffffff', scale: 2 });
        const image = canvas.toDataURL("image/png");
        
        // Create a link to download the image
        const link = document.createElement('a');
        link.href = image;
        link.download = `Invoice_${new Date().toISOString().slice(0,10)}.png`;
        link.click();
        
        // Restore classes and button
        itemsContainer.classList.add("max-h-[40vh]", "overflow-y-auto");
        if (orderButton) orderButton.style.display = "flex";
      }
    } catch (error) {
      console.error("Failed to generate invoice image", error);
    }

    const orderNumber = `ORD-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Save order to database
    try {
      await createOrder({
        orderNumber,
        customerName: formData.fullName,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        postalCode: formData.postalCode,
        deliveryNotes: formData.deliveryNotes,
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: discount,
        total: grandTotal,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          sku: item.sku,
          quantity: item.quantity,
          price: item.price
        }))
      });
    } catch (err) {
      console.error("Failed to save order to DB:", err);
    }

    let message = `=======================================\n`;
    message += `           ORDER INVOICE               \n`;
    message += `=======================================\n`;
    message += `Order No : ${orderNumber}\n`;
    message += `\n[ ITEMS ]\n`;
    message += `---------------------------------------\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   SKU: ${item.sku || 'N/A'}\n`;
      message += `   ${item.quantity} x ${siteConfig.currencySymbol} ${item.price.toFixed(2)}\n`;
      message += `   Subtotal: ${siteConfig.currencySymbol} ${(item.price * item.quantity).toFixed(2)}\n`;
      message += `---------------------------------------\n`;
    });

    message += `\n[ DELIVERY DETAILS ]\n`;
    message += `---------------------------------------\n`;
    message += `Name     : ${formData.fullName}\n`;
    message += `Phone    : ${formData.phone}\n`;
    if (formData.whatsapp) message += `WhatsApp : ${formData.whatsapp}\n`;
    message += `Address  : ${formData.address}\n`;
    message += `City     : ${formData.city}\n`;
    message += `District : ${formData.district}\n`;
    if (formData.postalCode) message += `Postal   : ${formData.postalCode}\n`;
    if (formData.googleLocation) message += `Location : ${formData.googleLocation}\n`;
    if (formData.deliveryNotes) message += `Notes    : ${formData.deliveryNotes}\n`;

    message += `\n[ PAYMENT SUMMARY ]\n`;
    message += `---------------------------------------\n`;
    message += `Subtotal      : ${siteConfig.currencySymbol} ${subtotal.toFixed(2)}\n`;
    message += `Shipping Fee  : FREE (Promo)\n`;
    if (discount > 0) message += `Discount      : -${siteConfig.currencySymbol} ${discount.toFixed(2)}\n`;
    message += `---------------------------------------\n`;
    message += `GRAND TOTAL   : ${siteConfig.currencySymbol} ${grandTotal.toFixed(2)}\n`;
    message += `=======================================\n\n`;
    message += `Please confirm my order. I have also attached the invoice image. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    
    setWhatsappUrl(url);
    setOrderPlaced(true);
    clearCart(); // Empty the cart after ordering
    setIsSubmitting(false);
  };

  if (!mounted) return null; // Hydration fix
  
  if (orderPlaced) {
    return (
      <div className="bg-gray-50 dark:bg-[#060d1f] min-h-screen py-12 flex flex-col items-center justify-center px-4">
        <div className="bg-white dark:bg-[#0a192f] p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-white/10">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Saved!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Your order has been saved securely. Please click the button below to send your details to our WhatsApp to finalize the purchase.
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Send to WhatsApp
          </a>
          
          <Link href="/shop" onClick={() => setOrderPlaced(false)} className="mt-6 block text-sm font-medium text-gray-500 hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-secondary transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-[#060d1f] min-h-screen py-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Add some products to your cart before checking out.</p>
        <Link href="/shop" className="bg-brand-primary text-white font-medium py-3 px-6 rounded-full hover:bg-brand-secondary transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#060d1f] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1 bg-white dark:bg-[#0a192f] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6 border-b pb-4">Delivery Details</h2>
            
            <form onSubmit={handleWhatsAppOrder} id="checkout-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Full Name *</label>
                  <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Email Address (Optional)</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Phone Number *</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="077 123 4567" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">WhatsApp Number (Optional)</label>
                  <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="077 123 4567" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Street Address *</label>
                <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="No 123, Galle Road" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">City *</label>
                  <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="Colombo 03" />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">District *</label>
                  <select required name="district" value={formData.district} onChange={handleChange} className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all bg-white dark:bg-[#0a192f]">
                    <option value="">Select District</option>
                    <option value="Ampara">Ampara</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Batticaloa">Batticaloa</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Galle">Galle</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Hambantota">Hambantota</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Kegalle">Kegalle</option>
                    <option value="Kilinochchi">Kilinochchi</option>
                    <option value="Kurunegala">Kurunegala</option>
                    <option value="Mannar">Mannar</option>
                    <option value="Matale">Matale</option>
                    <option value="Matara">Matara</option>
                    <option value="Moneragala">Moneragala</option>
                    <option value="Mullaitivu">Mullaitivu</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Puttalam">Puttalam</option>
                    <option value="Ratnapura">Ratnapura</option>
                    <option value="Trincomalee">Trincomalee</option>
                    <option value="Vavuniya">Vavuniya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Postal Code</label>
                  <input name="postalCode" value={formData.postalCode} onChange={handleChange} type="text" className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="00300" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Google Map Location Link (Optional)</label>
                <div className="flex gap-2">
                  <input name="googleLocation" value={formData.googleLocation} onChange={handleChange} type="url" className="flex-1 border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="https://maps.app.goo.gl/... or click Get Location" />
                  <button 
                    type="button" 
                    onClick={handleGetLocation} 
                    disabled={isGettingLocation}
                    className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-[#060d1f] dark:hover:bg-[#0a192f] text-gray-700 dark:text-gray-200 px-4 py-2.5 rounded-lg transition-colors border border-gray-300 dark:border-white/20 shrink-0"
                    title="Get Current Location"
                  >
                    {isGettingLocation ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5 text-[#f47820]" />}
                    <span className="hidden sm:inline text-sm font-medium">{isGettingLocation ? "Locating..." : "Get Location"}</span>
                  </button>
                </div>
                {locationError && <p className="text-red-500 text-xs mt-1.5 font-medium">{locationError}</p>}
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Delivery Notes (Optional)</label>
                <textarea name="deliveryNotes" value={formData.deliveryNotes} onChange={handleChange} rows={3} className="w-full border border-gray-300 dark:border-white/20 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary outline-none transition-all" placeholder="E.g. Please call before delivery"></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary (Bill Format) */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div id="invoice-capture" className="bg-white dark:bg-[#0a192f] p-6 sm:p-8 rounded-xl shadow-lg promo-border sticky top-24 relative overflow-hidden">
              {/* Receipt Top Zigzag effect */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMTAsMTAgMjAsMCIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] opacity-100 dark:opacity-0" />
              
              <div className="text-center mb-6 mt-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-widest border-b-2 border-gray-900 dark:border-white inline-block pb-1">INVOICE</h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">{siteConfig.companyName}</p>
              </div>
              
              <div className="flex justify-between text-xs font-semibold text-gray-400 dark:text-gray-500 mb-4 border-b border-dashed border-gray-300 dark:border-gray-700 pb-2 uppercase tracking-wider">
                <span>Description</span>
                <span>Amount</span>
              </div>

              <div id="invoice-items-container" className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 relative bg-gray-50 dark:bg-[#060d1f] rounded border border-gray-200 dark:border-white/10 overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 text-sm min-w-0">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.quantity} × {siteConfig.currencySymbol} {item.price.toFixed(2)}</p>
                    </div>
                    <div className="font-bold text-sm text-gray-900 dark:text-gray-100 shrink-0 text-right">
                      {siteConfig.currencySymbol} {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-dashed border-gray-300 dark:border-gray-700 pt-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium">{siteConfig.currencySymbol} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    Shipping Fee
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">Promo</span>
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="font-medium line-through text-xs text-gray-400">{siteConfig.currencySymbol} {shippingFee.toFixed(2)}</span>
                    <span className="font-bold text-green-500">FREE</span>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">-{siteConfig.currencySymbol} {discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-lg font-bold text-brand-primary dark:text-brand-secondary pt-4 mt-2 border-t-2 border-gray-900 dark:border-white border-dashed">
                  <span>GRAND TOTAL</span>
                  <span className="text-xl">{siteConfig.currencySymbol} {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                id="place-order-btn"
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mb-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                )}
                {isSubmitting ? "Processing..." : "Place Order via WhatsApp"}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                100% Secure Checkout Process
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
