import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import Container from "@/components/shared/container";

export default function Footer() {
    return (
        <footer className="bg-primary border-t border-secondary py-12 md:py-16">
            <Container>
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-0">
                    <div className="flex flex-col items-center gap-4 md:items-start">
                        <UntitledLogo className="h-8" />
                        <p className="text-md text-tertiary">Platform Resmi LISMA ART PARADE 2.0 (LAP 2.0)</p>
                    </div>

                    <nav>
                        <ul className="flex flex-wrap justify-center gap-6 text-md font-semibold text-tertiary">
                            <li><a href="/" className="hover:text-primary transition-colors">Beranda</a></li>
                            <li><a href="/#about" className="hover:text-primary transition-colors">Tentang Kami</a></li>
                            <li><a href="/main-event" className="hover:text-primary transition-colors">Main Event</a></li>
                            <li><a href="/info" className="hover:text-primary transition-colors">Info</a></li>
                            <li><a href="/check-status" className="hover:text-primary transition-colors">Cek Status</a></li>
                            <li><a href="/registrations" className="hover:text-primary transition-colors">Pendaftaran</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="mt-12 border-t border-secondary pt-8 flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
                    <p className="text-sm text-tertiary">
                        © {new Date().getFullYear()} LISMA UNPAS. Seluruh hak cipta dilindungi. Powered by <a href="https://kodingkeliling.com/" className="hover:text-primary transition-colors">Koding Keliling</a>.
                    </p>
                    <div className="flex gap-6 text-sm text-tertiary">
                        <a href="/privacy-policy" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
                        <a href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
