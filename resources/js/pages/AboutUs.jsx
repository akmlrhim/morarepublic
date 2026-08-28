import PageHeader from '../components/PageHeader';
import CompanyIntroBlock from '../components/blocks/CompanyIntroBlock';
import MissionBlock from '../components/blocks/MissionBlock';
import PublicLayout from '../layouts/PublicLayout';

const INTRO = {
    paragraphs: [
        'Mora Republic adalah perusahaan infrastruktur dan layanan digital terintegrasi terkemuka di Indonesia, yang menciptakan dampak transformatif dan positif bagi generasi mendatang.',
        'Infrastruktur kami adalah fondasi pertumbuhan digital di Indonesia. Dengan sistem kabel bawah laut yang luas dan fiber optik darat domestik, kami menghubungkan kepulauan ini dengan seluruh dunia.',
    ],
};

const VISI_MISI = {
    visi: 'Menjadi perusahaan infrastruktur dan layanan digital terintegrasi terkemuka, yang memberikan dampak positif dan transformatif bagi generasi mendatang.',
    misi: [
        {
            title: 'Layanan Andal dan Berkualitas',
            description: 'Menyediakan layanan digital yang andal, aman, dan berkualitas tinggi untuk meningkatkan kualitas hidup pelanggan.',
            image: '/img/mission/reliable.webp',
        },
        {
            title: 'Perluasan Konektivitas',
            description: 'Memperluas akses konektivitas dan solusi digital untuk mendorong pertumbuhan masyarakat dan bisnis di seluruh Indonesia.',
            image: '/img/mission/connectivity.webp',
        },
        {
            title: 'Infrastruktur Kelas Dunia',
            description: 'Mengembangkan infrastruktur telekomunikasi dan digital kelas dunia untuk memperkuat ekosistem digital nasional.',
            image: '/img/mission/infrastructure.webp',
        },
        {
            title: 'Percepatan Transformasi Digital',
            description: 'Mempercepat transformasi digital serta memperkuat ketahanan dan daya saing Indonesia.',
            image: '/img/mission/transformation.webp',
        },
        {
            title: 'Integritas dan Tata Kelola',
            description: 'Menjalankan bisnis dengan integritas, tata kelola yang baik, serta tanggung jawab sosial dan lingkungan.',
            image: '/img/mission/integrity.webp',
        },
    ],
};

export default function AboutUs({ seo }) {
    return (
        <PublicLayout seo={seo} transparentNav>
            <PageHeader
                eyebrow="Tentang Kami"
                title="Membangun fondasi pertumbuhan digital Indonesia"
                description="Mengenal lebih dekat visi, misi, dan komitmen kami dalam menghadirkan konektivitas untuk seluruh negeri."
            />
            <CompanyIntroBlock data={INTRO} />
            <MissionBlock data={VISI_MISI} />
        </PublicLayout>
    );
}
