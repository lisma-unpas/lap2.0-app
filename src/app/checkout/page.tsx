import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import CheckoutClient from "./checkout-client";

export const metadata: Metadata = {
    ...openSharedMetadata("Keranjang & Pembayaran"),
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}
