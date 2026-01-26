import { Metadata } from "next";
import { openSharedMetadata } from "@/utils/metadata";
import Container from "@/components/shared/container";
import Section from "@/components/shared/section";
import { BackButton } from "@/components/shared/back-button";

export const metadata: Metadata = {
    ...openSharedMetadata("Kebijakan Privasi", "Kebijakan privasi LISMA ART PARADE 2.0 (LAP 2.0)"),
};

export default function PrivacyPolicyPage() {
    return (
        <Section className="py-12 bg-primary">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <BackButton className="mb-8" />

                    <div className="prose prose-lg max-w-none">
                        <h1 className="text-display-xs font-bold text-primary mb-4">Kebijakan Privasi</h1>
                        <p className="text-tertiary mb-8">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <div className="space-y-6 text-tertiary leading-relaxed">
                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">1. Pengenalan</h2>
                                <p>
                                    LISMA ART PARADE 2.0 (LAP 2.0) menghormati privasi pengguna kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika menggunakan platform ini.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">2. Informasi yang Kami Kumpulkan</h2>
                                <p>Kami mengumpulkan informasi berikut:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Informasi identitas (nama lengkap, email, nomor telepon)</li>
                                    <li>Data pendaftaran event dan unit</li>
                                    <li>File yang diunggah melalui Google Drive</li>
                                    <li>Informasi pembayaran dan transaksi</li>
                                    <li>Data penggunaan platform (log aktivitas)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">3. Penggunaan Informasi</h2>
                                <p>Informasi yang dikumpulkan digunakan untuk:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Memproses pendaftaran event dan unit</li>
                                    <li>Mengelola pembayaran dan transaksi</li>
                                    <li>Berkomunikasi dengan peserta terkait event</li>
                                    <li>Meningkatkan kualitas layanan platform</li>
                                    <li>Memenuhi kewajiban hukum dan regulasi</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">4. Perlindungan Data</h2>
                                <p>
                                    Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Data disimpan dengan aman dan hanya diakses oleh personel yang berwenang.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">5. Integrasi Google Drive</h2>
                                <p>
                                    Platform ini menggunakan Google Drive untuk menyimpan file yang diunggah. Dengan menghubungkan akun Google Drive Anda, Anda menyetujui kebijakan privasi Google. Kami hanya mengakses file yang Anda unggah melalui platform ini.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">6. Hak Anda</h2>
                                <p>Anda memiliki hak untuk:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-3">
                                    <li>Mengakses data pribadi Anda</li>
                                    <li>Memperbarui atau memperbaiki data yang tidak akurat</li>
                                    <li>Meminta penghapusan data pribadi Anda</li>
                                    <li>Menolak pemrosesan data tertentu</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">7. Perubahan Kebijakan</h2>
                                <p>
                                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui platform atau email. Kami menyarankan Anda untuk meninjau kebijakan ini secara berkala.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold text-primary mb-3">8. Kontak</h2>
                                <p>
                                    Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami melalui:
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
