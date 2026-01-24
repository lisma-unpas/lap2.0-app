"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: string;
    unitId: string;
    subEventId?: string;
    unitName: string;
    subEventName?: string;
    formData: any;
    price: number;
}

interface UserIdentity {
    fullName: string;
    phoneNumber: string;
    email: string;
}

interface CartContextType {
    items: CartItem[];
    userIdentity: UserIdentity | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    updateUserIdentity: (identity: UserIdentity) => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null);

    // Initialize from Local Storage
    useEffect(() => {
        const savedCart = localStorage.getItem('lisma_cart');
        const savedIdentity = localStorage.getItem('lisma_identity');

        if (savedCart) setItems(JSON.parse(savedCart));
        if (savedIdentity) setUserIdentity(JSON.parse(savedIdentity));
    }, []);

    // Persist to Local Storage
    useEffect(() => {
        localStorage.setItem('lisma_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (item: CartItem) => {
        setItems(prev => {
            const newItems = [...prev, item];
            // Persist immediately so that redirect sees data
            if (typeof window !== 'undefined') {
                localStorage.setItem('lisma_cart', JSON.stringify(newItems));
            }
            return newItems;
        });
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const updateUserIdentity = (identity: UserIdentity) => {
        setUserIdentity(identity);
        localStorage.setItem('lisma_identity', JSON.stringify(identity));
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{
            items,
            userIdentity,
            addToCart,
            removeFromCart,
            clearCart,
            updateUserIdentity,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
