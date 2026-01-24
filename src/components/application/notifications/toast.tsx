'use client';

import { useToast } from '@/context/toast-context';
import { AlertFloating } from '@/components/application/alerts/alerts';
import { AnimatePresence, motion } from 'motion/react';

export const Toast = () => {
    const { toast, closeToast } = useToast();

    return (
        <div className="pointer-events-none fixed top-4 right-4 left-4 z-[9999] flex flex-col items-center md:left-auto md:w-full md:max-w-md">
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className="pointer-events-auto w-full"
                    >
                        <AlertFloating
                            title={toast.title}
                            description={toast.message}
                            color={toast.type}
                            onClose={closeToast}
                            confirmLabel=""
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
