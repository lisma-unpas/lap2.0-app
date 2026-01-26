import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { BackButton } from "@/components/shared/back-button";

export const metadata: Metadata = {
    ...openSharedMetadata("Syarat & Ketentuan", "Syarat dan ketentuan penggunaan LISMA ART PARADE 2.0 (LAP 2.0)"),
};

export default function TermsPage() {
    return (
        <Section className="py-12 bg-primary">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <BackButton className="mb-8" />

                    <div className="prose prose-lg max-w-none">
                        <h1 className="text-display-xs font-bold text-primary mb-4">Syarat & Ketentuan</h1>
                        <p className="text-tertiary mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <div className="space-y-6 text-tertiary leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">1. Penerimaan Syarat</h2>
                                <p>
                                    Dengan mengakses dan menggunakan platform LISMA ART PARADE 2.0 (LAP 2.0), Anda menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan syarat-syarat ini, mohon untuk tidak menggunakan platform ini.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">2. Penggunaan Platform</h2>
                                <p>Anda setuju untuk:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Menyediakan informasi yang akurat dan lengkap saat mendaftar</li>
                                    <li>Menggunakan platform hanya untuk tujuan yang sah</li>
                                    <li>Tidak melakukan aktivitas yang dapat merusak atau mengganggu platform</li>
                                    <li>Memelihara kerahasiaan akun dan kata sandi Anda</li>
                                    <li>Bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">3. Pendaftaran Event</h2>
                                <p>
                                    Pendaftaran event melalui platform ini tunduk pada ketentuan berikut:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Pendaftaran harus dilakukan sebelum batas waktu yang ditentukan</li>
                                    <li>Data yang diisi harus akurat dan dapat dipertanggungjawabkan</li>
                                    <li>Pembayaran harus dilakukan sesuai dengan metode yang tersedia</li>
                                    <li>Pembatalan atau pengembalian dana mengikuti kebijakan yang berlaku</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">4. Pembayaran</h2>
                                <p>
                                    Semua pembayaran dilakukan melalui metode yang tersedia di platform. Kami tidak bertanggung jawab atas masalah yang timbul dari pihak ketiga (bank, payment gateway, dll). Pastikan Anda melakukan pembayaran sesuai dengan instruksi yang diberikan.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">5. Konten yang Diunggah</h2>
                                <p>
                                    Dengan mengunggah konten (file, gambar, dll) ke platform ini, Anda menjamin bahwa:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Anda memiliki hak untuk mengunggah konten tersebut</li>
                                    <li>Konten tidak melanggar hak cipta atau hak kekayaan intelektual pihak lain</li>
                                    <li>Konten tidak mengandung materi yang melanggar hukum atau tidak pantas</li>
                                    <li>Anda memberikan izin kepada kami untuk menggunakan konten tersebut untuk keperluan event</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">6. Batasan Tanggung Jawab</h2>
                                <p>
                                    Platform ini disediakan &quot;apa adanya&quot; tanpa jaminan apapun. Kami tidak bertanggung jawab atas:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Kehilangan data atau informasi</li>
                                    <li>Gangguan teknis yang terjadi di luar kendali kami</li>
                                    <li>Kerugian yang timbul dari penggunaan atau ketidakmampuan menggunakan platform</li>
                                    <li>Keputusan yang diambil berdasarkan informasi di platform</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">7. Perubahan Layanan</h2>
                                <p>
                                    Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan platform kapan saja tanpa pemberitahuan sebelumnya. Kami tidak bertanggung jawab atas konsekuensi yang timbul dari perubahan tersebut.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">8. Hukum yang Berlaku</h2>
                                <p>
                                    Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">9. Perubahan Syarat & Ketentuan</h2>
                                <p>
                                    Kami berhak untuk mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan diberitahukan melalui platform atau email. Penggunaan berkelanjutan setelah perubahan berarti Anda menerima syarat-syarat yang baru.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">10. Kontak</h2>
                                <p>
                                    Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami melalui:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Email: info@lisma-unpas.com</li>
                                    <li>Website: <a href="https://www.lisma-unpas.com/" className="text-brand-600 hover:text-brand-700" target="_blank" rel="noopener noreferrer">www.lisma-unpas.com</a></li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
