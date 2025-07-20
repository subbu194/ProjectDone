import { useEffect } from 'react';

export default function LiveChat() {
  useEffect(() => {
    // Inject LeadConnector widget script and element (visible by default)
    if (!document.getElementById('leadconnector-chat-script')) {
      const script = document.createElement('script');
      script.id = 'leadconnector-chat-script';
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      script.async = true;
      document.body.appendChild(script);
    }
    if (!document.querySelector('chat-widget')) {
      const chatWidget = document.createElement('chat-widget');
      chatWidget.setAttribute('location-id', 'zgtUPVJPCSPiObs2UyIE');
      // Show the widget by default
      document.body.appendChild(chatWidget);
    } else {
      // If already present, make sure it's visible
      const chatWidget = document.querySelector('chat-widget');
      chatWidget.style.display = 'block';
    }
  }, []);

  return null; // This component does not render anything visible itself
} 