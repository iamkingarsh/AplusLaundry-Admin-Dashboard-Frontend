"use client";

import { ExitIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export const ToastProvider = () => {
    return (
        // <Toaster
        //     toastOptions={{
        //         success: {
        //             style: {
        //                 background: 'green',
        //                 color: 'white',

        //             },
        //             iconTheme: {
        //                 primary: 'white',
        //                 secondary: 'green',

        //             },
        //         },
        //         error: {
        //             style: {
        //                 background: 'red',
        //                 color: 'white',

        //             },
        //             iconTheme: {
        //                 primary: 'white',
        //                 secondary: 'red',

        //             }
        //         },
        //     }}
        // />
        <Toaster
            toastOptions={{
                success: {
                    style: {
                        background: 'green',
                        color: 'white',

                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: 'green',

                    },
                },
                error: {
                    style: {
                        background: 'red',
                        color: 'white',

                    },
                    iconTheme: {
                        primary: 'white',
                        secondary: 'red',

                    }
                },
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <>
                            {icon}
                            {message}
                            {t.type !== 'loading' && (

                                <X onClick={() => toast.dismiss(t.id)} className="w-4 cursor-pointer" />
                            )}
                        </>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
};