// import React from 'react';
// import { toast, Toaster } from 'sonner';

// interface ToastProps {
//     message: string;
//     type?: 'success' | 'error' | 'info' | 'warning';
//     duration?: number;
// }

// const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000 }) => {
//     const showToast = () => {
//         toast[type](message, {
//             duration
//         });
//     };

//     return (
//         <>
//             <div>
//                 <button onClick={showToast}>
//                     Show Toast
//                 </button>
//             </div>

//             <Toaster 
//                 position="top-right" 
//                 richColors  
//                 toastOptions={{
//                     unstyled: true,
//                     classNames: {
//                         default: 'px-8 py-4 flex gap-3 rounded-md '
//                     }
//                 }}
//             />
//         </>
//     );
// }
// export default Toast;

// import React, { useEffect } from 'react';
// import { toast, Toaster } from 'sonner';

// interface ToastProps {
//     message: string;
//     type?: 'success' | 'error' | 'info' | 'warning';
//     duration?: number;
// }

// const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000 }) => {
//     useEffect(() => {
//         if (message) {
//             toast[type](message, {
//                 duration
//             });
//         }
//     }, [message, type, duration]);

//     return (
//         <>
//             <Toaster 
//                 position="top-right" 
//                 richColors  
//                 toastOptions={{
//                     unstyled: true,
//                     classNames: {
//                         default: 'px-8 py-4 flex gap-3 rounded-md '
//                     }
//                 }}
//             />
//         </>
//     );
// }

// export default Toast;
