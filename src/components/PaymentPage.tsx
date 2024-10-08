import { useCallback, useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';

const PaymentPage = ({ token, orderID }: { token: string; orderID: number }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const executeScripts = useCallback((scripts: HTMLScriptElement[]) => {
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript);
    });
  }, []);

  useEffect(() => {
    const fetchHtml = async () => {
      const url = `${import.meta.env.VITE_PRODUCT_LIST_API}order/process-payment/${orderID}`;
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const data = {
        gateway: "payumoney",
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data)
        });
        const html = await response.text();

        // Sanitize HTML content
        const cleanHtml = DOMPurify.sanitize(html, { KEEP_CONTENT: true });

        // Create a temporary container to parse the HTML
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = cleanHtml;

        // Extract scripts
        const scripts = Array.from(tempContainer.querySelectorAll('script'));
        
        // Remove scripts from the HTML content
        scripts.forEach(script => script.remove());

        // Set the HTML content without scripts
        setHtmlContent(tempContainer.innerHTML);

        // Execute scripts separately
        executeScripts(scripts);
      } catch (error) {
        console.error('Error fetching HTML:', error);
      }
    };

    fetchHtml();
  }, [executeScripts, orderID, token]);

  useEffect(() => {
    if (containerRef.current) {
      const forms = containerRef.current.getElementsByTagName('form');
      if (forms.length > 0) {
        forms[0].submit();
      }
    }
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="payment-page-container"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default PaymentPage;